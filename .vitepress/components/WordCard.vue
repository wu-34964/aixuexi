<template>
  <div class="word-card-container">
    <!-- ===== 筛选与设置 ===== -->
    <div class="settings-bar">
      <div class="settings-group">
        <label>📊 难度筛选</label>
        <select v-model="selectedDifficulty" @change="onSettingsChange">
          <option value="">-- 请选择难度 --</option>
          <option value="all">全部难度</option>
          <option value="1">⭐ 简单</option>
          <option value="2">⭐⭐ 较易</option>
          <option value="3">⭐⭐⭐ 中等</option>
          <option value="4">⭐⭐⭐⭐ 较难</option>
          <option value="5">⭐⭐⭐⭐⭐ 困难</option>
        </select>
      </div>
      <div class="settings-group">
        <label>📝 单词数量</label>
        <select v-model="selectedCount" @change="onSettingsChange">
          <option value="">-- 请选择数量 --</option>
          <option value="5">5 个</option>
          <option value="10">10 个</option>
          <option value="15">15 个</option>
          <option value="20">20 个</option>
          <option value="30">30 个</option>
          <option value="50">50 个</option>
        </select>
      </div>
      <div class="settings-group">
        <label>📚 词库状态</label>
        <span class="word-count-badge" :class="{ warning: remainingRatio === 0 }">
          {{ remainingCount }} / {{ totalCount }}
          <span class="ratio-hint">({{ remainingRatio }}%)</span>
        </span>
      </div>
      <div class="settings-group">
        <label>&nbsp;</label>
        <button class="btn-history" @click="showHistory = !showHistory" title="查看历史记录">
          📜 历史记录 ({{ historyCount }})
        </button>
      </div>
    </div>

    <!-- ===== 历史记录弹窗 ===== -->
    <div v-if="showHistory" class="history-modal">
      <div class="history-modal-content">
        <div class="history-header">
          <h3>📜 学习历史记录</h3>
          <button class="btn-close-modal" @click="showHistory = false">✕</button>
        </div>

        <div class="history-guide">
          <span class="guide-icon">💡</span>
          <span class="guide-text">
            在「已学单词」中点击「保存到历史记录」，即可将已标记的单词保存到历史中。
            历史记录中的单词将不再出现在后续学习中。
          </span>
        </div>

        <div v-if="historyWords.length > 0" class="history-list">
          <div v-for="word in historyWords" :key="word.id" class="history-item">
            <span class="history-word">{{ word.word }}</span>
            <span class="history-meaning">{{ word.meaning }}</span>
            <span class="history-difficulty">{{ '⭐'.repeat(word.difficulty) }}</span>
          </div>
        </div>
        <div v-else class="history-empty">
          <div class="empty-icon">📭</div>
          <p>暂无学习历史</p>
          <p class="hint">在「已学单词」中点击「保存到历史记录」来保存</p>
        </div>
        <div class="history-footer">
          <button class="btn btn-danger" @click="clearHistory">🗑️ 清空历史</button>
        </div>
      </div>
    </div>

    <!-- ===== 未选择设置时的提示 ===== -->
    <div v-if="!settingsReady" class="setup-hint">
      <div class="hint-icon">⚙️</div>
      <h3>请先选择难度和单词数量</h3>
      <p>在上方选择栏中设置你想要的难度和数量，然后开始学习</p>
    </div>

    <!-- ===== 已选择设置时显示内容 ===== -->
    <template v-else>
      <!-- ===== 无可用单词提示 ===== -->
      <div v-if="totalCount === 0" class="empty-state-large">
        <div class="empty-icon">📚</div>
        <h3>该难度下没有单词</h3>
        <p>请选择其他难度</p>
      </div>

      <!-- ===== 正常显示 ===== -->
      <template v-else>
        <div class="mode-tabs">
          <button
            class="mode-btn"
            :class="{ active: mode === 'learn' }"
            @click="switchMode('learn')"
          >
            📖 单词学习
          </button>
          <button
            class="mode-btn"
            :class="{ active: mode === 'quiz' }"
            @click="switchMode('quiz')"
          >
            🧪 复习测试
          </button>
          <button
            class="mode-btn"
            :class="{ active: mode === 'review' }"
            @click="switchMode('review')"
          >
            📚 已学单词
          </button>
        </div>

        <!-- ============================================================ -->
        <!-- ===== 单词学习模式 ===== -->
        <!-- ============================================================ -->
        <div v-if="mode === 'learn'" class="learn-mode">
          <div class="progress-info">
            <span>📊 本组进度：{{ learnedInGroup }} / {{ groupSize }}</span>
            <span>{{ groupProgressPercent }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: groupProgressPercent + '%' }"></div>
          </div>

          <div class="group-hint" v-if="currentGroupWords.length > 0">
            💡 本组剩余 <strong>{{ unlearnedCount }}</strong> 个单词未学
          </div>

          <!-- 完成弹窗 -->
          <div v-if="showCompleteModal" class="complete-modal-overlay">
            <div class="complete-modal">
              <div class="complete-modal-icon">🎉</div>
              <div class="complete-modal-title">太棒了！全部学完！</div>
              <div class="complete-modal-desc">
                你已掌握了本组全部 {{ groupSize }} 个单词！<br>
                接下来去「复习测试」检验一下学习成果吧！
              </div>
              <div class="complete-modal-actions">
                <button class="btn btn-primary" @click="goToQuiz">
                  🧪 去复习测试
                </button>
                <button class="btn btn-outline" @click="closeCompleteModal">
                  📖 继续学习本组
                </button>
              </div>
            </div>
          </div>

          <div v-if="currentWord && !showCompleteModal" class="word-card" :class="{ flipped: showLearnAnswer }" @click="flipLearnCard">
            <div class="card-inner">
              <div class="card-front">
                <div class="word-number">#{{ currentWordIndex + 1 }} / {{ filteredWords.length }}</div>
                <div class="word-title">{{ currentWord.word }}</div>
                <div class="word-phonetic">{{ currentWord.phonetic }}</div>
                <div class="word-tags">
                  <span v-for="tag in currentWord.tags" :key="tag" class="tag">{{ tag }}</span>
                  <span class="difficulty">{{ '⭐'.repeat(currentWord.difficulty) }}</span>
                </div>
                <div class="word-status" v-if="learnedInGroupSet.has(currentWord.id)">
                  ✅ 已掌握
                </div>
                <div class="hint">👆 点击卡片查看释义</div>
              </div>
              <div class="card-back">
                <div class="meaning">{{ currentWord.meaning }}</div>
                <div class="example">
                  <span class="example-en">{{ currentWord.example }}</span>
                  <span class="example-cn">{{ currentWord.example_cn }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="!showCompleteModal && filteredWords.length === 0" class="complete-state">
            <div class="complete-icon">🎉</div>
            <div class="complete-title">本组全部学完！</div>
            <div class="complete-desc">你已掌握了本组所有单词</div>
          </div>

          <div class="word-actions" v-if="!showCompleteModal">
            <button class="btn btn-outline" @click="prevWord" :disabled="currentWordIndex <= 0 || filteredWords.length === 0">⬅ 上一个</button>
            <button class="btn btn-success" @click="markLearned" :disabled="!currentWord || learnedInGroupSet.has(currentWord.id)">
              ✅ 标记已学
            </button>
            <button class="btn btn-outline" @click="nextWord" :disabled="currentWordIndex === filteredWords.length - 1 || filteredWords.length === 0">下一个 ➡</button>
          </div>
        </div>

        <!-- ============================================================ -->
        <!-- ===== 复习测试模式 ===== -->
        <!-- ============================================================ -->
        <div v-if="mode === 'quiz'" class="quiz-mode">
          <!-- 测试结果弹窗 -->
          <div v-if="showQuizResult" class="complete-modal-overlay">
            <div class="complete-modal">
              <div class="complete-modal-icon">{{ quizCorrectRate >= 80 ? '🌟' : '💪' }}</div>
              <div class="complete-modal-title">{{ getResultTitle() }}</div>
              <div class="complete-modal-desc">
                正确率：<strong>{{ quizCorrectRate }}%</strong>
                <span v-if="quizCorrectRate === 100"> 🎯 完美通关！</span>
                <span v-else-if="quizCorrectRate >= 80"> 👍 表现优秀！</span>
                <span v-else-if="quizCorrectRate >= 60"> 💪 继续加油！</span>
                <span v-else> 📖 再复习一下吧！</span>
                <br>
                {{ getResultMessage() }}
              </div>
              <div class="complete-modal-actions">
                <button class="btn btn-primary" @click="goToReview">
                  📚 查看已学单词
                </button>
                <button class="btn btn-outline" @click="closeQuizResult">
                  🔄 重新测试
                </button>
              </div>
            </div>
          </div>

          <template v-else>
            <div class="progress-info">
              <span>📊 已答：{{ quizAnsweredCount }} / {{ quizWords.length }}</span>
              <span>✅ 正确率：{{ quizCorrectRate }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: (quizAnsweredCount / Math.max(quizWords.length, 1) * 100) + '%' }"></div>
            </div>

            <!-- 没有已标记的单词 -->
            <div v-if="quizWords.length === 0" class="empty-state">
              <div class="empty-icon">📝</div>
              <p>还没有已标记的单词</p>
              <p class="hint">先去「单词学习」中标记一些单词吧</p>
            </div>

            <!-- 有已标记的单词 -->
            <template v-else>
              <!-- 还有题目 -->
              <div v-if="currentQuizWord" class="quiz-card">
                <div class="quiz-question">
                  <span class="quiz-number">第 {{ quizIndex + 1 }} 题</span>
                  <span class="quiz-word">{{ currentQuizWord.word }}</span>
                  <span class="quiz-phonetic">{{ currentQuizWord.phonetic }}</span>
                </div>

                <div class="quiz-options">
                  <button
                    v-for="option in currentOptions"
                    :key="option.id"
                    class="quiz-option"
                    :class="{
                      selected: quizSelectedOption && option.id === quizSelectedOption.id,
                      correct: quizSelectedOption && option.id === quizSelectedOption.id && option.id === currentQuizWord.id,
                      wrong: quizSelectedOption && option.id === quizSelectedOption.id && option.id !== currentQuizWord.id
                    }"
                    :disabled="quizSelectedOption !== null"
                    @click="selectQuizOption(option)"
                  >
                    {{ option.meaning }}
                  </button>
                </div>

                <div v-if="quizSelectedOption" class="quiz-feedback">
                  <div v-if="quizSelectedOption.id === currentQuizWord.id" class="feedback-correct">
                    ✅ 正确！{{ currentQuizWord.meaning }}
                  </div>
                  <div v-else class="feedback-wrong">
                    ❌ 正确答案是：{{ currentQuizWord.meaning }}
                  </div>
                  <div class="feedback-example">{{ currentQuizWord.example_cn }}</div>
                </div>

                <div class="quiz-actions">
                  <button class="btn btn-outline" @click="resetQuiz">🔄 重新开始</button>
                  <button 
                    class="btn btn-primary" 
                    @click="nextQuizQuestion" 
                    :disabled="!quizSelectedOption"
                  >
                    {{ quizIndex === quizWords.length - 1 ? '📊 查看结果' : '下一题 ➡' }}
                  </button>
                </div>
              </div>

              <!-- 所有题目已答完，显示完成状态和查看结果按钮 -->
              <div v-else class="complete-state">
                <div class="complete-icon">🎉</div>
                <div class="complete-title">测试完成！</div>
                <div class="complete-desc">正确率：{{ quizCorrectRate }}%</div>
                <button class="btn btn-primary" @click="showQuizResult = true">📊 查看结果</button>
                <button class="btn btn-outline" @click="resetQuiz" style="margin-top: 8px;">🔄 重新测试</button>
              </div>
            </template>
          </template>
        </div>

        <!-- ============================================================ -->
        <!-- ===== 已学单词模式 ===== -->
        <!-- ============================================================ -->
        <div v-if="mode === 'review'" class="review-mode">
          <div class="review-top-bar">
            <div class="review-header-left">
              <span>📚 已标记单词</span>
              <span class="review-count">共 {{ learnedWordsList.length }} 个</span>
            </div>
            <button 
              class="btn btn-success" 
              @click="saveToHistory" 
              :disabled="learnedWordsList.length === 0"
            >
              💾 保存到历史记录
            </button>
          </div>

          <div v-if="learnedWordsList.length > 0" class="review-grid" ref="reviewContainer">
            <div
              v-for="word in learnedWordsList"
              :key="word.id"
              class="review-card"
              @click="toggleWordExpand(word.id)"
            >
              <div class="review-card-header">
                <span class="review-card-word">{{ word.word }}</span>
                <span class="review-card-phonetic">{{ word.phonetic }}</span>
                <span class="review-card-difficulty">{{ '⭐'.repeat(word.difficulty) }}</span>
              </div>
              <div v-if="expandedWords.has(word.id)" class="review-card-body">
                <div class="review-card-meaning">{{ word.meaning }}</div>
                <div class="review-card-example">
                  <span class="example-en">{{ word.example }}</span>
                  <span class="example-cn">{{ word.example_cn }}</span>
                </div>
              </div>
              <div v-else class="review-card-hint">
                👆 点击展开释义
              </div>
            </div>

            <!-- 底部：一键回到顶部 -->
            <button class="btn btn-back-top" @click="scrollToTop" v-if="learnedWordsList.length > 6">
              ⬆ 回到顶部
            </button>
          </div>
          <div v-else class="empty-state">
            <div class="empty-icon">📭</div>
            <p>还没有已标记的单词</p>
            <p class="hint">去「单词学习」中标记一些单词吧</p>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { wordBooks } from '../data/words.js'

// ============================================================
// 1. 存储工具函数
// ============================================================
const STORAGE_KEY_LEARNED = 'word_learned_ids'
const STORAGE_KEY_HISTORY = 'word_history_ids'

const loadLearnedIds = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LEARNED)
    if (saved) {
      const data = JSON.parse(saved)
      if (Array.isArray(data)) {
        return { all: new Set(data) }
      }
      const result = {}
      for (const [key, value] of Object.entries(data)) {
        result[key] = new Set(value)
      }
      return result
    }
  } catch (e) {
    console.warn('读取已学记录失败:', e)
  }
  return {}
}

const saveLearnedIds = (learnedMap) => {
  try {
    const data = {}
    for (const [key, set] of Object.entries(learnedMap)) {
      data[key] = [...set]
    }
    localStorage.setItem(STORAGE_KEY_LEARNED, JSON.stringify(data))
  } catch (e) {
    console.warn('保存已学记录失败:', e)
  }
}

const loadHistory = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_HISTORY)
    if (saved) {
      return new Set(JSON.parse(saved))
    }
  } catch (e) {
    console.warn('读取历史记录失败:', e)
  }
  return new Set()
}

const saveHistory = (historySet) => {
  try {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify([...historySet]))
  } catch (e) {
    console.warn('保存历史记录失败:', e)
  }
}

// ============================================================
// 2. 数据
// ============================================================
const allWords = computed(() => {
  const all = []
  wordBooks.forEach(book => {
    book.words.forEach(w => {
      if (!all.find(item => item.id === w.id)) {
        all.push({ ...w, bookId: book.id })
      }
    })
  })
  return all
})

// ============================================================
// 3. 筛选设置
// ============================================================
const selectedDifficulty = ref('')
const selectedCount = ref('')
const showHistory = ref(false)
const showCompleteModal = ref(false)
const showQuizResult = ref(false)

const settingsReady = computed(() => {
  return selectedDifficulty.value !== '' && selectedCount.value !== ''
})

// ============================================================
// 4. 状态
// ============================================================
const learnedMap = ref({})
const historyIds = ref(new Set())

watch(learnedMap, (newMap) => {
  saveLearnedIds(newMap)
}, { deep: true })

watch(historyIds, (newSet) => {
  saveHistory(newSet)
}, { deep: true })

// ============================================================
// 5. 核心计算
// ============================================================
const getWordsByDifficulty = () => {
  if (!settingsReady.value) return []

  let words = [...allWords.value]
  if (selectedDifficulty.value !== 'all') {
    const diff = parseInt(selectedDifficulty.value)
    words = words.filter(w => w.difficulty === diff)
  }
  return words
}

const currentLearnedSet = computed(() => {
  const key = selectedDifficulty.value || 'all'
  if (!learnedMap.value[key]) {
    learnedMap.value[key] = new Set()
  }
  return learnedMap.value[key]
})

const learnedInGroupSet = ref(new Set())

const groupSize = computed(() => {
  if (!settingsReady.value) return 0
  return parseInt(selectedCount.value) || 0
})

const learnedInGroup = computed(() => {
  return learnedInGroupSet.value.size
})

const groupProgressPercent = computed(() => {
  if (groupSize.value === 0) return 0
  return Math.round(learnedInGroupSet.value.size / groupSize.value * 100)
})

const totalCount = computed(() => {
  if (!settingsReady.value) return 0
  return getWordsByDifficulty().length
})

const historyInDifficulty = computed(() => {
  const all = getWordsByDifficulty()
  return all.filter(w => historyIds.value.has(w.id)).length
})

const remainingCount = computed(() => {
  return totalCount.value - historyInDifficulty.value
})

const remainingRatio = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round(remainingCount.value / totalCount.value * 100)
})

const currentGroupWords = ref([])

const updateCurrentGroup = () => {
  if (!settingsReady.value || groupSize.value === 0) {
    currentGroupWords.value = []
    return
  }

  const pool = getWordsByDifficulty().filter(w => !historyIds.value.has(w.id))

  if (pool.length === 0) {
    currentGroupWords.value = []
    return
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  const count = Math.min(groupSize.value, shuffled.length)
  currentGroupWords.value = shuffled.slice(0, count)
}

const filteredWords = computed(() => {
  return currentGroupWords.value
})

const unlearnedCount = computed(() => {
  return currentGroupWords.value.filter(w => !learnedInGroupSet.value.has(w.id)).length
})

const historyCount = computed(() => historyIds.value.size)

const historyWords = computed(() => {
  return allWords.value.filter(w => historyIds.value.has(w.id))
})

const learnedWordsList = computed(() => {
  return currentGroupWords.value.filter(w => learnedInGroupSet.value.has(w.id))
})

// ============================================================
// 6. 设置变化
// ============================================================
const onSettingsChange = () => {
  learnedInGroupSet.value = new Set()
  showCompleteModal.value = false
  showQuizResult.value = false
  
  updateCurrentGroup()
  if (settingsReady.value && totalCount.value > 0) {
    expandedWords.value = new Set()
    resetLearn()
    resetQuiz()
  }
}

// ============================================================
// 7. 历史记录操作
// ============================================================
const saveToHistory = () => {
  const learned = learnedInGroupSet.value
  if (learned.size === 0) {
    alert('还没有已标记的单词，请先标记一些单词再保存')
    return
  }

  learned.forEach(id => historyIds.value.add(id))

  const key = selectedDifficulty.value || 'all'
  if (!learnedMap.value[key]) {
    learnedMap.value[key] = new Set()
  }
  learned.forEach(id => learnedMap.value[key].add(id))

  learnedInGroupSet.value = new Set()
  updateCurrentGroup()
  resetLearn()
  resetQuiz()
  showCompleteModal.value = false

  alert(`✅ 已保存 ${learned.size} 个单词到历史记录！`)
}

const clearHistory = () => {
  if (confirm('确定要清空所有历史记录吗？清空后这些单词将重新出现在学习中。')) {
    historyIds.value = new Set()
    for (const key of Object.keys(learnedMap.value)) {
      learnedMap.value[key] = new Set()
    }
    learnedInGroupSet.value = new Set()
    updateCurrentGroup()
    resetLearn()
    resetQuiz()
    showHistory.value = false
  }
}

// ============================================================
// 8. 状态
// ============================================================
const mode = ref('learn')

const currentWords = ref([])
const currentWordIndex = ref(0)
const showLearnAnswer = ref(false)

const quizWords = ref([])
const quizIndex = ref(0)
const quizSelectedOption = ref(null)
const quizCorrectCount = ref(0)
const quizAnsweredCount = ref(0)

const expandedWords = ref(new Set())

const reviewContainer = ref(null)

// ============================================================
// 9. 计算属性
// ============================================================
const currentWord = computed(() => {
  return currentWords.value[currentWordIndex.value] || null
})

const currentQuizWord = computed(() => {
  return quizWords.value[quizIndex.value] || null
})

const currentOptions = computed(() => {
  if (!currentQuizWord.value) return []
  const correct = currentQuizWord.value
  const others = allWords.value
    .filter(w => w.id !== correct.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
  const all = [correct, ...others].sort(() => Math.random() - 0.5)
  return all.map(w => ({ id: w.id, meaning: w.meaning }))
})

const quizCorrectRate = computed(() => {
  if (quizAnsweredCount.value === 0) return 0
  return Math.round(quizCorrectCount.value / quizAnsweredCount.value * 100)
})

// ============================================================
// 10. 模式切换
// ============================================================
const switchMode = (newMode) => {
  if (!settingsReady.value || totalCount.value === 0) return
  mode.value = newMode
  if (newMode === 'learn') resetLearn()
  if (newMode === 'quiz') {
    showQuizResult.value = false
    resetQuiz()
  }
}

const goToQuiz = () => {
  showCompleteModal.value = false
  mode.value = 'quiz'
  resetQuiz()
}

const goToReview = () => {
  showQuizResult.value = false
  mode.value = 'review'
}

const closeCompleteModal = () => {
  showCompleteModal.value = false
}

const closeQuizResult = () => {
  showQuizResult.value = false
  resetQuiz()
}

// ============================================================
// 11. 结果文案
// ============================================================
const getResultTitle = () => {
  const rate = quizCorrectRate.value
  if (rate === 100) return '🌟 完美通关！'
  if (rate >= 80) return '👏 表现优秀！'
  if (rate >= 60) return '💪 继续加油！'
  return '📖 需要再复习！'
}

const getResultMessage = () => {
  const rate = quizCorrectRate.value
  if (rate === 100) return '全部答对！你是今天的学习之星！✨'
  if (rate >= 80) return '掌握得很不错，继续保持！'
  if (rate >= 60) return '还可以更好，多复习一下错题吧！'
  return '别灰心，再去「单词学习」中巩固一下吧！'
}

// ============================================================
// 12. 学习模式
// ============================================================
const resetLearn = () => {
  currentWords.value = [...filteredWords.value]
  currentWordIndex.value = 0
  showLearnAnswer.value = false
}

const nextWord = () => {
  if (currentWordIndex.value < currentWords.value.length - 1) {
    currentWordIndex.value++
    showLearnAnswer.value = false
  }
}

const prevWord = () => {
  if (currentWordIndex.value > 0) {
    currentWordIndex.value--
    showLearnAnswer.value = false
  }
}

const flipLearnCard = () => {
  if (currentWord.value) {
    showLearnAnswer.value = !showLearnAnswer.value
  }
}

const markLearned = () => {
  if (currentWord.value) {
    learnedInGroupSet.value.add(currentWord.value.id)

    const key = selectedDifficulty.value || 'all'
    if (!learnedMap.value[key]) {
      learnedMap.value[key] = new Set()
    }
    learnedMap.value[key].add(currentWord.value.id)

    // 判断是否全部标记完成
    if (learnedInGroupSet.value.size >= groupSize.value && groupSize.value > 0) {
      showCompleteModal.value = true
      return
    }

    if (currentWordIndex.value < currentWords.value.length - 1) {
      currentWordIndex.value++
    }
    showLearnAnswer.value = false
  }
}

// ============================================================
// 13. 复习测试模式
// ============================================================
const resetQuiz = () => {
  const learned = currentGroupWords.value.filter(w => learnedInGroupSet.value.has(w.id))
  if (learned.length === 0) {
    quizWords.value = []
    quizIndex.value = 0
    quizSelectedOption.value = null
    quizCorrectCount.value = 0
    quizAnsweredCount.value = 0
    showQuizResult.value = false
    return
  }
  quizWords.value = [...learned].sort(() => Math.random() - 0.5)
  quizIndex.value = 0
  quizSelectedOption.value = null
  quizCorrectCount.value = 0
  quizAnsweredCount.value = 0
  showQuizResult.value = false
}

const selectQuizOption = (option) => {
  if (quizSelectedOption.value) return
  quizSelectedOption.value = option
  quizAnsweredCount.value++
  if (option.id === currentQuizWord.value.id) {
    quizCorrectCount.value++
  }
}

const nextQuizQuestion = () => {
  // 检查是否还有下一题
  if (quizIndex.value < quizWords.value.length - 1) {
    // 有下一题：跳转
    quizIndex.value++
    quizSelectedOption.value = null
  } else {
    // ★★★ 所有题目答完，直接显示结果弹窗 ★★★
    showQuizResult.value = true
  }
}

// ============================================================
// 14. 已学单词模式
// ============================================================
const toggleWordExpand = (wordId) => {
  if (expandedWords.value.has(wordId)) {
    expandedWords.value.delete(wordId)
  } else {
    expandedWords.value.add(wordId)
  }
  expandedWords.value = new Set(expandedWords.value)
}

const scrollToTop = () => {
  const container = document.querySelector('.review-grid')
  if (container) {
    container.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// ============================================================
// 15. 键盘快捷键
// ============================================================
const handleKeydown = (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return
  if (showCompleteModal.value || showQuizResult.value) return

  if (e.key === ' ') {
    e.preventDefault()
    if (mode.value === 'learn') flipLearnCard()
  }
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault()
    if (mode.value === 'learn') nextWord()
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault()
    if (mode.value === 'learn') prevWord()
  }
  if (e.key === 'Enter' && mode.value === 'learn' && currentWord.value) {
    e.preventDefault()
    markLearned()
  }
}

// ============================================================
// 16. 初始化
// ============================================================
onMounted(() => {
  learnedMap.value = loadLearnedIds()
  historyIds.value = loadHistory()
  updateCurrentGroup()
  resetLearn()
  resetQuiz()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

if (selectedDifficulty.value !== '' && selectedCount.value !== '') {
  updateCurrentGroup()
  resetLearn()
  resetQuiz()
}
</script>

<style scoped>
/* ===== 容器 ===== */
.word-card-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px 0;
}

/* ===== 设置栏 ===== */
.settings-bar {
  display: flex;
  gap: 20px;
  align-items: flex-end;
  flex-wrap: wrap;
  padding: 16px 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 20px;
}

.settings-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.settings-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.settings-group select {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  min-width: 150px;
  cursor: pointer;
}

.settings-group select:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.settings-group select option[value=""] {
  color: var(--vp-c-text-3);
}

.word-count-badge {
  padding: 8px 16px;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
}

.word-count-badge.warning {
  background: #ef4444;
}

.ratio-hint {
  font-weight: 400;
  opacity: 0.8;
  margin-left: 4px;
}

.btn-history {
  padding: 8px 16px;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.btn-history:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

/* ===== 历史记录弹窗 ===== */
.history-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.history-modal-content {
  background: var(--vp-c-bg);
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.history-header h3 {
  margin: 0;
  font-size: 20px;
  color: var(--vp-c-text-1);
}

.btn-close-modal {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 4px 8px;
}

.btn-close-modal:hover {
  color: var(--vp-c-text-1);
}

.history-guide {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: var(--vp-c-brand-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.guide-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.guide-text {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.history-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 24px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.history-item:last-child {
  border-bottom: none;
}

.history-word {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  min-width: 120px;
}

.history-meaning {
  font-size: 15px;
  color: var(--vp-c-text-2);
  flex: 1;
}

.history-difficulty {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.history-empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--vp-c-text-3);
}

.history-empty .empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.history-empty p {
  margin: 4px 0;
}

.history-empty .hint {
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.history-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: flex-end;
}

.btn-danger {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-danger:hover {
  background: #dc2626;
}

/* ===== 设置提示 ===== */
.setup-hint {
  text-align: center;
  padding: 80px 32px;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  border: 2px dashed var(--vp-c-divider);
}

.hint-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.setup-hint h3 {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.setup-hint p {
  font-size: 16px;
  color: var(--vp-c-text-2);
}

/* ===== 空状态（大） ===== */
.empty-state-large {
  text-align: center;
  padding: 80px 32px;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  border: 2px dashed var(--vp-c-divider);
}

.empty-state-large .empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state-large h3 {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.empty-state-large p {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 4px 0;
}

/* ===== 模式切换 ===== */
.mode-tabs {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 24px;
}

.mode-btn {
  padding: 8px 28px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.mode-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.mode-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

/* ===== 完成弹窗 ===== */
.complete-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.complete-modal {
  background: var(--vp-c-bg);
  border-radius: 20px;
  max-width: 480px;
  width: 100%;
  padding: 40px 32px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalPop 0.3s ease;
}

@keyframes modalPop {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.complete-modal-icon {
  font-size: 72px;
  margin-bottom: 12px;
}

.complete-modal-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.complete-modal-desc {
  font-size: 16px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 20px;
}

.complete-modal-desc strong {
  color: var(--vp-c-brand-1);
}

.complete-modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ===== 进度 ===== */
.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  margin-bottom: 12px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand-1), #10b981);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.group-hint {
  text-align: center;
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
}

.group-hint strong {
  color: var(--vp-c-brand-1);
}

/* ===== 单词卡片 ===== */
.word-card {
  perspective: 1000px;
  min-height: 280px;
  margin-bottom: 20px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.card-inner {
  position: relative;
  width: 100%;
  min-height: 280px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.word-card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 280px;
  backface-visibility: hidden;
  border-radius: 16px;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--vp-c-divider);
}

.card-front {
  background: var(--vp-c-bg-soft);
}

.card-back {
  background: var(--vp-c-bg-soft);
  transform: rotateY(180deg);
  border-color: var(--vp-c-brand-1);
}

.word-number {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.word-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.word-phonetic {
  font-size: 18px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

.word-tags {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.tag {
  padding: 2px 12px;
  border-radius: 12px;
  font-size: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
}

.difficulty {
  font-size: 15px;
  color: var(--vp-c-text-3);
}

.word-status {
  margin-top: 4px;
  font-size: 15px;
  color: #10b981;
  font-weight: 600;
}

.hint {
  margin-top: 16px;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.meaning {
  font-size: 28px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-align: center;
}

.example {
  margin-top: 12px;
  text-align: center;
}

.example-en {
  display: block;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.example-cn {
  display: block;
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* ===== 完成状态 ===== */
.complete-state {
  text-align: center;
  padding: 60px 32px;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  border: 2px solid #10b981;
  margin-bottom: 20px;
}

.complete-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.complete-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.complete-desc {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* ===== 操作按钮 ===== */
.word-actions,
.quiz-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ===== 复习测试模式 ===== */
.quiz-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 30px 24px;
  border: 2px solid var(--vp-c-divider);
  margin-bottom: 20px;
}

.quiz-question {
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.quiz-number {
  display: block;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.quiz-word {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 8px 0 4px;
}

.quiz-phonetic {
  display: block;
  font-size: 16px;
  color: var(--vp-c-text-2);
}

.quiz-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .quiz-options {
    grid-template-columns: 1fr;
  }
}

.quiz-option {
  padding: 14px 18px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.quiz-option:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
}

.quiz-option:disabled {
  cursor: not-allowed;
}

.quiz-option.selected {
  border-color: var(--vp-c-brand-1);
}

.quiz-option.correct {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.quiz-option.wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.quiz-feedback {
  margin-top: 20px;
  padding: 16px 20px;
  border-radius: 10px;
  text-align: center;
}

.feedback-correct {
  color: #10b981;
  font-size: 18px;
  font-weight: 600;
}

.feedback-wrong {
  color: #ef4444;
  font-size: 18px;
  font-weight: 600;
}

.feedback-example {
  margin-top: 8px;
  font-size: 15px;
  color: var(--vp-c-text-2);
}

/* ===== 已学单词模式 ===== */
.review-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 2px solid var(--vp-c-divider);
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.review-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.review-count {
  font-size: 14px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

.review-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
  max-height: 600px;
  overflow-y: auto;
  padding: 4px 4px 12px 4px;
}

.review-grid::-webkit-scrollbar {
  width: 6px;
}

.review-grid::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 3px;
}

.review-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 70px;
  display: flex;
  flex-direction: column;
}

.review-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.review-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.review-card-word {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.review-card-phonetic {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.review-card-difficulty {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-left: auto;
}

.review-card-hint {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 6px;
  opacity: 0.6;
}

.review-card-body {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.review-card-meaning {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.review-card-example {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.review-card-example .example-en {
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.review-card-example .example-cn {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.btn-back-top {
  grid-column: 1 / -1;
  margin-top: 4px;
  padding: 10px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-back-top:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

/* ===== 空状态 ===== */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--vp-c-text-3);
}

.empty-state .empty-icon {
  font-size: 56px;
  display: block;
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 16px;
}

.empty-state .hint {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

/* ===== 按钮 ===== */
.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 2px solid var(--vp-c-divider);
}

.btn-outline:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

/* ============================================================ */
/* ===== 移动端适配 ===== */
/* ============================================================ */

@media (max-width: 768px) {
  .word-card-container {
    padding: 10px 16px;
  }

  .settings-bar {
    gap: 12px;
    padding: 14px 16px;
  }

  .settings-group {
    flex: 1 1 calc(50% - 6px);
    min-width: 120px;
  }

  .settings-group select {
    min-width: 100%;
    font-size: 13px;
    padding: 8px 12px;
  }

  .word-count-badge {
    font-size: 13px;
    padding: 6px 12px;
  }

  .btn-history {
    font-size: 13px;
    padding: 6px 12px;
  }

  .mode-btn {
    padding: 6px 16px;
    font-size: 13px;
  }

  .word-title {
    font-size: 28px;
  }

  .card-front,
  .card-back {
    padding: 28px 20px;
    min-height: 220px;
  }

  .word-card {
    min-height: 220px;
  }

  .review-grid {
    grid-template-columns: 1fr;
    max-height: 450px;
  }

  .review-card-word {
    font-size: 18px;
  }

  .complete-modal {
    padding: 28px 20px;
    margin: 0 12px;
  }

  .complete-modal-title {
    font-size: 22px;
  }

  .complete-modal-icon {
    font-size: 56px;
  }

  .btn {
    padding: 8px 16px;
    font-size: 13px;
  }

  .word-actions,
  .quiz-actions {
    gap: 8px;
  }

  .quiz-word {
    font-size: 26px;
  }

  .quiz-option {
    padding: 12px 14px;
    font-size: 14px;
  }

  .history-modal-content {
    max-width: 100%;
    margin: 0 12px;
    max-height: 90vh;
  }
}

@media (max-width: 480px) {
  .settings-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 12px 14px;
  }

  .settings-group {
    flex: 1 1 100%;
    min-width: unset;
    width: 100%;
  }

  .settings-group label {
    font-size: 12px;
  }

  .settings-group select {
    width: 100%;
    font-size: 13px;
    padding: 8px 12px;
  }

  .word-count-badge {
    display: block;
    width: 100%;
    text-align: center;
  }

  .settings-group:last-child label {
    display: none;
  }

  .btn-history {
    width: 100%;
  }

  .mode-tabs {
    gap: 4px;
    flex-wrap: wrap;
  }

  .mode-btn {
    flex: 1;
    min-width: 80px;
    padding: 6px 12px;
    font-size: 12px;
    text-align: center;
  }

  .word-title {
    font-size: 24px;
  }

  .word-phonetic {
    font-size: 15px;
  }

  .card-front,
  .card-back {
    padding: 20px 16px;
    min-height: 180px;
  }

  .word-card {
    min-height: 180px;
  }

  .meaning {
    font-size: 22px;
  }

  .word-number {
    font-size: 11px;
  }

  .word-actions,
  .quiz-actions {
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .word-actions .btn,
  .quiz-actions .btn {
    width: 100%;
    max-width: 200px;
    justify-content: center;
    padding: 10px 16px;
  }

  .btn {
    font-size: 13px;
    padding: 8px 16px;
  }

  .review-top-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .review-header-left {
    font-size: 14px;
    justify-content: center;
  }

  .review-top-bar .btn {
    width: 100%;
    text-align: center;
  }

  .review-grid {
    grid-template-columns: 1fr;
    max-height: 400px;
    gap: 10px;
  }

  .review-card {
    padding: 12px 16px;
    min-height: 60px;
  }

  .review-card-word {
    font-size: 17px;
  }

  .review-card-meaning {
    font-size: 16px;
  }

  .quiz-word {
    font-size: 22px;
  }

  .quiz-options {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .quiz-option {
    padding: 10px 14px;
    font-size: 14px;
  }

  .quiz-card {
    padding: 20px 16px;
  }

  .complete-modal {
    padding: 24px 16px;
    margin: 0 8px;
  }

  .complete-modal-title {
    font-size: 20px;
  }

  .complete-modal-icon {
    font-size: 48px;
  }

  .complete-modal-desc {
    font-size: 14px;
  }

  .complete-modal-actions {
    flex-direction: column;
    align-items: center;
  }

  .complete-modal-actions .btn {
    width: 100%;
    max-width: 200px;
    text-align: center;
  }

  .history-modal-content {
    margin: 0 8px;
    max-height: 85vh;
  }

  .history-item {
    flex-wrap: wrap;
    gap: 8px;
  }

  .history-word {
    font-size: 16px;
    min-width: 80px;
  }

  .history-meaning {
    font-size: 14px;
  }

  .word-count-badge {
    font-size: 12px;
    padding: 6px 10px;
  }

  .btn-history {
    font-size: 12px;
    padding: 6px 10px;
  }

  .ratio-hint {
    display: none;
  }

  .btn-back-top {
    font-size: 13px;
    padding: 8px 16px;
  }
}
</style>

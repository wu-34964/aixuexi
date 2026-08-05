<template>
  <div class="mingju-game">
    <div class="game-header">
      <h1>📝 名篇名句默写闯关</h1>
      <p>随机抽题、一题一卡、答完当前范围后自动清空进度</p>
    </div>

    <div v-if="status === 'setup'" class="setup-panel">
      <h2>选择闯关范围</h2>
      <p class="setup-tip">可以只选课本，也可以继续选择篇目；不选则使用全范围。</p>

      <div class="scope-form">
        <div class="form-item">
          <label>课本</label>
          <select v-model="scope.textbook" @change="onTextbookChange">
            <option value="">全部课本</option>
            <option v-for="book in availableTextbooks" :key="book" :value="book">{{ book }}</option>
          </select>
        </div>

        <div class="form-item">
          <label>篇目</label>
          <select v-model="scope.article">
            <option value="">全部篇目</option>
            <option v-for="article in availableArticles" :key="article" :value="article">{{ article }}</option>
          </select>
        </div>

        <div class="form-item">
          <label>题型</label>
          <select v-model="scope.source">
            <option value="">全部题型</option>
            <option value="基础">基础题</option>
            <option value="高考模拟">高考模拟</option>
          </select>
        </div>
      </div>

      <div class="scope-count">当前范围共 <strong>{{ filteredPool.length }}</strong> 题</div>

      <div class="setup-actions">
        <button v-if="hasSavedGame" class="btn primary" @click="resumeGame">继续上次闯关</button>
        <button class="btn primary" @click="startGame(false)">按所选范围开始</button>
        <button class="btn outline" @click="startGame(true)">放弃选择，全范围开始</button>
      </div>
    </div>

    <div v-else-if="status === 'playing'" class="game-panel">
      <div class="game-stats">
        <div class="stat-item">
          <span>已答</span>
          <strong>{{ answeredCount }}</strong>
        </div>
        <div class="stat-item">
          <span>剩余</span>
          <strong>{{ remainingIds.length }}</strong>
        </div>
        <div class="stat-item">
          <span>范围</span>
          <strong class="scope-text">{{ scopeText }}</strong>
        </div>
      </div>

      <div class="card-wrap">
        <div
          class="question-card"
          :class="{ flipped }"
          @click="flipped = !flipped"
        >
          <div class="card-face front">
            <div class="card-meta">
              <span class="badge">{{ currentCard?.textbook }}</span>
              <span class="badge">{{ currentCard?.article }}</span>
              <span class="badge source">{{ currentCard?.source }}</span>
            </div>
            <h2>请默写</h2>
            <p class="question-text">{{ currentCard?.question }}</p>
            <span class="flip-hint">点击卡片查看答案</span>
          </div>

          <div class="card-face back">
            <div class="card-meta">
              <span class="badge">参考答案</span>
              <span class="badge">{{ currentCard?.article }}</span>
            </div>
            <p class="answer-text">{{ currentCard?.answer || '答案待补充' }}</p>
            <span class="flip-hint">点击卡片返回题目</span>
          </div>
        </div>
      </div>

      <div class="game-actions">
        <button class="btn outline" @click="changeScope">重新选择范围</button>
        <button class="btn primary" @click="nextQuestion">答完本题，下一题</button>
      </div>
      <p class="save-tip">进度已自动保存，下次打开可以继续。</p>
    </div>

    <div v-else class="finish-panel">
      <span>🎉</span>
      <h2>闯关完成</h2>
      <p>当前范围共 {{ totalCount }} 题已全部完成，进度已清空。</p>
      <button class="btn primary" @click="restart">再闯一次</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { mingjuCards } from '../data/mingju.js'

const STORAGE_KEY = 'mingju-game-state-v1'

const status = ref('setup')
const scope = ref({ textbook: '', article: '', source: '' })
const poolIds = ref([])
const remainingIds = ref([])
const currentId = ref(null)
const totalCount = ref(0)
const flipped = ref(false)
const hasSavedGame = ref(false)

const cardById = computed(() => {
  const map = new Map()
  mingjuCards.forEach(card => map.set(card.id, card))
  return map
})

const availableTextbooks = computed(() => {
  return [...new Set(mingjuCards.map(card => card.textbook))].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
})

const availableArticles = computed(() => {
  const cards = mingjuCards.filter(card => !scope.value.textbook || card.textbook === scope.value.textbook)
  return [...new Set(cards.map(card => card.article))].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
})

const filteredPool = computed(() => {
  return mingjuCards.filter(card => {
    const textbookMatched = !scope.value.textbook || card.textbook === scope.value.textbook
    const articleMatched = !scope.value.article || card.article === scope.value.article
    const sourceMatched = !scope.value.source || card.source === scope.value.source
    return textbookMatched && articleMatched && sourceMatched
  })
})

const currentCard = computed(() => {
  return currentId.value != null ? cardById.value.get(currentId.value) : null
})

const answeredCount = computed(() => totalCount.value - remainingIds.value.length)

const scopeText = computed(() => {
  const parts = [
    scope.value.textbook || '全部课本',
    scope.value.article || '全部篇目',
    scope.value.source || '全部题型'
  ]
  return parts.join(' · ')
})

const loadSavedGame = () => {
  if (typeof window === 'undefined') return false
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const saved = JSON.parse(raw)
    if (!saved || !saved.remainingIds?.length) return false
    scope.value = saved.scope || { textbook: '', article: '', source: '' }
    poolIds.value = saved.poolIds || []
    remainingIds.value = saved.remainingIds
    currentId.value = saved.currentId
    totalCount.value = saved.totalCount || poolIds.value.length
    hasSavedGame.value = true
    return true
  } catch {
    return false
  }
}

const saveGame = () => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    scope: scope.value,
    poolIds: poolIds.value,
    remainingIds: remainingIds.value,
    currentId: currentId.value,
    totalCount: totalCount.value
  }))
  hasSavedGame.value = true
}

const clearGame = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  hasSavedGame.value = false
}

const startGame = (useAll) => {
  if (useAll) {
    scope.value = { textbook: '', article: '', source: '' }
  }
  const pool = filteredPool.value.map(card => card.id)
  if (!pool.length) return
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  poolIds.value = pool
  remainingIds.value = shuffled
  currentId.value = shuffled[0]
  totalCount.value = pool.length
  flipped.value = false
  status.value = 'playing'
  saveGame()
}

const resumeGame = () => {
  if (loadSavedGame()) {
    flipped.value = false
    status.value = 'playing'
  }
}

const nextQuestion = () => {
  if (currentId.value == null) return
  remainingIds.value = remainingIds.value.filter(id => id !== currentId.value)
  if (remainingIds.value.length === 0) {
    status.value = 'finished'
    clearGame()
    return
  }
  const nextIndex = Math.floor(Math.random() * remainingIds.value.length)
  currentId.value = remainingIds.value[nextIndex]
  flipped.value = false
  saveGame()
}

const changeScope = () => {
  clearGame()
  status.value = 'setup'
  scope.value = { textbook: '', article: '', source: '' }
  poolIds.value = []
  remainingIds.value = []
  currentId.value = null
  totalCount.value = 0
  flipped.value = false
}

const restart = () => {
  changeScope()
}

const onTextbookChange = () => {
  scope.value.article = ''
}

onMounted(() => {
  loadSavedGame()
})
</script>

<style scoped>
.mingju-game {
  max-width: 920px;
  margin: 0 auto;
  padding: 18px 0;
}

.game-header {
  text-align: center;
  padding: 4px 0 22px;
}

.game-header h1 {
  font-size: 30px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
}

.game-header p {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.setup-panel,
.finish-panel {
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.setup-panel h2,
.finish-panel h2 {
  font-size: 22px;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}

.setup-tip {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 18px;
}

.scope-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-item label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.form-item select {
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  width: 100%;
}

.form-item select:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.scope-count {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 18px 0;
}

.scope-count strong {
  color: var(--vp-c-brand-1);
}

.setup-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn.primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.btn.primary:hover {
  background: var(--vp-c-brand-2);
}

.btn.outline:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.game-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 18px;
}

.stat-item {
  padding: 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  text-align: center;
}

.stat-item span {
  display: block;
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.stat-item strong {
  display: block;
  font-size: 24px;
  color: var(--vp-c-brand-1);
}

.stat-item strong.scope-text {
  font-size: 13px;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  word-break: break-word;
}

.card-wrap {
  perspective: 1400px;
  margin-bottom: 18px;
}

.question-card {
  position: relative;
  min-height: 460px;
  transform-style: preserve-3d;
  transition: transform 0.55s ease;
  cursor: pointer;
}

.question-card.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 26px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  backface-visibility: hidden;
  box-sizing: border-box;
  overflow: auto;
}

.card-face.back {
  transform: rotateY(180deg);
}

.card-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.badge {
  padding: 3px 10px;
  border-radius: 14px;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 600;
}

.badge.source {
  background: #fef3c7;
  border-color: #f59e0b;
  color: #b45309;
}

.card-face h2 {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0 0 12px;
}

.question-text,
.answer-text {
  font-size: 16px;
  line-height: 1.9;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
  word-break: break-word;
}

.answer-text {
  font-size: 15px;
}

.flip-hint {
  margin-top: auto;
  padding-top: 20px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.game-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.save-tip {
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 12px 0 0;
}

.finish-panel {
  text-align: center;
}

.finish-panel span {
  font-size: 52px;
  display: block;
  margin-bottom: 10px;
}

.finish-panel p {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin-bottom: 18px;
}

@media (max-width: 720px) {
  .mingju-game {
    padding: 10px 16px;
  }

  .scope-form {
    grid-template-columns: 1fr;
  }

  .game-stats {
    grid-template-columns: 1fr 1fr;
  }

  .stat-item:last-child {
    grid-column: 1 / -1;
  }

  .question-card {
    min-height: 420px;
  }

  .card-face {
    padding: 18px;
  }
}
</style>

<template>
  <div class="formula-learn">
    <div class="page-header">
      <h1>🧠 公式学习</h1>
      <p>随机提问 · 翻转查看 · 标记掌握</p>
    </div>

    <div class="filter-row">
      <div class="filter-group">
        <label>学科</label>
        <select v-model="quizSubject" @change="resetQuiz">
          <option v-for="s in subjects" :key="s.value" :value="s.value">{{ s.icon }} {{ s.label }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label>章节</label>
        <select v-model="quizChapter" @change="resetQuiz">
          <option v-for="c in chapters[quizSubject]" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
      </div>
      <div class="filter-group progress-info">
        <span>📊 已掌握 <strong>{{ answeredIds.size }}</strong> / {{ availableQuizFormulas.length }}</span>
        <span style="font-size:12px;color:var(--vp-c-text-3);">
          {{ Math.round(answeredIds.size / Math.max(availableQuizFormulas.length, 1) * 100) }}%
        </span>
      </div>
    </div>

    <!-- 进度条 -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
    </div>

    <!-- 题目卡片 - 修复镜像问题 -->
    <div class="quiz-card">
      <!-- 有题目时显示 -->
      <div v-if="currentQuiz" class="card-flip-container">
        <div class="card-inner" :class="{ flipped: showAnswer }">
          <!-- 正面：题目 -->
          <div class="card-front">
            <div class="question-icon">📝</div>
            <div class="question-name">{{ currentQuiz.name }}</div>
            <div class="question-desc">{{ currentQuiz.description }}</div>
            <div class="hint">💡 点击下方「查看答案」翻转卡片</div>
          </div>
          <!-- 背面：答案 -->
          <div class="card-back">
            <div class="answer-label">📖 公式</div>
            <div class="formula-display" v-html="renderFormula(currentQuiz.formula)"></div>
          </div>
        </div>
      </div>

      <!-- ★★★ 全部掌握状态 - 独立显示，不受翻转影响 ★★★ -->
      <div v-else class="complete-state">
        <div class="complete-icon">🎉</div>
        <div class="complete-title">全部掌握！</div>
        <div class="complete-desc">太棒了，本章节所有公式已学完</div>
        <button class="btn btn-secondary" @click="resetQuiz" style="margin-top:16px;">
          🔄 重新学习
        </button>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="quiz-actions">
      <template v-if="currentQuiz">
        <button v-if="!showAnswer" class="btn btn-primary" @click="flipCard">
          👀 查看答案
        </button>
        <button v-if="showAnswer" class="btn btn-success" @click="markCorrect">
          ✅ 已掌握
        </button>
        <button class="btn btn-outline" @click="nextQuestion">
          ⏭️ 下一题
        </button>
      </template>
      <button class="btn btn-secondary" @click="resetQuiz">
        🔄 重新开始
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { subjects, chapters, formulas } from '../data/formulas.js'

// ========== 状态 ==========
const quizSubject = ref('math')
const quizChapter = ref('algebra')
const currentQuiz = ref(null)
const showAnswer = ref(false)
const answeredIds = ref(new Set())

// ========== 计算属性 ==========
const availableQuizFormulas = computed(() => {
  return formulas.filter(f => 
    f.subject === quizSubject.value && 
    f.chapter === quizChapter.value
  )
})

const progressPercent = computed(() => {
  const total = availableQuizFormulas.value.length
  if (total === 0) return 0
  return Math.round(answeredIds.value.size / total * 100)
})

// ========== 方法 ==========
const renderFormula = (latex) => {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: true
    })
  } catch (e) {
    return `<span style="color:red;">${latex}</span>`
  }
}

const nextQuestion = () => {
  const available = availableQuizFormulas.value.filter(f => !answeredIds.value.has(f.id))
  if (available.length === 0) {
    currentQuiz.value = null
    return
  }
  currentQuiz.value = available[Math.floor(Math.random() * available.length)]
  showAnswer.value = false
}

const flipCard = () => {
  showAnswer.value = true
}

const markCorrect = () => {
  if (currentQuiz.value) {
    answeredIds.value.add(currentQuiz.value.id)
    nextQuestion()
  }
}

const resetQuiz = () => {
  answeredIds.value = new Set()
  const available = availableQuizFormulas.value
  if (available.length > 0) {
    currentQuiz.value = available[Math.floor(Math.random() * available.length)]
  } else {
    currentQuiz.value = null
  }
  showAnswer.value = false
}

// 初始化
resetQuiz()
</script>

<style scoped>
.formula-learn {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.page-header {
  text-align: center;
  padding-bottom: 30px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.page-header p {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* ===== 筛选栏 ===== */
.filter-row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.filter-group select {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  min-width: 140px;
}

.filter-group select:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.progress-info {
  margin-left: auto;
  font-size: 15px;
  color: var(--vp-c-text-2);
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.progress-info strong {
  color: var(--vp-c-brand-1);
}

/* ===== 进度条 ===== */
.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--vp-c-divider);
  border-radius: 3px;
  margin-bottom: 24px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand-1), #10b981);
  border-radius: 3px;
  transition: width 0.5s ease;
}

/* ===== 卡片容器 ===== */
.quiz-card {
  min-height: 320px;
  margin-bottom: 24px;
  position: relative;
}

/* ===== 3D 翻转容器 ===== */
.card-flip-container {
  perspective: 1000px;
  min-height: 320px;
}

.card-inner {
  position: relative;
  width: 100%;
  min-height: 320px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

/* ===== 卡片正面和背面 ===== */
.card-front,
.card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 320px;
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
  transform: rotateY(0deg);
}

.card-back {
  background: var(--vp-c-bg-soft);
  transform: rotateY(180deg);
  border-color: var(--vp-c-brand-1);
}

/* ===== 卡片内容样式 ===== */
.question-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.question-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
}

.question-desc {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
  text-align: center;
}

.hint {
  margin-top: 16px;
  font-size: 14px;
  color: var(--vp-c-text-3);
}

.answer-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.formula-display {
  padding: 16px 24px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  text-align: center;
  font-size: 26px;
  width: 100%;
  overflow-x: auto;
}

.formula-display :deep(.katex) {
  font-size: 1.2em;
}

/* ===== ★★★ 全部掌握状态 - 独立显示，不受翻转影响 ★★★ ===== */
.complete-state {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 60px 32px;
  text-align: center;
  border: 2px solid #10b981;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* 确保文字正常显示，不被镜像 */
  transform: none !important;
  -webkit-transform: none !important;
}

.complete-state .complete-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.complete-state .complete-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.complete-state .complete-desc {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin-top: 4px;
}

/* ===== 操作按钮 ===== */
.quiz-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 32px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 2px solid var(--vp-c-divider);
}

.btn-outline:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.btn-secondary {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.btn-secondary:hover {
  background: var(--vp-c-default-3);
}
</style>
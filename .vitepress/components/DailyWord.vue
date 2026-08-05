<template>
  <div class="daily-word">
    <div class="page-header">
      <h1>📖 150天背完3000词</h1>
      <p>每天一个页面，系统掌握高考核心词汇</p>
    </div>

    <!-- ===== 天数选择器（含跳转功能） ===== -->
    <div class="day-selector">
      <button class="day-nav" @click="prevDay" :disabled="currentDay <= 1">⬅</button>
      
      <div class="day-input-group">
        <span class="day-label">第</span>
        <input 
          type="number" 
          v-model.number="inputDay" 
          @keyup.enter="jumpToDay" 
          @blur="jumpToDay"
          min="1"
          :max="totalDays"
          class="day-input"
        />
        <span class="day-label">天 / {{ totalDays }} 天</span>
      </div>
      
      <button class="day-nav" @click="nextDay" :disabled="currentDay >= totalDays">➡</button>
      
      <span class="day-progress">{{ currentDay }} / {{ totalDays }}</span>
    </div>

    <!-- ===== 进度条 ===== -->
    <div class="progress-bar-wrapper">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <span class="progress-text">{{ progressPercent }}%</span>
    </div>

    <!-- ===== 打印按钮 ===== -->
    <div class="print-btn-wrapper">
      <button class="btn btn-primary" @click="printContent">
        🖨️ 打印本页（A4排版）
      </button>
    </div>

    <!-- ===== 今日内容（打印区域） ===== -->
    <div id="print-area" ref="printArea" class="print-area">
      <div v-if="dayData" class="day-content">
        <!-- 标题行 -->
        <div class="print-header">
          <h2>第 {{ dayData.day }} 天 / 150 天</h2>
          <p class="print-sub">
            累计词汇：{{ dayData.cumulativeWords }} → {{ dayData.cumulativeWords + dayData.totalWords }} 词 &nbsp;|&nbsp; 日期：________
          </p>
        </div>

        <!-- 今日目标 -->
        <div class="goal-box">
          <h3>🎯 今日学习目标</h3>
          <p>{{ dayData.goal }}</p>
        </div>

        <!-- 单词表格 -->
        <div class="word-table-wrapper">
          <h3>📝 今日单词（共 {{ dayData.totalWords }} 词）</h3>
          <table v-if="!singleColumn" class="word-table">
            <thead>
              <tr>
                <th style="width:40px;">复习</th>
                <th style="width:80px;">单词</th>
                <th style="width:90px;">音标</th>
                <th style="width:60px;">词性</th>
                <th style="width:100px;">释义</th>
                <th style="width:40px;">复习</th>
                <th style="width:80px;">单词</th>
                <th style="width:90px;">音标</th>
                <th style="width:60px;">词性</th>
                <th style="width:100px;">释义</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in wordRows" :key="index">
                <td class="review-cell">
                  <span class="checkbox" :class="{ checked: row.left.review }" @click="toggleReview(currentDay, row.leftIndex)">□</span>
                </td>
                <td class="word-cell">{{ row.left.word }}</td>
                <td class="phonetic-cell">{{ row.left.phonetic }}</td>
                <td class="pos-cell">{{ row.left.pos }}</td>
                <td class="meaning-cell">{{ row.left.meaning }}</td>
                <td class="review-cell" v-if="row.right">
                  <span class="checkbox" :class="{ checked: row.right.review }" @click="toggleReview(currentDay, row.rightIndex)">□</span>
                </td>
                <td class="word-cell" v-if="row.right">{{ row.right.word }}</td>
                <td class="phonetic-cell" v-if="row.right">{{ row.right.phonetic }}</td>
                <td class="pos-cell" v-if="row.right">{{ row.right.pos }}</td>
                <td class="meaning-cell" v-if="row.right">{{ row.right.meaning }}</td>
                <td v-if="!row.right" colspan="5"></td>
              </tr>
            </tbody>
          </table>
          <table v-else class="word-table single-column">
            <thead>
              <tr>
                <th style="width:50px;">复习</th>
                <th>单词</th>
                <th>音标</th>
                <th>词性</th>
                <th>释义</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in wordRows" :key="index">
                <td class="review-cell">
                  <span class="checkbox" :class="{ checked: row.left.review }" @click="toggleReview(currentDay, row.leftIndex)">□</span>
                </td>
                <td class="word-cell">{{ row.left.word }}</td>
                <td class="phonetic-cell">{{ row.left.phonetic }}</td>
                <td class="pos-cell">{{ row.left.pos }}</td>
                <td class="meaning-cell">{{ row.left.meaning }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 主题与场景 -->
        <div class="theme-box">
          <h3>📌 主题与场景</h3>
          <p><strong>主题：</strong>{{ dayData.theme }}</p>
          <p><strong>场景：</strong>{{ dayData.scene }}</p>
        </div>

        <!-- 情景对话 -->
        <div class="dialogue-box">
          <h3>💬 情景对话</h3>
          <div v-for="(dialogue, dIndex) in dayData.dialogues" :key="dIndex" class="dialogue-group">
            <h4>{{ dialogue.title }}</h4>
            <div v-for="(line, lIndex) in dialogue.lines" :key="lIndex" class="dialogue-line">
              <div class="dialogue-speaker">{{ line.speaker }}</div>
              <div class="dialogue-text">{{ line.text }}</div>
              <div class="dialogue-syntax">{{ line.syntax }}</div>
              <div class="dialogue-translation">{{ line.translation }}</div>
            </div>
          </div>
        </div>

        <!-- 知识点总结 -->
        <div class="grammar-box">
          <h3>📚 固定搭配与知识点总结</h3>
          <table class="grammar-table">
            <thead>
              <tr>
                <th style="width:60px;">序号</th>
                <th style="width:120px;">类别</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tip, index) in dayData.grammarTips" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ tip.category }}</td>
                <td v-html="tip.content"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 复习建议 -->
        <div class="review-tip-box">
          <h3>📌 今日复习建议</h3>
          <p>{{ dayData.reviewTip }}</p>
        </div>
      </div>

      <div v-else class="loading-state">
        <p>加载中...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { dailyData, getDayData, getTotalDays } from '../data/dailyWords.js'

// ========== 状态 ==========
const currentDay = ref(1)
const inputDay = ref(1)
const totalDays = computed(() => getTotalDays())
const dayData = computed(() => getDayData(currentDay.value))
const singleColumn = computed(() => currentDay.value >= 51)
const printArea = ref(null)
const reviewStates = ref({})

// ========== 进度 ==========
const progressPercent = computed(() => {
  if (totalDays.value <= 1) return 0
  return Math.round((currentDay.value - 1) / (totalDays.value - 1) * 100)
})

// ========== 单词分行 ==========
const wordRows = computed(() => {
  if (!dayData.value) return []
  const words = dayData.value.words
  const rows = []
  const dayKey = currentDay.value
  if (!reviewStates.value[dayKey]) {
    reviewStates.value[dayKey] = words.map(() => false)
  }
  const states = reviewStates.value[dayKey]
  if (singleColumn.value) {
    return words.map((word, index) => ({
      left: { ...word, review: states[index] || false },
      right: null,
      leftIndex: index,
      rightIndex: index
    }))
  }
  for (let i = 0; i < words.length; i += 2) {
    const left = { ...words[i], review: states[i] || false }
    const right = words[i + 1] ? { ...words[i + 1], review: states[i + 1] || false } : null
    rows.push({
      left,
      right,
      leftIndex: i,
      rightIndex: i + 1
    })
  }
  return rows
})

// ========== 天数跳转 ==========
const jumpToDay = () => {
  let day = inputDay.value
  if (isNaN(day) || day < 1) day = 1
  if (day > totalDays.value) day = totalDays.value
  currentDay.value = day
  inputDay.value = day
  // 确保复习状态存在
  if (!reviewStates.value[currentDay.value] && dayData.value) {
    reviewStates.value[currentDay.value] = dayData.value.words.map(() => false)
  }
}

const prevDay = () => {
  if (currentDay.value > 1) {
    currentDay.value--
    inputDay.value = currentDay.value
  }
}

const nextDay = () => {
  if (currentDay.value < totalDays.value) {
    currentDay.value++
    inputDay.value = currentDay.value
  }
}

// ========== 复习状态 ==========
const toggleReview = (day, index) => {
  if (!reviewStates.value[day]) {
    reviewStates.value[day] = []
  }
  reviewStates.value[day][index] = !reviewStates.value[day][index]
  try {
    localStorage.setItem('dailyWord_review', JSON.stringify(reviewStates.value))
  } catch (e) {}
}

const loadReviewStates = () => {
  try {
    const data = localStorage.getItem('dailyWord_review')
    if (data) {
      reviewStates.value = JSON.parse(data)
      if (!reviewStates.value[currentDay.value] && dayData.value) {
        reviewStates.value[currentDay.value] = dayData.value.words.map(() => false)
      }
    }
  } catch (e) {}
}

// ========== 打印功能（自定义A4排版） ==========
const printContent = async () => {
  await nextTick()
  const content = document.getElementById('print-area')
  if (!content) return

  // 获取当前日期的标题
  const dayTitle = dayData.value ? `第${dayData.value.day}天` : ''

  // 构建打印HTML
  const printHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>150天背完3000词 - ${dayTitle}</title>
      <style>
        /* ===== 打印样式 ===== */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
          background: #f0f0f0;
          display: flex;
          justify-content: center;
          padding: 20px;
        }
        .print-page {
          width: 210mm;
          min-height: 297mm;
          background: white;
          padding: 12mm 15mm 15mm 15mm;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          border-radius: 4px;
          font-size: 12pt;
          line-height: 1.6;
          color: #1a1a2e;
        }
        /* 标题 */
        .print-header {
          text-align: center;
          border-bottom: 2px solid #333;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .print-header h2 {
          font-size: 18pt;
          margin: 0;
        }
        .print-header .print-sub {
          font-size: 11pt;
          color: #555;
          margin: 4px 0 0;
        }
        /* 目标 */
        .goal-box {
          background: #f0f7ff;
          padding: 8px 14px;
          border-radius: 6px;
          border-left: 4px solid #3b82f6;
          margin-bottom: 12px;
        }
        .goal-box h3 {
          font-size: 13pt;
          margin-bottom: 2px;
        }
        .goal-box p {
          font-size: 12pt;
          color: #333;
        }
        /* 通用标题 */
        h3 {
          font-size: 13pt;
          margin: 12px 0 6px;
        }
        /* 单词表格 */
        .word-table-wrapper {
          margin-bottom: 12px;
        }
        .word-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10.5pt;
        }
        .word-table th {
          background: #f5f5f5;
          padding: 4px 4px;
          border: 1px solid #ccc;
          text-align: center;
          font-weight: 600;
        }
        .word-table td {
          padding: 4px 3px;
          border: 1px solid #ccc;
          text-align: center;
          vertical-align: middle;
        }
        .word-cell {
          font-weight: 600;
        }
        .single-column .word-cell,
        .single-column .phonetic-cell,
        .single-column .pos-cell,
        .single-column .meaning-cell {
          text-align: left;
        }
        .phonetic-cell {
          color: #666;
          font-size: 10pt;
        }
        .pos-cell {
          color: #888;
          font-size: 9pt;
        }
        .review-cell .checkbox {
          font-size: 14px;
          color: #aaa;
        }
        .review-cell .checkbox.checked {
          color: #10b981;
        }
        .review-cell .checkbox.checked::before {
          content: "✓";
        }
        /* 主题与场景 */
        .theme-box {
          background: #fafafa;
          padding: 8px 14px;
          border-radius: 6px;
          border: 1px solid #eee;
          margin-bottom: 12px;
        }
        .theme-box p {
          margin: 2px 0;
          font-size: 11.5pt;
        }
        /* 对话 */
        .dialogue-box {
          margin-bottom: 12px;
        }
        .dialogue-group {
          margin-bottom: 10px;
        }
        .dialogue-group h4 {
          font-size: 12pt;
          color: #1a1a2e;
          border-bottom: 1px dashed #ddd;
          padding-bottom: 4px;
          margin-bottom: 6px;
        }
        .dialogue-line {
          padding: 4px 10px;
          margin-bottom: 4px;
          background: #fafafa;
          border-radius: 4px;
          page-break-inside: avoid;
        }
        .dialogue-speaker {
          font-weight: 700;
          color: #3b82f6;
          font-size: 11pt;
        }
        .dialogue-text {
          font-size: 12pt;
        }
        .dialogue-syntax {
          font-size: 10pt;
          color: #888;
          font-family: monospace;
        }
        .dialogue-translation {
          font-size: 11pt;
          color: #555;
        }
        /* 语法表 */
        .grammar-box {
          margin-bottom: 12px;
        }
        .grammar-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11pt;
        }
        .grammar-table th {
          background: #f5f5f5;
          padding: 5px 10px;
          border: 1px solid #ccc;
          text-align: left;
        }
        .grammar-table td {
          padding: 5px 10px;
          border: 1px solid #ccc;
          vertical-align: top;
        }
        /* 复习建议 */
        .review-tip-box {
          background: #fef3c7;
          padding: 10px 16px;
          border-radius: 6px;
          border-left: 4px solid #f59e0b;
        }
        .review-tip-box h3 {
          color: #92400e;
          margin-bottom: 2px;
        }
        .review-tip-box p {
          color: #78350f;
          font-size: 11.5pt;
        }
        /* 打印分页 */
        .page-break {
          page-break-after: always;
          border-bottom: 2px dashed #ccc;
          margin: 10px 0;
        }
        /* 打印控制 */
        @media print {
          body {
            background: white;
            padding: 0;
          }
          .print-page {
            box-shadow: none;
            border-radius: 0;
            padding: 15mm 18mm 18mm 18mm;
            width: 100%;
            min-height: 100vh;
          }
          .no-print {
            display: none !important;
          }
          .word-table {
            page-break-inside: avoid;
          }
          .dialogue-group {
            page-break-inside: avoid;
          }
          .grammar-table {
            page-break-inside: avoid;
          }
        }
        /* 屏幕预览时的打印按钮 */
        .no-print {
          text-align: center;
          margin-bottom: 16px;
          padding: 12px;
          background: #f0f7ff;
          border-radius: 8px;
          border: 1px solid #d0e4ff;
        }
        .no-print button {
          padding: 10px 28px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin: 0 8px;
          transition: background 0.3s;
        }
        .no-print button:hover { background: #2563eb; }
        .no-print .btn-secondary { background: #e5e7eb; color: #333; }
        .no-print .btn-secondary:hover { background: #d1d5db; }
        .no-print p { margin-top: 6px; font-size: 13px; color: #666; }
      </style>
    </head>
    <body>
      <div class="print-page">
        <div class="no-print">
          <button onclick="window.print()">🖨️ 打印</button>
          <button class="btn-secondary" onclick="window.close()">✕ 关闭</button>
          <p>💡 按 Ctrl+P 或 Cmd+P 也可以打印</p>
        </div>
        ${content.innerHTML}
      </div>
    </body>
    </html>
  `

  // 在新窗口打开打印预览
  const win = window.open('', '_blank', 'width=900,height=800')
  if (win) {
    win.document.write(printHTML)
    win.document.close()
  } else {
    alert('请允许弹出窗口，或手动复制内容到新窗口打印')
  }
}

// ========== 监听天数变化 ==========
watch(currentDay, (newDay) => {
  if (!reviewStates.value[newDay] && dayData.value) {
    reviewStates.value[newDay] = dayData.value.words.map(() => false)
  }
  inputDay.value = newDay
})

// ========== 初始化 ==========
onMounted(() => {
  loadReviewStates()
  inputDay.value = currentDay.value
})
</script>

<style scoped>
.daily-word {
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px 0;
}

.page-header {
  text-align: center;
  padding: 8px 0 16px;
}
.page-header h1 {
  font-size: 30px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.page-header p {
  font-size: 15px;
  color: var(--vp-c-text-2);
}

/* ===== 天数选择器 ===== */
.day-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.day-nav {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
}
.day-nav:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.day-nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.day-input-group {
  display: flex;
  align-items: center;
  gap: 4px;
}
.day-label {
  font-size: 15px;
  color: var(--vp-c-text-2);
}
.day-input {
  width: 60px;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}
.day-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}
.day-progress {
  font-size: 14px;
  color: var(--vp-c-text-3);
  margin-left: 8px;
}

/* ===== 进度条 ===== */
.progress-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.progress-bar {
  flex: 1;
  height: 8px;
  background: var(--vp-c-divider);
  border-radius: 4px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand-1), #10b981);
  border-radius: 4px;
  transition: width 0.3s;
}
.progress-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 44px;
}

/* ===== 打印按钮 ===== */
.print-btn-wrapper {
  text-align: right;
  margin-bottom: 16px;
}
.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
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
}

/* ===== 打印区域（屏幕样式） ===== */
.print-area {
  background: white;
  border-radius: 8px;
  padding: 24px 28px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

/* ===== 以下样式与之前相同，保留 ===== */
.cumulative-box {
  text-align: center;
  padding: 10px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
  font-size: 16px;
}
.cumulative-label { color: var(--vp-c-text-2); }
.cumulative-value { font-weight: 700; color: var(--vp-c-brand-1); }
.cumulative-date { color: var(--vp-c-text-3); font-size: 14px; }

.goal-box {
  padding: 14px 18px;
  background: var(--vp-c-brand-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1);
  margin-bottom: 16px;
}
.goal-box h3 { font-size: 16px; margin-bottom: 4px; }
.goal-box p { font-size: 15px; color: var(--vp-c-text-2); }

.word-table-wrapper { margin-bottom: 16px; }
.word-table-wrapper h3 { font-size: 17px; margin-bottom: 8px; }
.word-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.word-table th {
  background: var(--vp-c-bg-soft);
  padding: 6px 4px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
  font-weight: 600;
  font-size: 13px;
}
.word-table td {
  padding: 5px 3px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
  vertical-align: middle;
}
.review-cell { width: 40px; }
.checkbox {
  cursor: pointer;
  font-size: 18px;
  color: var(--vp-c-text-3);
  user-select: none;
}
.checkbox:hover { color: var(--vp-c-text-1); }
.checkbox.checked { color: #10b981; }
.checkbox.checked::before { content: "✓"; }
.word-cell { font-weight: 600; color: var(--vp-c-text-1); }
.phonetic-cell { color: var(--vp-c-text-2); font-size: 13px; }
.pos-cell { color: var(--vp-c-text-3); font-size: 12px; }
.meaning-cell { color: var(--vp-c-text-1); }

.theme-box {
  padding: 14px 18px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}
.theme-box h3 { font-size: 16px; margin-bottom: 6px; }
.theme-box p { font-size: 15px; color: var(--vp-c-text-2); margin: 3px 0; }
.theme-box strong { color: var(--vp-c-text-1); }

.dialogue-box {
  padding: 14px 18px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}
.dialogue-box h3 { font-size: 16px; margin-bottom: 10px; }
.dialogue-group { margin-bottom: 12px; }
.dialogue-group:last-child { margin-bottom: 0; }
.dialogue-group h4 {
  font-size: 15px;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px dashed var(--vp-c-divider);
}
.dialogue-line {
  padding: 6px 12px;
  margin-bottom: 4px;
  background: var(--vp-c-bg);
  border-radius: 6px;
}
.dialogue-speaker { font-weight: 600; color: var(--vp-c-brand-1); font-size: 14px; }
.dialogue-text { font-size: 15px; color: var(--vp-c-text-1); margin: 2px 0; }
.dialogue-syntax { font-size: 13px; color: var(--vp-c-text-3); font-family: monospace; }
.dialogue-translation { font-size: 14px; color: var(--vp-c-text-2); margin-top: 2px; }

.grammar-box {
  padding: 14px 18px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}
.grammar-box h3 { font-size: 16px; margin-bottom: 8px; }
.grammar-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.grammar-table th {
  background: var(--vp-c-bg);
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
  font-weight: 600;
}
.grammar-table td {
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  vertical-align: top;
}
.grammar-table td:last-child { color: var(--vp-c-text-1); }

.review-tip-box {
  padding: 14px 18px;
  background: #fef3c7;
  border-radius: 8px;
  border-left: 4px solid #f59e0b;
}
.review-tip-box h3 { font-size: 16px; color: #92400e; margin-bottom: 4px; }
.review-tip-box p { font-size: 15px; color: #78350f; }

.loading-state { text-align: center; padding: 60px 20px; color: var(--vp-c-text-3); }

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .print-area { padding: 16px; }
  .word-table { font-size: 12px; }
  .word-table th, .word-table td { padding: 4px 2px; }
  .day-selector { gap: 8px; padding: 12px 16px; }
  .day-input { width: 50px; font-size: 14px; }
  .day-label { font-size: 13px; }
  .day-progress { font-size: 12px; }
  .dialogue-text { font-size: 14px; }
  .grammar-table { font-size: 13px; }
}

@media (max-width: 480px) {
  .word-table { font-size: 11px; }
  .word-table th, .word-table td { padding: 3px 1px; }
  .word-cell { font-size: 12px; }
  .phonetic-cell { font-size: 10px; }
  .review-cell { width: 28px; }
  .checkbox { font-size: 14px; }
  .day-selector { flex-wrap: wrap; }
  .print-area { padding: 12px; }
  .print-btn-wrapper { text-align: center; }
}
</style>

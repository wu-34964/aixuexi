<template>
  <div class="formula-search">
    <div class="page-header">
      <h1>🔍 公式查询</h1>
      <p>按学科章节浏览 · 关键词搜索 · 共 {{ formulaCount }} 个公式</p>
    </div>

    <!-- 模式切换 -->
    <div class="mode-tabs">
      <button class="mode-btn" :class="{ active: searchMode === 'browse' }" @click="searchMode = 'browse'">
        📚 按章节浏览
      </button>
      <button class="mode-btn" :class="{ active: searchMode === 'keyword' }" @click="searchMode = 'keyword'">
        ⌨️ 关键词搜索
      </button>
    </div>

    <!-- 浏览模式 -->
    <div v-if="searchMode === 'browse'" class="browse-mode">
      <div class="filter-row">
        <div class="filter-group">
          <label>学科</label>
          <select v-model="searchSubject" @change="onSubjectChange">
            <option v-for="s in subjects" :key="s.value" :value="s.value">{{ s.icon }} {{ s.label }}</option>
          </select>
        </div>
        <div class="filter-group">
          <label>章节</label>
          <select v-model="searchChapter">
            <option v-for="c in chapters[searchSubject]" :key="c.value" :value="c.value">{{ c.label }}</option>
          </select>
        </div>
        <div class="filter-group result-count">
          <span>共 <strong>{{ browseFormulas.length }}</strong> 个公式</span>
        </div>
      </div>

      <div class="formula-grid">
        <div v-if="browseFormulas.length === 0" class="empty-state">
          <span class="empty-icon">📭</span>
          <p>该章节暂无公式</p>
          <p class="hint">可以在 .vitepress/data/formulas.js 中添加</p>
        </div>
        <div v-for="f in browseFormulas" :key="f.id" class="formula-card">
          <div class="formula-name">#{{ f.id }} {{ f.name }}</div>
          <div class="formula-display" v-html="renderFormula(f.formula)"></div>
          <div class="formula-desc">{{ f.description }}</div>
          <div class="formula-tag">{{ getChapterLabel(f.chapter) }}</div>
        </div>
      </div>
    </div>

    <!-- 关键词搜索模式 -->
    <div v-if="searchMode === 'keyword'" class="keyword-mode">
      <div class="search-bar">
        <input 
          v-model="searchKeyword" 
          placeholder="输入公式名称或关键词..." 
          @keyup.enter="keywordSearch"
        />
        <button class="btn-search" @click="keywordSearch">搜索</button>
        <button v-if="searchKeyword" class="btn-clear" @click="clearSearch">✕</button>
      </div>

      <div v-if="searchKeyword.trim()">
        <div class="result-info">找到 <strong>{{ searchResult.length }}</strong> 条结果</div>
        <div class="formula-grid">
          <div v-if="searchResult.length === 0" class="empty-state">
            <span class="empty-icon">🔎</span>
            <p>未找到匹配的公式</p>
          </div>
          <div v-for="f in searchResult" :key="f.id" class="formula-card">
            <div class="formula-name">#{{ f.id }} {{ f.name }}</div>
            <div class="formula-display" v-html="renderFormula(f.formula)"></div>
            <div class="formula-desc">{{ f.description }}</div>
            <div class="formula-tag">{{ getSubjectLabel(f.subject) }} · {{ getChapterLabel(f.chapter) }}</div>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <span class="empty-icon">⌨️</span>
        <p>输入关键词后点击搜索</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { subjects, chapters, formulas, getFormulasByChapter, searchFormulas } from '../data/formulas.js'

// ========== 状态 ==========
const searchMode = ref('browse')
const searchSubject = ref('math')
const searchChapter = ref('algebra')
const searchKeyword = ref('')
const searchResult = ref([])

// ========== 计算属性 ==========
const formulaCount = computed(() => formulas.length)

const browseFormulas = computed(() => {
  return getFormulasByChapter(searchSubject.value, searchChapter.value)
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

const getSubjectLabel = (subjectValue) => {
  const found = subjects.find(s => s.value === subjectValue)
  return found ? found.label : subjectValue
}

const getChapterLabel = (chapterValue) => {
  const allChapters = Object.values(chapters).flat()
  const found = allChapters.find(c => c.value === chapterValue)
  return found ? found.label : chapterValue
}

const onSubjectChange = () => {
  const firstChapter = chapters[searchSubject.value]?.[0]
  if (firstChapter) {
    searchChapter.value = firstChapter.value
  }
}

const keywordSearch = () => {
  searchResult.value = searchFormulas(searchKeyword.value)
}

const clearSearch = () => {
  searchKeyword.value = ''
  searchResult.value = []
}

// 初始化：当学科改变时重置章节
onSubjectChange()
</script>

<style scoped>
.formula-search {
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

/* ===== 模式切换 ===== */
.mode-tabs {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 28px;
}

.mode-btn {
  padding: 10px 32px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 16px;
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

/* ===== 筛选栏 ===== */
.filter-row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 24px;
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

.result-count {
  margin-left: auto;
  font-size: 15px;
  color: var(--vp-c-text-2);
  padding: 8px 0;
}

.result-count strong {
  color: var(--vp-c-brand-1);
}

/* ===== 公式网格 ===== */
.formula-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .formula-grid {
    grid-template-columns: 1fr;
  }
}

.formula-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
  position: relative;
}

.formula-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-1);
}

.formula-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.formula-display {
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
  overflow-x: auto;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.formula-display :deep(.katex) {
  font-size: 1.15em;
}

.formula-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 8px;
}

.formula-tag {
  display: inline-block;
  margin-top: 10px;
  padding: 2px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

/* ===== 搜索栏 ===== */
.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  position: relative;
}

.search-bar input {
  flex: 1;
  padding: 12px 20px;
  border-radius: 10px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-bar input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.btn-search {
  padding: 12px 32px;
  border: none;
  border-radius: 10px;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-search:hover {
  background: var(--vp-c-brand-2);
}

.btn-clear {
  position: absolute;
  right: 120px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 4px 8px;
}

.btn-clear:hover {
  color: var(--vp-c-text-1);
}

.result-info {
  grid-column: 1 / -1;
  font-size: 15px;
  color: var(--vp-c-text-2);
  padding: 4px 0 8px;
}

.result-info strong {
  color: var(--vp-c-brand-1);
}

/* ===== 空状态 ===== */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: var(--vp-c-text-3);
}

.empty-icon {
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
</style>
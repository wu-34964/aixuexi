<template>
  <div class="ebook-shelf">
    <div class="shelf-header">
      <h1>📚 电子课本</h1>
      <p>按科目和版本筛选，查看封面并跳转网盘下载</p>
    </div>

    <div class="filter-bar">
      <select v-model="subjectFilter">
        <option value="">全部科目</option>
        <option v-for="subject in subjectOptions" :key="subject.value" :value="subject.value">
          {{ subject.icon }} {{ subject.value }}
        </option>
      </select>
      <select v-model="versionFilter">
        <option value="">全部版本</option>
        <option v-for="version in availableVersions" :key="version" :value="version">
          {{ version }}
        </option>
      </select>
      <input v-model="keyword" placeholder="搜索书名、版本或出版社" />
      <span class="result-count">共 {{ filteredBooks.length }} 本</span>
    </div>

    <div v-if="panPassword" class="password-tip">
      <span class="tip-label">网盘提取码</span>
      <strong>{{ panPassword }}</strong>
      <span class="tip-note">所有课本下载链接共用此提取码</span>
    </div>

    <a
      v-if="baiduPan.folderUrl"
      class="folder-entry"
      :href="baiduPan.folderUrl"
      target="_blank"
      rel="noopener noreferrer"
    >
      📁 打开百度网盘资料库
      <span v-if="baiduPan.folderPassword">提取码：{{ baiduPan.folderPassword }}</span>
    </a>

    <div class="book-grid">
      <article v-for="book in filteredBooks" :key="book.id" class="book-card">
        <div
          v-if="!book.coverFailed"
          class="cover-link"
        >
          <img
            :src="book.coverUrl"
            :alt="book.title"
            loading="lazy"
            referrerpolicy="no-referrer"
            @error="markCoverFailed(book)"
          />
          <span class="subject-badge">{{ book.subject }}</span>
        </div>
        <div v-else class="cover-fallback" :style="{ '--subject-color': getSubjectColor(book.subject) }">
          <span>{{ getSubjectIcon(book.subject) }}</span>
          <small>{{ book.subject }}</small>
        </div>

        <div class="book-body">
          <h3>{{ book.title }}</h3>
          <p class="book-meta">
            {{ book.volume }} · {{ book.version }}<br />
            {{ book.publisher }}
          </p>

          <div class="book-actions">
            <a
              v-if="getDownloadUrl(book)"
              class="download-btn"
              :href="getDownloadUrl(book)"
              target="_blank"
              rel="noopener noreferrer"
            >
              百度网盘下载
            </a>
            <span v-else class="download-btn disabled">待补充网盘链接</span>
          </div>
        </div>
      </article>
    </div>

    <div v-if="filteredBooks.length === 0" class="empty-state">
      <span>🔍</span>
      <p>没有找到匹配的电子课本，换个关键词试试</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { subjectOptions, textbookCatalog, baiduPan, panLinks } from '../data/textbooks.js'

const subjectFilter = ref('')
const versionFilter = ref('')
const keyword = ref('')

const panPassword = computed(() => {
  const password = Object.values(panLinks).map((item) => item.password).find(Boolean)
  return password || baiduPan.folderPassword || ''
})

const availableVersions = computed(() => {
  const versions = new Set(
    textbookCatalog
      .filter((book) => !subjectFilter.value || book.subject === subjectFilter.value)
      .map((book) => book.version)
      .filter(Boolean)
  )
  return [...versions].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
})

const filteredBooks = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return textbookCatalog.filter((book) => {
    const subjectMatched = !subjectFilter.value || book.subject === subjectFilter.value
    const versionMatched = !versionFilter.value || book.version === versionFilter.value
    const keywordMatched =
      !kw ||
      book.title.toLowerCase().includes(kw) ||
      book.version.toLowerCase().includes(kw) ||
      book.publisher.toLowerCase().includes(kw)
    return subjectMatched && versionMatched && keywordMatched
  })
})

const getSubjectIcon = (value) => {
  const found = subjectOptions.find((item) => item.value === value)
  return found?.icon || '📖'
}

const getSubjectColor = (value) => {
  const found = subjectOptions.find((item) => item.value === value)
  return found?.color || '#3b82f6'
}

const getDownloadUrl = (book) => {
  const pan = panLinks[`${book.subject}-${book.version}`] || {}
  const url = pan.url || book.panUrl || baiduPan.folderUrl
  if (!url) return ''
  const password = getPassword(book)
  if (!password) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}pwd=${encodeURIComponent(password)}`
}

const getPassword = (book) => {
  const pan = panLinks[`${book.subject}-${book.version}`] || {}
  return pan.password || book.panPassword || baiduPan.folderPassword || ''
}

const markCoverFailed = (book) => {
  book.coverFailed = true
}

watch(subjectFilter, () => {
  versionFilter.value = ''
  keyword.value = ''
})
</script>

<style scoped>
.ebook-shelf {
  max-width: 1320px;
  margin: 0 auto;
  padding: 18px 0;
}

.shelf-header {
  text-align: center;
  padding: 4px 0 20px;
}

.shelf-header h1 {
  font-size: 30px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
}

.shelf-header p {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 14px 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin-bottom: 16px;
}

.filter-bar select,
.filter-bar input {
  padding: 9px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.filter-bar select {
  min-width: 150px;
}

.filter-bar input {
  flex: 1;
  min-width: 220px;
}

.filter-bar select:focus,
.filter-bar input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.result-count {
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.password-tip {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px 16px;
  margin-bottom: 16px;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 10px;
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.tip-label {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.password-tip strong {
  color: var(--vp-c-brand-1);
  font-size: 18px;
  letter-spacing: 2px;
}

.tip-note {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.folder-entry {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  margin-bottom: 16px;
  background: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 10px;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

.folder-entry:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.book-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 18px;
}

.book-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: calc((100% - 54px) / 4);
  min-width: 0;
  max-width: 100%;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.25s ease;
}

.book-grid .book-card {
  width: auto;
}

.book-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.cover-link,
.cover-fallback {
  position: relative;
  display: block;
  box-sizing: border-box;
  height: 280px;
  aspect-ratio: 3 / 4;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.cover-link img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.subject-badge {
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 3px 10px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--vp-c-text-1);
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.cover-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--subject-color);
  color: white;
}

.cover-fallback span {
  font-size: 52px;
}

.cover-fallback small {
  font-size: 14px;
  font-weight: 600;
}

.book-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 14px 16px 16px;
}

.book-body h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.45;
  margin: 0 0 8px;
  min-height: 46px;
}

.book-meta {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 14px;
}

.book-actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.download-btn {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 9px 12px;
  border: none;
  border-radius: 8px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.download-btn {
  background: var(--vp-c-brand-1);
  color: white;
}

.download-btn:hover {
  background: var(--vp-c-brand-2);
  color: white;
}

.download-btn.disabled {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  color: var(--vp-c-text-3);
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--vp-c-text-3);
}

.empty-state span {
  font-size: 48px;
  display: block;
  margin-bottom: 10px;
}

.empty-state p {
  margin: 0;
  font-size: 15px;
}

@media (max-width: 640px) {
  .ebook-shelf {
    padding: 10px 16px;
  }

  .filter-bar {
    align-items: stretch;
  }

  .filter-bar select,
  .filter-bar input {
    width: 100%;
  }

  .book-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }

  .book-card {
    width: calc((100% - 12px) / 2);
  }

  .book-grid .book-card {
    width: auto;
  }

  .book-body {
    padding: 12px;
  }

  .book-body h3 {
    font-size: 14px;
    min-height: 40px;
  }
}
</style>

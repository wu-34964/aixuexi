<template>
  <div class="exam-archive">
    <div class="page-header">
      <h1>📚 历年高考真题</h1>
      <p>按年份和地区分类，快速查找历年高考试卷</p>
    </div>

    <!-- ===== 📌 信息提示横幅 ===== -->
    <div class="info-banner">
      <div class="banner-icon">📌</div>
      <div class="banner-content">
        <div class="banner-title">不确定自己省份使用哪套试卷？</div>
        <div class="banner-desc">高考改革后各省试卷类型不同，点击下方按钮查看完整对照表</div>
      </div>
      <a :href="withBase('/tools/试卷类型对照表')" class="banner-btn" target="_blank">
        查看试卷类型对照表 →
      </a>
    </div>

    <div class="password-tip">
      <span class="tip-label">网盘提取码</span>
      <strong>aixx</strong>
      <span class="tip-note">所有真题下载链接统一使用此提取码</span>
    </div>

    <!-- ===== 筛选栏 ===== -->
    <div class="filter-bar">
      <div class="filter-group">
        <label>📅 年份</label>
        <select v-model="filters.year">
          <option value="all">全部年份</option>
          <option v-for="y in availableYears" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label>📍 地区</label>
        <select v-model="filters.region">
          <option value="all">全部地区</option>
          <option v-for="r in availableRegions" :key="r" :value="r">{{ r }}</option>
        </select>
      </div>
      <div class="filter-group">
        <label>📋 科目</label>
        <select v-model="filters.subject">
          <option value="all">全部科目</option>
          <option v-for="s in availableSubjects" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div class="filter-group search-group">
        <label>🔍 关键词搜索</label>
        <input v-model="filters.keyword" placeholder="输入关键词..." />
      </div>
    </div>

    <!-- ===== 试卷列表 ===== -->
    <div class="paper-list">
      <div
        v-for="paper in paginatedPapers"
        :key="paper.id"
        class="paper-item"
      >
        <div class="paper-info">
          <div class="paper-title">{{ paper.title }}</div>
          <div class="paper-meta">
            <span class="paper-year">{{ paper.year }}</span>
            <span class="paper-region">{{ paper.region }}</span>
            <span class="paper-subject">{{ paper.subject }}</span>
            <span class="paper-badge" :class="paper.status">{{ paper.status }}</span>
          </div>
        </div>
        <div class="paper-action">
          <a :href="paper.downloadLink || '#'" class="btn-download" target="_blank" rel="noopener noreferrer">
            ⬇️ 下载
          </a>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredPapers.length === 0" class="empty-state">
        <span class="empty-icon">🔎</span>
        <p>没有找到匹配的试卷，请调整筛选条件</p>
      </div>
    </div>

    <!-- ===== 分页 ===== -->
    <div class="pagination" v-if="totalPages > 1">
      <button
        class="page-btn"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >⬅ 上一页</button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >下一页 ➡</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { withBase } from 'vitepress'
import { examLinks } from '../data/examLinks.js'

const allYears = Array.from({ length: 2026 - 2008 + 1 }, (_, index) => String(2026 - index))

const allRegions = [
  '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
  '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
  '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
  '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'
]

const getDownloadUrl = (url) => {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}pwd=aixx`
}

const makePaper = (link, year) => {
  const yearLabel = year === 'all' ? link.range : String(year)
  const title = year === 'all'
    ? `${link.range}${link.province}${link.subject}\u9ad8\u8003\u771f\u9898`
    : `${year}${link.province}${link.subject}\u9ad8\u8003\u771f\u9898`
  return {
    id: `${link.subject}-${link.province}-${yearLabel}`,
    year: yearLabel,
    region: link.province,
    subject: link.subject,
    title,
    status: '\u771f\u9898',
    downloadLink: getDownloadUrl(link.url)
  }
}

// ========== 筛选状态 ==========
const filters = ref({
  year: 'all',
  region: 'all',
  subject: 'all',
  keyword: ''
})

const currentPage = ref(1)
const pageSize = 15

// ========== 计算属性 ==========
const availableYears = computed(() => {
  return allYears
})

const availableRegions = computed(() => {
  return allRegions
})

const availableSubjects = computed(() => {
  const subjects = [...new Set(examLinks.map(link => link.subject))].sort()
  return subjects
})

const filteredPapers = computed(() => {
  const kw = filters.value.keyword.trim().toLowerCase()
  const links = examLinks.filter(link => {
    const regionMatched = filters.value.region === 'all' || link.province === filters.value.region
    const subjectMatched = filters.value.subject === 'all' || link.subject === filters.value.subject
    const keywordMatched =
      !kw ||
      link.province.toLowerCase().includes(kw) ||
      link.subject.toLowerCase().includes(kw) ||
      link.range.toLowerCase().includes(kw)
    return regionMatched && subjectMatched && keywordMatched
  })

  if (filters.value.year !== 'all') {
    const yearNum = Number(filters.value.year)
    return links
      .filter(link => link.years.includes(yearNum))
      .map(link => makePaper(link, yearNum))
      .sort((a, b) => a.subject.localeCompare(b.subject, 'zh-Hans-CN') || a.region.localeCompare(b.region, 'zh-Hans-CN'))
  }

  return links
    .map(link => makePaper(link, 'all'))
    .sort((a, b) => a.subject.localeCompare(b.subject, 'zh-Hans-CN') || a.region.localeCompare(b.region, 'zh-Hans-CN'))
})

const totalPages = computed(() => {
  return Math.ceil(filteredPapers.value.length / pageSize)
})

const paginatedPapers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredPapers.value.slice(start, end)
})

// ========== 监听筛选变化，重置页码 ==========
watch(filters, () => {
  currentPage.value = 1
}, { deep: true })
</script>

<style scoped>
.exam-archive {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 0;
}

.page-header {
  text-align: center;
  padding: 8px 0 20px;
}
.page-header h1 {
  font-size: 30px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}
.page-header p {
  font-size: 15px;
  color: var(--vp-c-text-2);
}

/* ===== 信息提示横幅 ===== */
.info-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg-soft));
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.banner-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.banner-content {
  flex: 1;
  min-width: 180px;
}
.banner-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.banner-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

.banner-btn {
  display: inline-block;
  padding: 8px 24px;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  white-space: nowrap;
  flex-shrink: 0;
}
.banner-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  color: white;
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

/* ===== 筛选栏 ===== */
.filter-bar {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 24px;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 120px;
}
.filter-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.filter-group select,
.filter-group input {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  width: 100%;
  transition: border-color 0.3s;
}
.filter-group select:focus,
.filter-group input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}
.search-group {
  flex: 2;
  min-width: 180px;
}

/* ===== 长条状卡片列表 ===== */
.paper-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.paper-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 14px 20px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  gap: 16px;
}
.paper-item:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

.paper-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.paper-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.paper-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.paper-meta span {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}
.paper-year {
  font-weight: 600;
  color: var(--vp-c-brand-1) !important;
  border-color: var(--vp-c-brand-soft) !important;
  background: var(--vp-c-brand-soft) !important;
}
.paper-badge {
  font-weight: 600;
  border: none !important;
}
.paper-badge.最新 {
  background: #10b981 !important;
  color: white !important;
}
.paper-badge.精选 {
  background: #f59e0b !important;
  color: white !important;
}
.paper-badge.经典 {
  background: #8b5cf6 !important;
  color: white !important;
}
.paper-badge.真题 {
  background: #10b981 !important;
  color: white !important;
}

.paper-action {
  flex-shrink: 0;
}

.btn-download {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  white-space: nowrap;
}
.btn-download:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  color: white;
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

/* ===== 分页 ===== */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding-top: 8px;
}
.page-btn {
  padding: 8px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}
.page-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.page-info {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .exam-archive {
    padding: 16px;
  }

  .filter-bar {
    flex-direction: column;
    gap: 12px;
  }
  .filter-group {
    min-width: 100%;
  }
  .paper-item {
    flex-wrap: wrap;
    padding: 12px 16px;
  }
  .paper-title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;                  /* 行高 */
  max-height: 3em;                   /* 2行 = 2 * 1.5em = 3em */
  overflow: hidden;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}
  .paper-action {
    width: 100%;
  }
  .btn-download {
    width: 100%;
    text-align: center;
  }
  .pagination {
    flex-wrap: wrap;
    gap: 10px;
  }
  .info-banner {
    flex-direction: column;
    text-align: center;
    padding: 16px;
  }
  .banner-btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .paper-meta {
    gap: 4px;
  }
  .paper-meta span {
    font-size: 11px;
    padding: 1px 8px;
  }
}
</style>

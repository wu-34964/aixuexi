<template>
  <div class="history-tool">
    <header class="hero">
      <div class="hero-icon" aria-hidden="true">⏳</div>
      <div>
        <h1>历史时间线</h1>
        <p>把中国与世界放在同一条时间轴上，建立高考历史时空框架。</p>
      </div>
    </header>

    <div class="tabs" role="tablist" aria-label="历史时间线功能">
      <button :class="{ active: activeTab === 'browse' }" role="tab" :aria-selected="activeTab === 'browse'" @click="activeTab = 'browse'">🧭 时间线</button>
      <button :class="{ active: activeTab === 'quiz' }" role="tab" :aria-selected="activeTab === 'quiz'" @click="activeTab = 'quiz'">🧠 翻卡闯关</button>
    </div>

    <section v-if="activeTab === 'browse'" class="panel" role="tabpanel">
      <div class="filters">
        <label class="search-label">
          <span>搜索事件</span>
          <input v-model.trim="browse.keyword" type="search" placeholder="输入事件、摘要或历史意义" />
        </label>
        <FilterChips title="区域" :options="timelineRegions" v-model="browse.regions" />
        <FilterChips title="时期" :options="timelinePeriods" v-model="browse.periods" />
        <FilterChips title="主题" :options="timelineThemes" v-model="browse.themes" />
        <div class="filter-footer">
          <span>找到 <strong>{{ filteredEvents.length }}</strong> 个事件</span>
          <button class="text-btn" :disabled="!hasBrowseFilters" @click="resetBrowse">清空筛选</button>
        </div>
      </div>

      <div v-if="filteredEvents.length" class="timeline" aria-live="polite">
        <article v-for="event in filteredEvents" :key="event.id" class="event" :class="eventClass(event)">
          <div class="timeline-dot" aria-hidden="true"></div>
          <div class="event-card">
            <div class="event-topline">
              <time>{{ event.date }}</time>
              <div class="badges">
                <span v-for="region in event.region" :key="region" class="badge" :class="`region-${region}`">{{ region }}</span>
              </div>
            </div>
            <h2>{{ event.title }}</h2>
            <p>{{ event.summary }}</p>
            <div class="theme-list"><span v-for="theme in event.themes" :key="theme">{{ theme }}</span></div>
            <details>
              <summary>展开考点</summary>
              <div class="detail-content">
                <h3>历史意义</h3>
                <p>{{ event.significance }}</p>
                <a :href="withBase(event.source)">查看原资料 <span aria-hidden="true">→</span></a>
              </div>
            </details>
          </div>
        </article>
      </div>
      <div v-else class="empty-state">
        <span aria-hidden="true">🔎</span>
        <h2>没有匹配的事件</h2>
        <p>尝试减少筛选条件或更换关键词。</p>
        <button class="btn primary" @click="resetBrowse">清空筛选</button>
      </div>
      <button v-if="showBackToTop" class="back-top" aria-label="返回时间线顶部" @click="backToTop">↑</button>
    </section>

    <section v-else class="panel" role="tabpanel">
      <div v-if="quiz.status === 'setup'" class="quiz-setup">
        <div class="setup-heading">
          <h2>设置闯关范围</h2>
          <p>先看年代回忆事件，再翻卡核对答案。筛选维度之间取交集。</p>
        </div>
        <div class="filters compact">
          <FilterChips title="区域" :options="timelineRegions" v-model="quiz.regions" />
          <FilterChips title="时期" :options="timelinePeriods" v-model="quiz.periods" />
          <FilterChips title="主题" :options="timelineThemes" v-model="quiz.themes" />
          <div class="scope-count">当前范围共 <strong>{{ quizPool.length }}</strong> 个事件</div>
        </div>
        <div class="setup-actions">
          <button v-if="hasSavedQuiz" class="btn outline" @click="resumeQuiz">继续上次闯关</button>
          <button class="btn primary" :disabled="quizPool.length === 0" @click="startQuiz">开始闯关</button>
        </div>
      </div>

      <div v-else-if="quiz.status === 'playing'" class="quiz-game">
        <div class="stats">
          <div><span>本局事件</span><strong>{{ quiz.total }}</strong></div>
          <div><span>已完成</span><strong>{{ quizCompleted }}</strong></div>
          <div><span>待复习</span><strong>{{ quiz.reviewIds.length }}</strong></div>
          <div><span>当前轮次</span><strong>{{ quiz.phase === 'first' ? '首轮' : '复习轮' }}</strong></div>
        </div>

        <button class="flashcard" :class="{ flipped: quiz.flipped }" :aria-label="quiz.flipped ? '已显示答案' : '点击查看答案'" @click="flipCard">
          <span v-if="!quiz.flipped" class="card-front">
            <small>{{ quiz.phase === 'first' ? '首轮回忆' : '错题复习' }}</small>
            <time>{{ currentQuizEvent?.date }}</time>
            <span class="prompt">这段时间发生了什么？</span>
            <span class="flip-hint">点击翻卡核对答案</span>
          </span>
          <span v-else class="card-back">
            <span class="badges">
              <span v-for="region in currentQuizEvent?.region" :key="region" class="badge" :class="`region-${region}`">{{ region }}</span>
            </span>
            <strong>{{ currentQuizEvent?.title }}</strong>
            <span>{{ currentQuizEvent?.summary }}</span>
            <span class="meaning"><b>历史意义：</b>{{ currentQuizEvent?.significance }}</span>
          </span>
        </button>

        <div class="quiz-actions">
          <button class="btn danger" :disabled="!quiz.flipped" @click="answerQuiz(false)">再复习</button>
          <button class="btn success" :disabled="!quiz.flipped" @click="answerQuiz(true)">已掌握</button>
        </div>
        <div class="secondary-actions">
          <button class="text-btn" @click="resetQuiz">结束并重新选范围</button>
        </div>
      </div>

      <div v-else class="finish-state">
        <span aria-hidden="true">🎉</span>
        <h2>本轮闯关完成</h2>
        <p>{{ quiz.total }} 个事件已全部掌握，本局记录已清除。</p>
        <button class="btn primary" @click="finishAndRestart">再闯一次</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { withBase } from 'vitepress'
import FilterChips from './FilterChips.vue'
import {
  historyEvents,
  historyTimelineDataVersion,
  timelinePeriods,
  timelineRegions,
  timelineThemes,
  validateHistoryEvents
} from '../data/historyTimeline.js'

const STORAGE_KEY = 'history-timeline-quiz-v1'
const activeTab = ref('browse')
const showBackToTop = ref(false)
const hasSavedQuiz = ref(false)
let savedQuiz = null

const sortedEvents = [...historyEvents].sort((a, b) => a.sortYear - b.sortYear || a.id.localeCompare(b.id))
const dataErrors = validateHistoryEvents(sortedEvents)
if (dataErrors.length) console.error('[历史时间线] 数据校验失败：', dataErrors)

const browse = reactive({ keyword: '', regions: [], periods: [], themes: [] })
const quiz = reactive({
  status: 'setup', regions: [], periods: [], themes: [],
  firstIds: [], reviewIds: [], currentId: null, phase: 'first',
  total: 0, mastered: 0, flipped: false
})

const matchesDimension = (eventValues, selected) => !selected.length || selected.some(value => eventValues.includes(value))
const matchesFilters = (event, filters) =>
  matchesDimension(event.region, filters.regions) &&
  matchesDimension(event.period, filters.periods) &&
  matchesDimension(event.themes, filters.themes)

const filteredEvents = computed(() => {
  const keyword = browse.keyword.toLocaleLowerCase('zh-CN')
  return sortedEvents.filter(event => {
    const text = `${event.date} ${event.title} ${event.summary} ${event.significance}`.toLocaleLowerCase('zh-CN')
    return matchesFilters(event, browse) && (!keyword || text.includes(keyword))
  })
})
const hasBrowseFilters = computed(() => browse.keyword || browse.regions.length || browse.periods.length || browse.themes.length)
const quizPool = computed(() => sortedEvents.filter(event => matchesFilters(event, quiz)))
const currentQuizEvent = computed(() => sortedEvents.find(event => event.id === quiz.currentId))
const quizCompleted = computed(() => Math.min(quiz.mastered, quiz.total))

const eventClass = event => event.region.length > 1 ? 'both' : event.region[0] === '中国' ? 'china' : 'world'
const resetBrowse = () => Object.assign(browse, { keyword: '', regions: [], periods: [], themes: [] })
const shuffle = values => {
  const result = [...values]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const saveQuiz = () => {
  if (typeof window === 'undefined' || quiz.status !== 'playing') return
  const state = {
    version: historyTimelineDataVersion,
    regions: quiz.regions, periods: quiz.periods, themes: quiz.themes,
    firstIds: quiz.firstIds, reviewIds: quiz.reviewIds, currentId: quiz.currentId,
    phase: quiz.phase, total: quiz.total, mastered: quiz.mastered
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
const clearSavedQuiz = () => {
  if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY)
  savedQuiz = null
  hasSavedQuiz.value = false
}
const isValidSavedQuiz = value => {
  if (!value || value.version !== historyTimelineDataVersion || !value.currentId) return false
  const validIds = new Set(sortedEvents.map(event => event.id))
  return [value.currentId, ...(value.firstIds || []), ...(value.reviewIds || [])].every(id => validIds.has(id))
}
const loadSavedQuiz = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw)
    if (!isValidSavedQuiz(parsed)) return clearSavedQuiz()
    savedQuiz = parsed
    hasSavedQuiz.value = true
  } catch {
    clearSavedQuiz()
  }
}
const startQuiz = () => {
  const ids = shuffle(quizPool.value.map(event => event.id))
  if (!ids.length) return
  Object.assign(quiz, {
    status: 'playing', firstIds: ids.slice(1), reviewIds: [], currentId: ids[0],
    phase: 'first', total: ids.length, mastered: 0, flipped: false
  })
  saveQuiz()
}
const resumeQuiz = () => {
  if (!savedQuiz) return
  Object.assign(quiz, savedQuiz, { status: 'playing', flipped: false })
}
const flipCard = () => { quiz.flipped = !quiz.flipped }
const takeNextQuizCard = () => {
  if (quiz.firstIds.length) {
    quiz.currentId = quiz.firstIds.shift()
    quiz.flipped = false
    return
  }
  if (quiz.phase === 'first' && quiz.reviewIds.length) {
    quiz.phase = 'review'
    quiz.currentId = quiz.reviewIds.shift()
    quiz.flipped = false
    return
  }
  if (quiz.phase === 'review' && quiz.reviewIds.length) {
    quiz.currentId = quiz.reviewIds.shift()
    quiz.flipped = false
    return
  }
  quiz.status = 'finished'
  quiz.currentId = null
  clearSavedQuiz()
}
const answerQuiz = mastered => {
  if (!quiz.flipped || !quiz.currentId) return
  if (mastered) quiz.mastered += 1
  else quiz.reviewIds.push(quiz.currentId)
  takeNextQuizCard()
  saveQuiz()
}
const resetQuiz = () => {
  clearSavedQuiz()
  Object.assign(quiz, { status: 'setup', firstIds: [], reviewIds: [], currentId: null, phase: 'first', total: 0, mastered: 0, flipped: false })
}
const finishAndRestart = () => resetQuiz()
const onScroll = () => { showBackToTop.value = window.scrollY > 700 }
const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => {
  loadSavedQuiz()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.history-tool { max-width: 980px; margin: 0 auto; padding: 24px 20px 64px; color: var(--vp-c-text-1); }
.hero { display: flex; align-items: center; gap: 20px; padding: 26px 28px; border: 1px solid var(--vp-c-divider); border-radius: 18px; background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg-soft)); }
.hero-icon { display: grid; place-items: center; width: 68px; height: 68px; flex: none; border-radius: 18px; background: var(--vp-c-bg); font-size: 36px; box-shadow: 0 8px 24px rgba(0,0,0,.08); }
.hero h1 { margin: 0 0 6px; border: 0; font-size: 30px; }
.hero p { margin: 0; color: var(--vp-c-text-2); }
.tabs { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 24px 0 18px; padding: 6px; border-radius: 14px; background: var(--vp-c-bg-soft); }
.tabs button { padding: 12px; border: 0; border-radius: 10px; background: transparent; color: var(--vp-c-text-2); font: inherit; font-weight: 700; cursor: pointer; }
.tabs button.active { background: var(--vp-c-bg); color: var(--vp-c-brand-1); box-shadow: 0 2px 12px rgba(0,0,0,.08); }
.panel { min-height: 420px; }
.filters { padding: 22px; border: 1px solid var(--vp-c-divider); border-radius: 16px; background: var(--vp-c-bg-soft); }
.search-label { display: grid; gap: 7px; margin-bottom: 18px; font-weight: 700; }
.search-label input { width: 100%; padding: 11px 13px; border: 1px solid var(--vp-c-divider); border-radius: 9px; background: var(--vp-c-bg); color: var(--vp-c-text-1); font: inherit; }
button:focus-visible, a:focus-visible, input:focus-visible, summary:focus-visible { outline: 3px solid color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent); outline-offset: 2px; }
.filter-footer, .scope-count { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); }
.filter-footer strong, .scope-count strong { color: var(--vp-c-brand-1); }
.text-btn { padding: 5px 7px; border: 0; background: transparent; color: var(--vp-c-brand-1); font: inherit; cursor: pointer; }
.text-btn:disabled { opacity: .4; cursor: not-allowed; }
.timeline { position: relative; margin: 30px 0 0 106px; padding-left: 30px; border-left: 3px solid var(--vp-c-divider); }
.event { position: relative; margin-bottom: 22px; }
.timeline-dot { position: absolute; top: 22px; left: -39px; width: 15px; height: 15px; border: 3px solid var(--vp-c-bg); border-radius: 50%; background: var(--vp-c-brand-1); box-shadow: 0 0 0 2px var(--vp-c-brand-1); }
.event.world .timeline-dot { background: #8b5cf6; box-shadow: 0 0 0 2px #8b5cf6; }
.event.both .timeline-dot { background: linear-gradient(135deg, var(--vp-c-brand-1) 50%, #8b5cf6 50%); }
.event-card { padding: 20px 22px; border: 1px solid var(--vp-c-divider); border-radius: 14px; background: var(--vp-c-bg); box-shadow: 0 5px 18px rgba(0,0,0,.05); }
.event-topline { display: flex; justify-content: space-between; gap: 12px; }
.event time { position: absolute; top: 17px; right: calc(100% + 51px); width: 110px; color: var(--vp-c-brand-1); font-size: 14px; font-weight: 800; text-align: right; }
.badges, .theme-list { display: flex; flex-wrap: wrap; gap: 6px; }
.badge, .theme-list span { padding: 3px 8px; border-radius: 999px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); font-size: 12px; }
.badge.region-中国 { background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent); color: var(--vp-c-brand-1); }
.badge.region-世界 { background: color-mix(in srgb, #8b5cf6 15%, transparent); color: #7c3aed; }
.event h2 { margin: 8px 0; border: 0; font-size: 20px; }
.event p { margin: 0 0 12px; color: var(--vp-c-text-2); line-height: 1.75; }
.theme-list { margin-bottom: 12px; }
details { border-top: 1px solid var(--vp-c-divider); }
summary { padding-top: 12px; color: var(--vp-c-brand-1); font-weight: 700; cursor: pointer; }
.detail-content h3 { margin: 14px 0 5px; font-size: 15px; }
.detail-content a { font-weight: 700; text-decoration: none; }
.empty-state, .finish-state { padding: 70px 20px; text-align: center; }
.empty-state > span, .finish-state > span { font-size: 46px; }
.empty-state h2, .finish-state h2 { margin: 12px 0 5px; border: 0; }
.empty-state p, .finish-state p { color: var(--vp-c-text-2); }
.back-top { position: fixed; right: 26px; bottom: 28px; width: 44px; height: 44px; border: 0; border-radius: 50%; background: var(--vp-c-brand-1); color: white; font-size: 22px; box-shadow: 0 8px 25px rgba(0,0,0,.2); cursor: pointer; }
.setup-heading { text-align: center; margin: 24px 0; }
.setup-heading h2 { margin: 0 0 6px; border: 0; }
.setup-heading p { margin: 0; color: var(--vp-c-text-2); }
.compact { max-width: 700px; margin: auto; }
.setup-actions, .quiz-actions { display: flex; justify-content: center; gap: 12px; margin-top: 22px; }
.btn { padding: 10px 18px; border: 1px solid transparent; border-radius: 9px; font: inherit; font-weight: 700; cursor: pointer; }
.btn:disabled { opacity: .45; cursor: not-allowed; }
.btn.primary { background: var(--vp-c-brand-1); color: white; }
.btn.outline { border-color: var(--vp-c-brand-1); background: transparent; color: var(--vp-c-brand-1); }
.btn.danger { background: color-mix(in srgb, #ef4444 14%, var(--vp-c-bg)); color: #dc2626; }
.btn.success { background: #16a34a; color: white; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 24px 0; }
.stats div { display: grid; gap: 3px; padding: 12px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg-soft); text-align: center; }
.stats span { color: var(--vp-c-text-2); font-size: 13px; }
.stats strong { font-size: 18px; }
.flashcard { display: block; width: min(680px, 100%); min-height: 360px; margin: 0 auto; padding: 32px; border: 1px solid var(--vp-c-divider); border-radius: 20px; background: linear-gradient(145deg, var(--vp-c-bg), var(--vp-c-bg-soft)); color: var(--vp-c-text-1); font: inherit; box-shadow: 0 14px 40px rgba(0,0,0,.1); cursor: pointer; }
.card-front, .card-back { display: flex; min-height: 294px; flex-direction: column; align-items: center; justify-content: center; gap: 18px; }
.card-front small { color: var(--vp-c-brand-1); font-weight: 700; }
.card-front time { font-size: clamp(30px, 7vw, 50px); font-weight: 800; }
.prompt { color: var(--vp-c-text-2); font-size: 18px; }
.flip-hint { margin-top: 26px; color: var(--vp-c-text-3); font-size: 13px; }
.card-back strong { font-size: 27px; }
.card-back > span:not(.badges) { max-width: 570px; line-height: 1.75; }
.meaning { padding: 14px; border-radius: 10px; background: var(--vp-c-brand-soft); text-align: left; }
.secondary-actions { margin-top: 14px; text-align: center; }
@media (max-width: 700px) {
  .history-tool { padding: 14px 12px 50px; }
  .hero { align-items: flex-start; padding: 20px; }
  .hero-icon { width: 52px; height: 52px; font-size: 27px; }
  .hero h1 { font-size: 24px; }
  .timeline { margin-left: 8px; padding-left: 22px; }
  .timeline-dot { left: -31px; }
  .event time { position: static; width: auto; text-align: left; }
  .event-topline { align-items: flex-start; flex-direction: column; }
  .event-card { padding: 17px; }
  .stats { grid-template-columns: repeat(2, 1fr); }
  .flashcard { min-height: 330px; padding: 22px 17px; }
  .card-front, .card-back { min-height: 284px; }
  .back-top { right: 16px; bottom: 18px; }
}
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; } }
</style>

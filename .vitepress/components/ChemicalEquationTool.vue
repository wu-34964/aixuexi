<template>
  <div class="chem-tool">
    <header class="hero">
      <span class="hero-icon" aria-hidden="true">⚗️</span>
      <div><h1>化学方程式工具</h1><p>查反应、自动配平、随时练习 · 共 {{ chemicalEquations.length }} 条核心反应</p></div>
    </header>

    <div class="tabs" role="tablist" aria-label="工具功能">
      <button v-for="tab in tabs" :key="tab.key" role="tab" :aria-selected="activeTab === tab.key"
        :class="{ active: activeTab === tab.key }" @click="activeTab = tab.key">{{ tab.icon }} {{ tab.label }}</button>
    </div>

    <section v-if="activeTab === 'search'" class="panel" role="tabpanel">
      <div class="filters">
        <label class="search-box"><span>搜索</span><input v-model="filters.keyword" placeholder="名称、化学式、现象或易错点" @input="page = 1"></label>
        <label><span>知识模块</span><select v-model="filters.module" @change="page = 1"><option value="">全部模块</option><option v-for="m in chemicalModules" :key="m">{{ m }}</option></select></label>
        <label><span>反应类型</span><select v-model="filters.type" @change="page = 1"><option value="">全部类型</option><option v-for="t in availableTypes" :key="t">{{ t }}</option></select></label>
      </div>
      <div class="result-bar"><span>找到 <strong>{{ filtered.length }}</strong> 条反应</span><button class="text-btn" @click="resetFilters">清除筛选</button></div>
      <div v-if="paged.length" class="equation-list">
        <article v-for="item in paged" :key="item.id" class="equation-card">
          <div class="card-top"><div><span class="id">{{ item.id }}</span><h2>{{ item.name }}</h2></div><button class="copy" :aria-label="`复制${item.name}`" @click="copyEquation(item)">{{ copiedId === item.id ? '已复制' : '复制' }}</button></div>
          <div class="equation" v-html="formatChem(item.equation)"></div>
          <div class="badges"><span>{{ item.module }}</span><span>{{ item.type }}</span><span v-if="item.condition">条件：{{ item.condition }}</span></div>
          <dl><div><dt>现象</dt><dd>{{ item.phenomenon }}</dd></div><div><dt>易错点</dt><dd>{{ item.mistake }}</dd></div></dl>
        </article>
      </div>
      <div v-else class="empty">没有匹配结果，试试减少筛选条件。</div>
      <nav v-if="pageCount > 1" class="pager" aria-label="查询结果分页"><button :disabled="page === 1" @click="page--">上一页</button><span>{{ page }} / {{ pageCount }}</span><button :disabled="page === pageCount" @click="page++">下一页</button></nav>
    </section>

    <section v-else-if="activeTab === 'balance'" class="panel balance-panel" role="tabpanel">
      <div class="intro"><h2>自动配平</h2><p>分别输入反应物和生成物，物质之间建议用“空格 + 空格”分隔。支持括号、离子、电荷、电子和水合物。</p></div>
      <div class="balance-grid">
        <label><span>反应物</span><textarea v-model="balanceLeft" rows="3" placeholder="例如：Fe^2+ + MnO4- + H+" @keydown.ctrl.enter="runBalance"></textarea></label>
        <span class="arrow" aria-hidden="true">→</span>
        <label><span>生成物</span><textarea v-model="balanceRight" rows="3" placeholder="例如：Fe^3+ + Mn^2+ + H2O" @keydown.ctrl.enter="runBalance"></textarea></label>
      </div>
      <div class="example-row"><span>试试：</span><button v-for="example in examples" :key="example.label" @click="useExample(example)">{{ example.label }}</button></div>
      <button class="primary wide" @click="runBalance">开始配平</button>
      <div v-if="balanceResult" class="balance-result" :class="balanceResult.ok ? 'success' : 'error'" role="status">
        <template v-if="balanceResult.ok"><span>配平结果</span><div class="equation large" v-html="formatChem(balanceResult.formatted)"></div><button class="copy" @click="copyText(balanceResult.formatted)">复制结果</button></template>
        <template v-else><strong>暂时无法配平</strong><p>{{ balanceResult.message }}</p></template>
      </div>
      <details class="syntax"><summary>输入格式说明</summary><ul><li>离子推荐写作 <code>Fe^3+</code>、<code>SO4^2-</code>，电子写作 <code>e-</code>。</li><li>水合物可写作 <code>CuSO4·5H2O</code>，状态符号 <code>(aq)</code>、<code>(s)</code> 会被忽略。</li><li>工具只计算系数，不判断反应能否发生，也不会推测生成物。</li></ul></details>
    </section>

    <section v-else class="panel practice-panel" role="tabpanel">
      <div class="practice-head"><div><h2>记忆练习</h2><p>选择题自动判分，翻卡后按真实掌握程度自评。</p></div><div class="stats"><span>练习 <b>{{ summary.attempts }}</b></span><span>正确率 <b>{{ summary.rate }}%</b></span><span>错题 <b>{{ summary.wrong }}</b></span></div></div>
      <div class="filters compact">
        <label><span>练习方式</span><select v-model="practiceMode" @change="nextQuestion"><option value="choice">选择题</option><option value="card">翻卡</option></select></label>
        <label><span>知识模块</span><select v-model="practiceModule" @change="nextQuestion"><option value="">全部模块</option><option v-for="m in chemicalModules" :key="m">{{ m }}</option></select></label>
        <label><span>题目范围</span><select v-model="practiceScope" @change="nextQuestion"><option value="all">全部题目</option><option value="wrong">只练错题</option><option value="weak">模糊和不会</option></select></label>
      </div>
      <div v-if="current" class="quiz-card">
        <div class="quiz-meta"><span>{{ current.module }}</span><span>{{ current.type }}</span></div>
        <template v-if="practiceMode === 'choice'">
          <p class="prompt">“{{ current.name }}”的正确方程式是：</p>
          <div class="options"><button v-for="option in options" :key="option.id" :disabled="answered" :class="optionClass(option)" @click="answerChoice(option)"><span v-html="formatChem(option.equation)"></span></button></div>
          <div v-if="answered" class="feedback" :class="choiceCorrect ? 'good' : 'bad'"><strong>{{ choiceCorrect ? '回答正确！' : '再复习一下' }}</strong><p>{{ current.mistake }}</p></div>
        </template>
        <template v-else>
          <button class="flip-card" :class="{ flipped }" @click="flipped = !flipped">
            <span v-if="!flipped"><small>根据反应名称和现象回忆方程式</small><strong>{{ current.name }}</strong><em>{{ current.phenomenon }}</em><i>点击查看答案</i></span>
            <span v-else><small>参考答案</small><strong class="equation" v-html="formatChem(current.equation)"></strong><em>条件：{{ current.condition || '无特殊条件' }}</em><i>{{ current.mistake }}</i></span>
          </button>
          <div v-if="flipped" class="ratings"><button @click="rateCard('mastered')">掌握</button><button @click="rateCard('fuzzy')">模糊</button><button @click="rateCard('unknown')">不会</button></div>
        </template>
        <button v-if="practiceMode === 'choice' && answered" class="primary next" @click="nextQuestion">下一题</button>
      </div>
      <div v-else class="empty">当前范围没有可练习的题目。先做几道题，错题会自动收录。</div>
      <div class="danger-zone"><button class="text-btn danger" @click="clearProgress">清空全部练习记录</button></div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { chemicalEquations, chemicalModules, reactionTypes, searchChemicalEquations } from '../data/chemicalEquations.js'
import { balanceEquation } from '../utils/chemicalBalancer.js'

const STORAGE_KEY = 'chem-equation-progress-v1'
const tabs = [{ key: 'search', label: '方程式查询', icon: '🔎' }, { key: 'balance', label: '自动配平', icon: '⚖️' }, { key: 'practice', label: '记忆练习', icon: '🧠' }]
const activeTab = ref('search')
const filters = ref({ keyword: '', module: '', type: '' })
const page = ref(1)
const pageSize = 12
const copiedId = ref('')
const availableTypes = computed(() => reactionTypes.filter(type => chemicalEquations.some(item => item.type === type)))
const filtered = computed(() => searchChemicalEquations(filters.value))
const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const paged = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))
watch(pageCount, count => { if (page.value > count) page.value = count })
const resetFilters = () => { filters.value = { keyword: '', module: '', type: '' }; page.value = 1 }

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const formatChem = value => escapeHtml(String(value).replace(/<=>/g, '⇌').replace(/->|→/g, '→'))
  .replace(/\^(\d*)([+-])/g, '<sup>$1$2</sup>')
  .replace(/(?<=[A-Za-z)\]])(\d+)/g, '<sub>$1</sub>')
  .replace(/↑/g, '<span class="state">↑</span>').replace(/↓/g, '<span class="state">↓</span>')

async function copyText(text) {
  try { await navigator.clipboard.writeText(text) } catch { /* 浏览器拒绝时不破坏页面 */ }
}
async function copyEquation(item) { await copyText(item.equation); copiedId.value = item.id; setTimeout(() => { if (copiedId.value === item.id) copiedId.value = '' }, 1500) }

const balanceLeft = ref('')
const balanceRight = ref('')
const balanceResult = ref(null)
const examples = [
  { label: '铁燃烧', left: 'Fe + O2', right: 'Fe3O4' },
  { label: '酸性高锰酸根', left: 'MnO4- + Fe^2+ + H+', right: 'Mn^2+ + Fe^3+ + H2O' },
  { label: '水合物', left: 'CuSO4·5H2O', right: 'CuSO4 + H2O' },
  { label: '半反应', left: 'Cr2O7^2- + H+ + e-', right: 'Cr^3+ + H2O' }
]
const useExample = example => { balanceLeft.value = example.left; balanceRight.value = example.right; balanceResult.value = null }
const runBalance = () => { balanceResult.value = balanceEquation(balanceLeft.value, balanceRight.value) }

const progress = ref({})
const practiceMode = ref('choice')
const practiceModule = ref('')
const practiceScope = ref('all')
const current = ref(null)
const options = ref([])
const answered = ref(false)
const choiceCorrect = ref(false)
const selectedId = ref('')
const flipped = ref(false)
const summary = computed(() => {
  const records = Object.values(progress.value)
  const attempts = records.reduce((sum, item) => sum + (item.attempts || 0), 0)
  const correct = records.reduce((sum, item) => sum + (item.correct || 0), 0)
  return { attempts, rate: attempts ? Math.round(correct / attempts * 100) : 0, wrong: records.filter(item => item.wrong).length }
})
const practicePool = computed(() => chemicalEquations.filter(item => {
  if (practiceModule.value && item.module !== practiceModule.value) return false
  const record = progress.value[item.id]
  if (practiceScope.value === 'wrong') return record?.wrong
  if (practiceScope.value === 'weak') return ['fuzzy', 'unknown'].includes(record?.mastery)
  return true
}))
function shuffled(items) { return [...items].sort(() => Math.random() - 0.5) }
function buildOptions(answer) {
  const sameModule = chemicalEquations.filter(item => item.module === answer.module && item.id !== answer.id)
  const distractors = shuffled(sameModule).slice(0, 3)
  if (distractors.length < 3) distractors.push(...shuffled(chemicalEquations.filter(item => item.id !== answer.id && !distractors.some(d => d.id === item.id))).slice(0, 3 - distractors.length))
  return shuffled([answer, ...distractors])
}
function nextQuestion() {
  const pool = practicePool.value
  current.value = pool.length ? pool[Math.floor(Math.random() * pool.length)] : null
  options.value = current.value ? buildOptions(current.value) : []
  answered.value = false; choiceCorrect.value = false; selectedId.value = ''; flipped.value = false
}
function saveProgress() {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, records: progress.value }))
}
function updateRecord(id, patch) {
  const old = progress.value[id] || { attempts: 0, correct: 0, wrong: false, mastery: '' }
  progress.value = { ...progress.value, [id]: { ...old, ...patch, lastPracticed: new Date().toISOString() } }
  saveProgress()
}
function answerChoice(option) {
  if (answered.value) return
  answered.value = true; selectedId.value = option.id; choiceCorrect.value = option.id === current.value.id
  const old = progress.value[current.value.id] || { attempts: 0, correct: 0 }
  updateRecord(current.value.id, { attempts: old.attempts + 1, correct: old.correct + (choiceCorrect.value ? 1 : 0), wrong: !choiceCorrect.value })
}
function optionClass(option) { return { selected: answered.value && option.id === selectedId.value, correct: answered.value && option.id === current.value.id, wrong: answered.value && option.id === selectedId.value && option.id !== current.value.id } }
function rateCard(mastery) {
  const old = progress.value[current.value.id] || { attempts: 0, correct: 0 }
  updateRecord(current.value.id, { attempts: old.attempts + 1, correct: old.correct + (mastery === 'mastered' ? 1 : 0), wrong: mastery !== 'mastered', mastery })
  nextQuestion()
}
function clearProgress() {
  if (!window.confirm('确定清空化学方程式的全部练习记录吗？')) return
  progress.value = {}; localStorage.removeItem(STORAGE_KEY); nextQuestion()
}
onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    progress.value = saved?.version === 1 && saved.records && typeof saved.records === 'object' ? saved.records : {}
  } catch { progress.value = {} }
  nextQuestion()
})
</script>

<style scoped>
.chem-tool{max-width:1120px;margin:0 auto;padding:18px 0 60px;color:var(--vp-c-text-1)}
.hero{display:flex;align-items:center;justify-content:center;gap:18px;text-align:left;padding:22px 12px 28px}.hero-icon{font-size:52px}.hero h1{margin:0;font-size:32px}.hero p{margin:5px 0 0;color:var(--vp-c-text-2)}
.tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:6px;background:var(--vp-c-bg-soft);border:1px solid var(--vp-c-divider);border-radius:14px;margin-bottom:22px}.tabs button{border:0;background:transparent;border-radius:10px;padding:13px;color:var(--vp-c-text-2);font-size:16px;font-weight:650;cursor:pointer}.tabs button:hover{background:var(--vp-c-bg)}.tabs button.active{background:var(--vp-c-brand-1);color:#fff;box-shadow:0 4px 14px rgba(59,130,246,.25)}
.panel{min-width:0}.filters{display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px}.filters.compact{grid-template-columns:repeat(3,1fr);margin:20px 0}.filters label,.balance-grid label{display:flex;flex-direction:column;gap:6px;font-size:13px;color:var(--vp-c-text-2);font-weight:600}.filters input,.filters select,textarea{width:100%;box-sizing:border-box;border:1px solid var(--vp-c-divider);border-radius:10px;background:var(--vp-c-bg);color:var(--vp-c-text-1);padding:11px 12px;font:inherit}.filters input:focus,.filters select:focus,textarea:focus{outline:2px solid var(--vp-c-brand-2);outline-offset:1px}
.result-bar{display:flex;justify-content:space-between;align-items:center;margin:18px 0 12px;color:var(--vp-c-text-2)}.text-btn{border:0;background:none;color:var(--vp-c-brand-1);cursor:pointer}.equation-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.equation-card{padding:18px;border:1px solid var(--vp-c-divider);border-radius:14px;background:var(--vp-c-bg-soft)}.card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.card-top>div{display:flex;align-items:center;gap:8px}.card-top h2{font-size:17px;margin:0}.id{font-size:11px;color:var(--vp-c-text-3)}.copy{border:1px solid var(--vp-c-divider);border-radius:8px;padding:5px 9px;background:var(--vp-c-bg);color:var(--vp-c-text-2);cursor:pointer;white-space:nowrap}.equation{font-family:"Times New Roman",serif;font-size:20px;line-height:1.65;overflow-wrap:anywhere}.equation-card>.equation{margin:14px 0;padding:13px;text-align:center;background:var(--vp-c-bg);border-radius:9px}.badges{display:flex;gap:6px;flex-wrap:wrap}.badges span,.quiz-meta span{font-size:11px;padding:3px 7px;border-radius:999px;color:var(--vp-c-brand-1);background:var(--vp-c-brand-soft)}dl{margin:14px 0 0;font-size:13px}dl div{display:grid;grid-template-columns:48px 1fr;gap:6px;margin-top:6px}dt{font-weight:700}dd{margin:0;color:var(--vp-c-text-2)}.pager{display:flex;justify-content:center;align-items:center;gap:14px;margin-top:22px}.pager button,.example-row button{border:1px solid var(--vp-c-divider);border-radius:8px;background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);padding:7px 12px;cursor:pointer}.pager button:disabled{opacity:.45}.empty{text-align:center;padding:48px 20px;border:1px dashed var(--vp-c-divider);border-radius:14px;color:var(--vp-c-text-2)}
.intro{text-align:center;margin-bottom:22px}.intro h2{margin-bottom:4px}.intro p{color:var(--vp-c-text-2)}.balance-grid{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:14px}.balance-grid textarea{resize:vertical;min-height:92px;font-family:ui-monospace,monospace}.arrow{font-size:28px;padding-bottom:29px}.example-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:13px 0}.example-row span{color:var(--vp-c-text-2);font-size:13px}.primary{border:0;border-radius:9px;background:var(--vp-c-brand-1);color:#fff;padding:11px 18px;font-weight:700;cursor:pointer}.primary.wide{width:100%;font-size:16px}.balance-result{margin-top:18px;padding:20px;border-radius:14px;text-align:center}.balance-result.success{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.35)}.balance-result.error{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.3)}.balance-result.large,.large{font-size:25px;margin:8px 0}.syntax{margin-top:16px;color:var(--vp-c-text-2)}.syntax summary{cursor:pointer}.syntax code{color:var(--vp-c-brand-1)}
.practice-head{display:flex;align-items:center;justify-content:space-between;gap:20px}.practice-head h2{margin:0}.practice-head p{margin:4px 0;color:var(--vp-c-text-2)}.stats{display:flex;gap:10px}.stats span{padding:9px 12px;border-radius:10px;background:var(--vp-c-bg-soft);font-size:12px}.stats b{display:block;text-align:center;font-size:18px}.quiz-card{max-width:760px;margin:0 auto;padding:22px;border:1px solid var(--vp-c-divider);border-radius:16px;background:var(--vp-c-bg-soft)}.quiz-meta{display:flex;gap:6px}.prompt{font-size:19px;font-weight:650}.options{display:grid;gap:10px}.options button{padding:13px;text-align:left;border:1px solid var(--vp-c-divider);border-radius:10px;background:var(--vp-c-bg);color:var(--vp-c-text-1);cursor:pointer}.options button:hover:not(:disabled){border-color:var(--vp-c-brand-1)}.options button.correct{border-color:#22c55e;background:rgba(34,197,94,.1)}.options button.wrong{border-color:#ef4444;background:rgba(239,68,68,.08)}.feedback{margin-top:12px;padding:10px 13px;border-radius:9px}.feedback p{margin:3px 0}.feedback.good{background:rgba(34,197,94,.1)}.feedback.bad{background:rgba(239,68,68,.08)}.next{display:block;margin:14px 0 0 auto}.flip-card{display:block;width:100%;min-height:300px;margin-top:16px;border:1px solid var(--vp-c-divider);border-radius:14px;background:var(--vp-c-bg);color:var(--vp-c-text-1);cursor:pointer;padding:28px}.flip-card>span{display:flex;flex-direction:column;align-items:center;gap:20px}.flip-card small,.flip-card em,.flip-card i{color:var(--vp-c-text-2);font-style:normal}.flip-card strong{font-size:24px}.flip-card.flipped{border-color:var(--vp-c-brand-1)}.ratings{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}.ratings button{padding:10px;border:1px solid var(--vp-c-divider);border-radius:9px;background:var(--vp-c-bg);color:var(--vp-c-text-1);cursor:pointer}.ratings button:first-child{border-color:#22c55e}.ratings button:last-child{border-color:#ef4444}.danger-zone{text-align:right;margin-top:20px}.danger{color:#ef4444}
@media(max-width:760px){.chem-tool{box-sizing:border-box;width:100%;padding:18px 16px 48px}.hero{align-items:flex-start;padding-left:0;padding-right:0}.hero-icon{font-size:38px}.hero h1{font-size:25px}.tabs button{font-size:14px;padding:11px 5px}.filters,.filters.compact{grid-template-columns:1fr}.equation-list{grid-template-columns:1fr}.balance-grid{grid-template-columns:1fr}.arrow{transform:rotate(90deg);padding:0;text-align:center}.practice-head{align-items:flex-start;flex-direction:column}.stats{width:100%}.stats span{flex:1;text-align:center}.quiz-card{box-sizing:border-box;width:100%;padding:16px}.equation{font-size:18px}}
</style>

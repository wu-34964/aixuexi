<template>
  <div class="timer-tool">
    <div class="page-header">
      <h1>⏱️ 学习计时器</h1>
      <p>学科计时 · 番茄时钟 · 专注高效学习</p>
    </div>

    <!-- ===== 模式切换 ===== -->
    <div class="mode-tabs">
      <button
        class="mode-btn"
        :class="{ active: mode === 'subject' }"
        @click="mode = 'subject'"
      >
        📚 学科计时
      </button>
      <button
        class="mode-btn"
        :class="{ active: mode === 'pomodoro' }"
        @click="mode = 'pomodoro'"
      >
        🍅 番茄时钟
      </button>
    </div>

    <!-- ============================================================ -->
    <!-- ===== 模式一：学科计时 ===== -->
    <!-- ============================================================ -->
    <div v-if="mode === 'subject'" class="subject-mode">
      <div class="timer-display">
        <span class="timer-time">{{ formatTime(currentTime) }}</span>
        <span class="timer-status" :class="subjectTimerStatus">
          {{ subjectTimerStatus === 'running' ? '⏳ 计时中' : subjectTimerStatus === 'paused' ? '⏸️ 已暂停' : '⏹️ 已停止' }}
        </span>
      </div>

      <div class="subject-controls">
        <div class="control-group">
          <label>📋 选择学科</label>
          <select v-model="subjectConfig.subject">
            <option value="">-- 请选择 --</option>
            <option v-for="s in subjects" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <div class="control-group">
          <label>📝 题型/板块</label>
          <input v-model="subjectConfig.section" placeholder="如：现代文阅读、导数大题..." />
        </div>
        <div class="control-group">
          <label>⏱️ 目标时长（分钟）</label>
          <input v-model.number="subjectConfig.target" type="number" min="1" placeholder="可选" />
        </div>
      </div>

      <div class="timer-actions">
        <button v-if="subjectTimerStatus === 'stopped'" class="btn btn-primary" @click="startSubjectTimer">▶ 开始计时</button>
        <button v-if="subjectTimerStatus === 'running'" class="btn btn-warning" @click="pauseSubjectTimer">⏸️ 暂停</button>
        <button v-if="subjectTimerStatus === 'paused'" class="btn btn-primary" @click="resumeSubjectTimer">▶ 继续</button>
        <button v-if="subjectTimerStatus !== 'stopped'" class="btn btn-danger" @click="stopSubjectTimer">⏹️ 停止</button>
        <button class="btn btn-outline" @click="resetSubjectTimer">🔄 重置</button>
      </div>

      <!-- 进度条 -->
      <div v-if="subjectConfig.target > 0" class="progress-bar-wrapper">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: subjectProgress + '%' }"></div>
        </div>
        <span class="progress-text">{{ subjectProgress }}%</span>
      </div>

      <!-- ===== 记录列表 ===== -->
      <div class="record-section">
        <div class="record-header">
          <span class="record-title">📊 计时记录</span>
          <div class="record-actions">
            <button class="btn-small btn-success" @click="saveSubjectRecord" :disabled="!canSaveRecord">
              💾 保存记录
            </button>
            <button class="btn-small btn-danger" @click="clearSubjectRecords">🗑️ 清空</button>
          </div>
        </div>

        <div v-if="subjectRecords.length === 0" class="empty-state">
          <span class="empty-icon">📭</span>
          <p>暂无记录，开始计时后点击「保存记录」</p>
        </div>

        <div v-else class="record-list">
          <div v-for="(record, index) in subjectRecords" :key="index" class="record-item">
            <div class="record-info">
              <span class="record-subject">{{ record.subject }}</span>
              <span class="record-section">{{ record.section || '未分类' }}</span>
              <span class="record-duration">{{ formatTime(record.duration) }}</span>
              <span class="record-date">{{ record.date }}</span>
            </div>
            <button class="btn-small btn-danger" @click="deleteSubjectRecord(index)">✕</button>
          </div>
          <div class="record-total">
            📊 总计时：<strong>{{ formatTotalSubjectTime }}</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- ===== 模式二：番茄时钟 ===== -->
    <!-- ============================================================ -->
    <div v-if="mode === 'pomodoro'" class="pomodoro-mode">
      <div class="timer-display large">
        <span class="timer-time">{{ formatPomodoroTime }}</span>
        <span class="timer-status" :class="pomodoroStatus">
          {{ pomodoroStatus === 'running' ? '🍅 专注中' : pomodoroStatus === 'paused' ? '⏸️ 已暂停' : pomodoroStatus === 'break' ? '☕ 休息中' : '⏹️ 已停止' }}
        </span>
      </div>

      <div class="pomodoro-settings">
        <div class="control-group">
          <label>🍅 专注时长（分钟）</label>
          <input v-model.number="pomodoroConfig.focus" type="number" min="1" max="60" @change="resetPomodoro" />
        </div>
        <div class="control-group">
          <label>☕ 休息时长（分钟）</label>
          <input v-model.number="pomodoroConfig.break" type="number" min="1" max="30" @change="resetPomodoro" />
        </div>
        <div class="control-group">
          <label>📊 目标番茄数</label>
          <input v-model.number="pomodoroConfig.target" type="number" min="1" max="20" @change="resetPomodoro" />
        </div>
      </div>

      <div class="pomodoro-stats">
        <div class="stat-item">
          <span class="stat-label">🍅 已完成</span>
          <span class="stat-value">{{ pomodoroCompleted }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">🎯 目标</span>
          <span class="stat-value">{{ pomodoroConfig.target }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">⏱️ 今日总计时</span>
          <span class="stat-value">{{ formatPomodoroTotal }}</span>
        </div>
      </div>

      <div class="timer-actions">
        <button v-if="pomodoroStatus === 'stopped'" class="btn btn-primary" @click="startPomodoro">▶ 开始专注</button>
        <button v-if="pomodoroStatus === 'running'" class="btn btn-warning" @click="pausePomodoro">⏸️ 暂停</button>
        <button v-if="pomodoroStatus === 'paused'" class="btn btn-primary" @click="resumePomodoro">▶ 继续</button>
        <button v-if="pomodoroStatus !== 'stopped'" class="btn btn-danger" @click="stopPomodoro">⏹️ 停止</button>
        <button class="btn btn-outline" @click="resetPomodoro">🔄 重置</button>
      </div>

      <div v-if="pomodoroCompleted >= pomodoroConfig.target && pomodoroConfig.target > 0" class="celebration">
        🎉 恭喜完成所有番茄！休息一下吧！
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// ========== 数据 ==========
const subjects = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '政治', '地理']

// ========== 模式 ==========
const mode = ref('subject')

// ========== 学科计时状态 ==========
const currentTime = ref(0) // 秒
const subjectTimerStatus = ref('stopped') // stopped | running | paused
let subjectTimerInterval = null

const subjectConfig = ref({
  subject: '',
  section: '',
  target: 0 // 目标分钟
})

// ========== 番茄时钟状态 ==========
const pomodoroConfig = ref({
  focus: 25,
  break: 5,
  target: 4
})

const pomodoroTime = ref(25 * 60) // 秒
const pomodoroStatus = ref('stopped') // stopped | running | paused | break
const pomodoroCompleted = ref(0)
const pomodoroTotalSeconds = ref(0)
let pomodoroInterval = null

// ========== 存储 ==========
const STORAGE_KEY_SUBJECT = 'timer_subject_records'
const STORAGE_KEY_POMODORO = 'timer_pomodoro_data'

// ========== 学科计时方法 ==========
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const subjectProgress = computed(() => {
  if (!subjectConfig.value.target || subjectConfig.value.target <= 0) return 0
  const targetSeconds = subjectConfig.value.target * 60
  return Math.min(Math.round(currentTime.value / targetSeconds * 100), 100)
})

const startSubjectTimer = () => {
  if (subjectTimerStatus.value === 'stopped') {
    currentTime.value = 0
  }
  subjectTimerStatus.value = 'running'
  subjectTimerInterval = setInterval(() => {
    currentTime.value++
  }, 1000)
}

const pauseSubjectTimer = () => {
  subjectTimerStatus.value = 'paused'
  clearInterval(subjectTimerInterval)
}

const resumeSubjectTimer = () => {
  subjectTimerStatus.value = 'running'
  subjectTimerInterval = setInterval(() => {
    currentTime.value++
  }, 1000)
}

const stopSubjectTimer = () => {
  subjectTimerStatus.value = 'stopped'
  clearInterval(subjectTimerInterval)
}

const resetSubjectTimer = () => {
  stopSubjectTimer()
  currentTime.value = 0
  subjectTimerStatus.value = 'stopped'
}

// ========== 记录管理 ==========
const subjectRecords = ref([])

const loadSubjectRecords = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SUBJECT)
    if (data) {
      subjectRecords.value = JSON.parse(data)
    }
  } catch (e) {
    console.warn('读取记录失败:', e)
  }
}

const saveSubjectRecords = () => {
  try {
    localStorage.setItem(STORAGE_KEY_SUBJECT, JSON.stringify(subjectRecords.value))
  } catch (e) {
    console.warn('保存记录失败:', e)
  }
}

const canSaveRecord = computed(() => {
  return subjectConfig.value.subject && currentTime.value > 0
})

const saveSubjectRecord = () => {
  if (!canSaveRecord.value) {
    alert('请选择学科并开始计时')
    return
  }
  const record = {
    subject: subjectConfig.value.subject,
    section: subjectConfig.value.section || '未分类',
    duration: currentTime.value,
    date: new Date().toLocaleString()
  }
  subjectRecords.value.unshift(record)
  saveSubjectRecords()
  resetSubjectTimer()
}

const deleteSubjectRecord = (index) => {
  subjectRecords.value.splice(index, 1)
  saveSubjectRecords()
}

const clearSubjectRecords = () => {
  if (confirm('确定要清空所有记录吗？')) {
    subjectRecords.value = []
    saveSubjectRecords()
  }
}

const formatTotalSubjectTime = computed(() => {
  const total = subjectRecords.value.reduce((sum, r) => sum + r.duration, 0)
  return formatTime(total)
})

// ========== 番茄时钟方法 ==========
const formatPomodoroTime = computed(() => {
  return formatTime(pomodoroTime.value)
})

const formatPomodoroTotal = computed(() => {
  return formatTime(pomodoroTotalSeconds.value)
})

const startPomodoro = () => {
  if (pomodoroStatus.value === 'stopped') {
    pomodoroTime.value = pomodoroConfig.value.focus * 60
    pomodoroStatus.value = 'running'
  } else if (pomodoroStatus.value === 'break') {
    pomodoroTime.value = pomodoroConfig.value.break * 60
    pomodoroStatus.value = 'running'
  } else {
    pomodoroStatus.value = 'running'
  }
  pomodoroInterval = setInterval(() => {
    if (pomodoroTime.value <= 0) {
      // 计时结束
      if (pomodoroStatus.value === 'running') {
        // 专注结束，切换到休息
        pomodoroCompleted.value++
        pomodoroStatus.value = 'break'
        pomodoroTime.value = pomodoroConfig.value.break * 60
        // 播放提示音
        if (pomodoroCompleted.value >= pomodoroConfig.value.target) {
          // 所有番茄完成
          clearInterval(pomodoroInterval)
          pomodoroStatus.value = 'stopped'
          return
        }
      } else if (pomodoroStatus.value === 'break') {
        // 休息结束，切换到专注
        pomodoroStatus.value = 'running'
        pomodoroTime.value = pomodoroConfig.value.focus * 60
      }
    } else {
      pomodoroTime.value--
      pomodoroTotalSeconds.value++
    }
  }, 1000)
}

const pausePomodoro = () => {
  pomodoroStatus.value = 'paused'
  clearInterval(pomodoroInterval)
}

const resumePomodoro = () => {
  pomodoroStatus.value = 'running'
  pomodoroInterval = setInterval(() => {
    if (pomodoroTime.value <= 0) {
      if (pomodoroStatus.value === 'running') {
        pomodoroCompleted.value++
        pomodoroStatus.value = 'break'
        pomodoroTime.value = pomodoroConfig.value.break * 60
        if (pomodoroCompleted.value >= pomodoroConfig.value.target) {
          clearInterval(pomodoroInterval)
          pomodoroStatus.value = 'stopped'
          return
        }
      } else if (pomodoroStatus.value === 'break') {
        pomodoroStatus.value = 'running'
        pomodoroTime.value = pomodoroConfig.value.focus * 60
      }
    } else {
      pomodoroTime.value--
      pomodoroTotalSeconds.value++
    }
  }, 1000)
}

const stopPomodoro = () => {
  pomodoroStatus.value = 'stopped'
  clearInterval(pomodoroInterval)
}

const resetPomodoro = () => {
  stopPomodoro()
  pomodoroTime.value = pomodoroConfig.value.focus * 60
  pomodoroStatus.value = 'stopped'
  pomodoroCompleted.value = 0
}

// ========== 存储番茄数据 ==========
const loadPomodoroData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_POMODORO)
    if (data) {
      const parsed = JSON.parse(data)
      pomodoroCompleted.value = parsed.completed || 0
      pomodoroTotalSeconds.value = parsed.totalSeconds || 0
    }
  } catch (e) {
    console.warn('读取番茄数据失败:', e)
  }
}

const savePomodoroData = () => {
  try {
    localStorage.setItem(STORAGE_KEY_POMODORO, JSON.stringify({
      completed: pomodoroCompleted.value,
      totalSeconds: pomodoroTotalSeconds.value
    }))
  } catch (e) {
    console.warn('保存番茄数据失败:', e)
  }
}

// 监听番茄数据变化自动保存
watch([pomodoroCompleted, pomodoroTotalSeconds], () => {
  savePomodoroData()
})

// ========== 生命周期 ==========
onMounted(() => {
  loadSubjectRecords()
  loadPomodoroData()
  resetPomodoro()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  clearInterval(subjectTimerInterval)
  clearInterval(pomodoroInterval)
  document.removeEventListener('keydown', handleKeydown)
})

// ========== 键盘快捷键 ==========
function handleKeydown(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return
  
  if (e.key === ' ') {
    e.preventDefault()
    if (mode.value === 'subject') {
      if (subjectTimerStatus.value === 'stopped') startSubjectTimer()
      else if (subjectTimerStatus.value === 'running') pauseSubjectTimer()
      else if (subjectTimerStatus.value === 'paused') resumeSubjectTimer()
    } else {
      if (pomodoroStatus.value === 'stopped') startPomodoro()
      else if (pomodoroStatus.value === 'running') pausePomodoro()
      else if (pomodoroStatus.value === 'paused') resumePomodoro()
    }
  }
}
</script>

<style scoped>
.timer-tool {
  max-width: 1100px;
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
}
.page-header p {
  font-size: 15px;
  color: var(--vp-c-text-2);
}

/* ===== 模式切换 ===== */
.mode-tabs {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 24px;
}
.mode-btn {
  padding: 10px 36px;
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

/* ===== 计时器显示 ===== */
.timer-display {
  text-align: center;
  padding: 40px 0 20px;
}
.timer-display.large {
  padding: 40px 0 20px;
}
.timer-time {
  font-size: 90px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
  font-family: 'Courier New', monospace;
  display: block;
}
.timer-display.large .timer-time {
  font-size: 80px;
}
.timer-status {
  display: inline-block;
  margin-top: 30px;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}
.timer-status.running {
  background: #10b981;
  color: white;
}
.timer-status.paused {
  background: #f59e0b;
  color: white;
}
.timer-status.stopped {
  background: var(--vp-c-divider);
  color: var(--vp-c-text-2);
}
.timer-status.break {
  background: #8b5cf6;
  color: white;
}

/* ===== 控制组 ===== */
.subject-controls,
.pomodoro-settings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 16px;
}
.control-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.control-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.control-group select,
.control-group input {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  width: 100%;
  transition: border-color 0.3s;
}
.control-group select:focus,
.control-group input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

/* ===== 操作按钮 ===== */
.timer-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.btn {
  padding: 10px 28px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
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
.btn-warning {
  background: #f59e0b;
  color: white;
}
.btn-warning:hover {
  background: #d97706;
  transform: translateY(-2px);
}
.btn-danger {
  background: #ef4444;
  color: white;
}
.btn-danger:hover {
  background: #dc2626;
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
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== 进度条 ===== */
.progress-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
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

/* ===== 记录列表 ===== */
.record-section {
  padding: 8px 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}
.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
  gap: 8px;
}
.record-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.record-actions {
  display: flex;
  gap: 8px;
}
.btn-small {
  padding: 4px 14px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-small.btn-success {
  background: #10b981;
  color: white;
}
.btn-small.btn-success:hover {
  background: #059669;
}
.btn-small.btn-danger {
  background: #ef4444;
  color: white;
}
.btn-small.btn-danger:hover {
  background: #dc2626;
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;
  max-height: 300px;
  overflow-y: auto;
}
.record-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}
.record-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.record-subject {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
.record-section {
  color: var(--vp-c-text-1);
  font-size: 14px;
}
.record-duration {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.record-date {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.record-total {
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-align: right;
}

/* ===== 番茄统计 ===== */
.pomodoro-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}
.stat-item {
  text-align: center;
}
.stat-label {
  display: block;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.celebration {
  text-align: center;
  padding: 16px;
  background: #10b981;
  color: white;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  margin-top: 16px;
}

/* ===== 空状态 ===== */
.empty-state {
  text-align: center;
  padding: 30px 20px;
  color: var(--vp-c-text-3);
}
.empty-state .empty-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 8px;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .timer-time {
    font-size: 48px;
  }
  .timer-display.large .timer-time {
    font-size: 56px;
  }
  .subject-controls,
  .pomodoro-settings {
    grid-template-columns: 1fr 1fr;
  }
  .pomodoro-stats {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .record-info {
    gap: 8px;
  }
  .record-item {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .subject-controls,
  .pomodoro-settings {
    grid-template-columns: 1fr;
  }
  .pomodoro-stats {
    grid-template-columns: 1fr 1fr;
  }
  .timer-time {
    font-size: 36px;
  }
  .timer-display.large .timer-time {
    font-size: 40px;
  }
  .mode-btn {
    padding: 8px 20px;
    font-size: 14px;
  }
  .record-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>

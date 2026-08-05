<template>
  <div class="paper-tool">
    <div class="page-header">
      <h1>📄 自定义打印纸</h1>
      <p>选择纸张类型、线条样式、颜色主题，实时预览并生成 PDF</p>
    </div>

    <div class="main-layout">
      <!-- ========== 左侧：控制面板 ========== -->
      <div class="control-panel">
        <!-- 纸张类型 -->
        <div class="control-group">
          <label class="group-label">📋 纸张类型</label>
          <div class="option-grid">
            <button
              v-for="type in paperTypes"
              :key="type.id"
              class="option-btn"
              :class="{ active: settings.paperType === type.id }"
              @click="settings.paperType = type.id"
            >
              <span class="option-icon">{{ type.icon }}</span>
              <span class="option-name">{{ type.name }}</span>
            </button>
          </div>
        </div>

        <!-- 纸张尺寸 -->
        <div class="control-group">
          <label class="group-label">📏 纸张尺寸</label>
          <div class="option-grid small">
            <button
              v-for="size in paperSizes"
              :key="size.id"
              class="option-btn"
              :class="{ active: settings.paperSize === size.id }"
              @click="settings.paperSize = size.id"
            >
              {{ size.name }}
            </button>
          </div>
        </div>

        <!-- 主题颜色 -->
        <div class="control-group">
          <label class="group-label">🎨 主题颜色</label>
          <div class="color-grid">
            <button
              v-for="color in themeColors"
              :key="color.id"
              class="color-btn"
              :class="{ active: settings.theme === color.id }"
              :style="{ background: color.value }"
              @click="settings.theme = color.id"
            >
              <span v-if="settings.theme === color.id" class="check-mark">✓</span>
            </button>
          </div>
        </div>

        <!-- 线条设置 -->
        <div class="control-group">
          <label class="group-label">📐 线条设置</label>
          <div class="slider-group">
            <div class="slider-item">
              <span class="slider-label">行距</span>
              <input
                type="range"
                v-model.number="settings.lineHeight"
                min="4"
                max="15"
                step="0.5"
              />
              <span class="slider-value">{{ settings.lineHeight }}mm</span>
            </div>
            <div class="slider-item">
              <span class="slider-label">线条粗细</span>
              <input
                type="range"
                v-model.number="settings.lineWidth"
                min="0.5"
                max="3"
                step="0.5"
              />
              <span class="slider-value">{{ settings.lineWidth }}pt</span>
            </div>
            <div class="slider-item">
              <span class="slider-label">线条颜色深浅</span>
              <input
                type="range"
                v-model.number="settings.lineOpacity"
                min="10"
                max="100"
                step="5"
              />
              <span class="slider-value">{{ settings.lineOpacity }}%</span>
            </div>
          </div>
        </div>

        <!-- 边距设置 -->
        <div class="control-group">
          <label class="group-label">📦 边距设置</label>
          <div class="slider-group two-col">
            <div class="slider-item">
              <span class="slider-label">上</span>
              <input type="range" v-model.number="settings.marginTop" min="5" max="40" step="2" />
              <span class="slider-value">{{ settings.marginTop }}mm</span>
            </div>
            <div class="slider-item">
              <span class="slider-label">下</span>
              <input type="range" v-model.number="settings.marginBottom" min="5" max="40" step="2" />
              <span class="slider-value">{{ settings.marginBottom }}mm</span>
            </div>
            <div class="slider-item">
              <span class="slider-label">左</span>
              <input type="range" v-model.number="settings.marginLeft" min="5" max="40" step="2" />
              <span class="slider-value">{{ settings.marginLeft }}mm</span>
            </div>
            <div class="slider-item">
              <span class="slider-label">右</span>
              <input type="range" v-model.number="settings.marginRight" min="5" max="40" step="2" />
              <span class="slider-value">{{ settings.marginRight }}mm</span>
            </div>
          </div>
        </div>

        <!-- 额外选项 -->
        <div class="control-group">
          <label class="group-label">⚙️ 额外选项</label>
          <div class="toggle-group">
            <label class="toggle-item">
              <input type="checkbox" v-model="settings.showBorder" />
              <span>显示边框</span>
            </label>
            <label class="toggle-item">
              <input type="checkbox" v-model="settings.showTitle" />
              <span>显示标题栏</span>
            </label>
            <label class="toggle-item">
              <input type="checkbox" v-model="settings.showPageNum" />
              <span>显示页码</span>
            </label>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="actions">
          <button class="btn btn-primary" @click="exportPDF">
            📄 导出 PDF
          </button>
          <button class="btn btn-outline" @click="resetSettings">
            🔄 重置
          </button>
        </div>
      </div>

      <!-- ========== 右侧：预览 ========== -->
      <div class="preview-panel">
        <div class="preview-header">
          <span class="preview-title">👁️ 实时预览</span>
          <span class="preview-info">{{ currentPaperName }} · {{ currentSizeName }}</span>
        </div>
        <div class="paper-preview" ref="previewContainer">
          <svg
            ref="paperSvg"
            viewBox="0 0 800 1100"
            xmlns="http://www.w3.org/2000/svg"
            class="paper-svg"
          >
            <!-- 纸张背景 -->
            <rect
              x="0"
              y="0"
              width="800"
              height="1100"
              :fill="currentTheme.bg"
              :stroke="settings.showBorder ? currentTheme.border : 'none'"
              stroke-width="2"
              rx="4"
            />

            <!-- 标题栏 -->
            <rect
              v-if="settings.showTitle"
              x="40"
              y="40"
              width="720"
              height="60"
              :fill="currentTheme.titleBg"
              rx="4"
            />
            <text
              v-if="settings.showTitle"
              x="400"
              y="78"
              text-anchor="middle"
              font-size="24"
              font-weight="600"
              :fill="currentTheme.titleText"
            >{{ titleText }}</text>

            <!-- 横线（根据行距绘制） -->
            <g v-if="settings.paperType === 'lined' || settings.paperType === 'grid'">
              <line
                v-for="y in linePositions"
                :key="y"
                :x1="settings.marginLeft * mmToX"
                :y1="y"
                :x2="800 - settings.marginRight * mmToX"
                :y2="y"
                :stroke="currentTheme.lineColor"
                :stroke-width="settings.lineWidth"
                :opacity="settings.lineOpacity / 100"
              />
            </g>

            <!-- 竖线（网格模式） -->
            <g v-if="settings.paperType === 'grid'">
              <line
                v-for="x in gridXPositions"
                :key="x"
                :x1="x"
                :y1="startY"
                :x2="x"
                :y2="endY"
                :stroke="currentTheme.lineColor"
                :stroke-width="settings.lineWidth * 0.7"
                :opacity="settings.lineOpacity / 100 * 0.6"
              />
            </g>

            <!-- 作文格子纸：宽 7mm、高 8mm，行间距 3mm -->
            <g v-if="settings.paperType === 'zuowen'">
              <rect
                v-for="cell in zuowenCells"
                :key="cell.index"
                :x="cell.x"
                :y="cell.y"
                :width="cell.width"
                :height="cell.height"
                :fill="'none'"
                :stroke="currentTheme.lineColor"
                :stroke-width="settings.lineWidth * 0.7"
                :opacity="settings.lineOpacity / 100"
              />
            </g>

            <!-- 米字格（米字格模式） -->
            <g v-if="settings.paperType === 'mi'">
              <rect
                v-for="cell in miCells"
                :key="cell.index"
                :x="cell.x"
                :y="cell.y"
                :width="cell.width"
                :height="cell.height"
                :fill="'none'"
                :stroke="currentTheme.lineColor"
                :stroke-width="settings.lineWidth *0.5"
                :opacity="settings.lineOpacity / 100 * 0.9"
              />
              <!-- 米字格对角线 -->
              <line
                v-for="cell in miCells"
                :key="'diag1-' + cell.index"
                :x1="cell.x"
                :y1="cell.y"
                :x2="cell.x + cell.width"
                :y2="cell.y + cell.height"
                :stroke="currentTheme.lineColor"
                :stroke-width="settings.lineWidth * 0.6"
                :stroke-dasharray="'8 8'"
                :opacity="settings.lineOpacity / 100 * 0.6"
              />
              <line
                v-for="cell in miCells"
                :key="'diag2-' + cell.index"
                :x1="cell.x + cell.width"
                :y1="cell.y"
                :x2="cell.x"
                :y2="cell.y + cell.height"
                :stroke="currentTheme.lineColor"
                :stroke-width="settings.lineWidth * 0.6"
                :stroke-dasharray="'8 8'"
                :opacity="settings.lineOpacity / 100 * 0.35"
              />
            </g>

            <!-- 康奈尔分区 -->
            <g v-if="settings.paperType === 'cornell'">
              <!-- 左侧线索区竖线 -->
              <line
                :x1="200"
                :y1="startY"
                :x2="200"
                :y2="endY"
                :stroke="currentTheme.lineColor"
                :stroke-width="settings.lineWidth"
                :opacity="settings.lineOpacity / 100"
              />
              <!-- 底部总结区横线 -->
              <line
                :x1="settings.marginLeft * mmToX"
                :y1="endY - 120"
                :x2="800 - settings.marginRight * mmToX"
                :y2="endY - 120"
                :stroke="currentTheme.lineColor"
                :stroke-width="settings.lineWidth"
                :opacity="settings.lineOpacity / 100"
              />
              <!-- 标签文字 -->
              <text x="120" y="startY + 30" font-size="14" :fill="currentTheme.lineColor" opacity="0.6">线索区</text>
              <text x="400" y="startY + 30" font-size="14" :fill="currentTheme.lineColor" opacity="0.6">笔记区</text>
              <text x="400" :y="endY - 90" font-size="14" :fill="currentTheme.lineColor" opacity="0.6">总结区</text>
            </g>

            <!-- 四线三格英语练字 -->
            <g v-if="settings.paperType === 'english'">
              <g v-for="staff in staffPositions" :key="staff">
                <line
                  v-for="offset in [0, 3 * mmToY, 6 * mmToY, 9 * mmToY]"
                  :key="offset"
                  :x1="settings.marginLeft * mmToX"
                  :y1="staff + offset"
                  :x2="800 - settings.marginRight * mmToX"
                  :y2="staff + offset"
                  :stroke="currentTheme.lineColor"
                  :stroke-width="settings.lineWidth * 0.8"
                  :opacity="settings.lineOpacity / 100"
                />
              </g>
            </g>

            <!-- 页码 -->
            <text
              v-if="settings.showPageNum"
              x="400"
              :y="1070"
              text-anchor="middle"
              font-size="12"
              :fill="currentTheme.lineColor"
              opacity="0.5"
            >- 1 -</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'

// ========== 配置数据 ==========
const paperTypes = [
  { id: 'lined', name: '横线格', icon: '📝' },
  { id: 'grid', name: '方格纸', icon: '📐' },
  { id: 'mi', name: '米字格', icon: '✏️' },
  { id: 'cornell', name: '康奈尔', icon: '📑' },
  { id: 'zuowen', name: '作文格子纸', icon: '🀄' },
  { id: 'english', name: '四线三格', icon: '✍️' }
]

const paperSizes = [
  { id: 'a4', name: 'A4' },
  { id: 'a5', name: 'A5' },
  { id: 'b5', name: 'B5' },
  { id: 'letter', name: 'Letter' }
]

const themeColors = [
  { id: 'white', name: '纯白', value: '#ffffff', lineColor: '#cccccc', bg: '#ffffff', border: '#dddddd', titleBg: '#f5f5f5', titleText: '#333333' },
  { id: 'cream', name: '奶油', value: '#fdf6e3', lineColor: '#d4c9a8', bg: '#fdf6e3', border: '#d4c9a8', titleBg: '#f5eee0', titleText: '#5a4e3c' },
  { id: 'blue', name: '护眼蓝', value: '#e8f0fe', lineColor: '#8ab4f8', bg: '#e8f0fe', border: '#8ab4f8', titleBg: '#dce8f8', titleText: '#1a3a5c' },
  { id: 'green', name: '护眼绿', value: '#e8f5e9', lineColor: '#81c784', bg: '#e8f5e9', border: '#81c784', titleBg: '#dcedc8', titleText: '#2e7d32' },
  { id: 'pink', name: '粉色', value: '#fce4ec', lineColor: '#f48fb1', bg: '#fce4ec', border: '#f48fb1', titleBg: '#f8d7e0', titleText: '#7a3b4a' },
  { id: 'dark', name: '暗色', value: '#1e1e2e', lineColor: '#6c7086', bg: '#1e1e2e', border: '#6c7086', titleBg: '#2a2a3e', titleText: '#cdd6f4' }
]

// ========== 状态 ==========
const settings = reactive({
  paperType: 'lined',
  paperSize: 'a4',
  theme: 'white',
  lineHeight: 8,
  lineWidth: 1.5,
  lineOpacity: 60,
  marginTop: 15,
  marginBottom: 15,
  marginLeft: 20,
  marginRight: 20,
  showBorder: true,
  showTitle: true,
  showPageNum: true
})

const titleText = ref('我的笔记')

// ========== 计算属性 ==========
const currentTheme = computed(() => {
  return themeColors.find(c => c.id === settings.theme) || themeColors[0]
})

const currentPaperName = computed(() => {
  return paperTypes.find(p => p.id === settings.paperType)?.name || ''
})

const currentSizeName = computed(() => {
  return paperSizes.find(s => s.id === settings.paperSize)?.name || ''
})

// 横线位置计算
const startY = computed(() => 40 + settings.marginTop * mmToY + (settings.showTitle ? 80 : 0))
const endY = computed(() => 1100 - 40 - settings.marginBottom * mmToY - (settings.showPageNum ? 40 : 0))

// A4 实际毫米与 SVG 坐标的换算比例
const mmToX = 800 / 210
const mmToY = 1100 / 297

const linePositions = computed(() => {
  const positions = []
  const start = startY.value
  const end = endY.value
  const step = settings.lineHeight * mmToY
  for (let y = start; y <= end; y += step) {
    positions.push(y)
  }
  return positions
})

// 网格竖线位置
const gridXPositions = computed(() => {
  const positions = []
  const start = settings.marginLeft * mmToX
  const end = 800 - settings.marginRight * mmToX
  const step = settings.lineHeight * mmToX
  for (let x = start; x <= end; x += step) {
    positions.push(x)
  }
  return positions
})

// 米字格单元格
const miCells = computed(() => {
  const cells = []
  const start = startY.value
  const end = endY.value
  const cellWidth = 15 * mmToX
  const cellHeight = 15 * mmToY
  const left = settings.marginLeft * mmToX
  const right = 800 - settings.marginRight * mmToX
  const cols = Math.floor((right - left) / cellWidth)
  for (let row = 0; row < Math.floor((end - start) / cellHeight); row++) {
    for (let col = 0; col < cols; col++) {
      cells.push({
        index: cells.length,
        x: left + col * cellWidth,
        y: start + row * cellHeight,
        width: cellWidth,
        height: cellHeight
      })
    }
  }
  return cells
})

// 作文格子纸：宽 7mm、高 8mm，行间距 3mm
const zuowenCellWidth = 7 * mmToX
const zuowenCellHeight = 8 * mmToY
const zuowenRowGap = 3 * mmToY
const zuowenCells = computed(() => {
  const cells = []
  const left = settings.marginLeft * mmToX + 6
  const top = startY.value + 6
  const right = 800 - settings.marginRight * mmToX - 6
  const bottom = endY.value - 6
  const cols = Math.max(1, Math.floor((right - left) / zuowenCellWidth))
  const rows = Math.max(1, Math.floor((bottom - top) / (zuowenCellHeight + zuowenRowGap)))
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells.push({
        index: cells.length,
        x: left + col * zuowenCellWidth,
        y: top + row * (zuowenCellHeight + zuowenRowGap),
        width: zuowenCellWidth,
        height: zuowenCellHeight
      })
    }
  }
  return cells
})

// 四线三格位置
const staffPositions = computed(() => {
  const positions = []
  const start = startY.value + 20
  const end = endY.value
  const step = (9 + 5) * mmToY // 单行总高 9mm + 行间距 5mm
  for (let y = start; y <= end - 40; y += step) {
    positions.push(y)
  }
  return positions
})

// ========== 方法 ==========
const exportPDF = () => {
  // 打开新窗口用于打印
  const win = window.open('', '_blank', 'width=900,height=800')
  if (!win) {
    alert('请允许弹出窗口，或手动复制内容到新窗口打印')
    return
  }

  // 生成 SVG 内容
  const svgEl = document.querySelector('.paper-svg')
  if (!svgEl) {
    alert('预览未加载，请重试')
    return
  }

  const svgHTML = svgEl.outerHTML
  const color = currentTheme.value.bg
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>打印纸 - ${titleText.value}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #e8e8e8;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
    }
    .print-page {
      width: 210mm;
      min-height: 297mm;
      background: ${color};
      padding: 0;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .print-page svg {
      width: 100%;
      height: 100%;
    }
    @media print {
      body { background: white; }
      .print-page {
        box-shadow: none;
        border-radius: 0;
        width: 100%;
        min-height: 100vh;
      }
      .no-print { display: none !important; }
    }
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
    <div style="width:100%;">
      <div class="no-print" style="text-align:center;padding:12px;background:#f0f7ff;border-radius:8px;border:1px solid #d0e4ff;margin-bottom:12px;">
        <button onclick="window.print()">🖨️ 打印</button>
        <button class="btn-secondary" onclick="window.close()">✕ 关闭</button>
        <p style="margin-top:6px;font-size:13px;color:#666;">💡 按 Ctrl+P 或 Cmd+P 也可以打印</p>
      </div>
      ${svgHTML}
    </div>
  </div>
</body>
</html>`

  win.document.write(html)
  win.document.close()
}

const resetSettings = () => {
  settings.paperType = 'lined'
  settings.paperSize = 'a4'
  settings.theme = 'white'
  settings.lineHeight = 8
  settings.lineWidth = 1.5
  settings.lineOpacity = 60
  settings.marginTop = 15
  settings.marginBottom = 15
  settings.marginLeft = 20
  settings.marginRight = 20
  settings.showBorder = true
  settings.showTitle = true
  settings.showPageNum = true
  titleText.value = '我的笔记'
}
</script>

<style scoped>
.paper-tool {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 0;
}

.page-header {
  text-align: center;
  padding: 8px 0 24px;
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

.main-layout {
  display: grid;
  grid-template-columns: minmax(320px, 380px) minmax(0, 1fr);
  gap: 28px;
}

/* ===== 控制面板 ===== */
.control-panel {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 20px 22px;
  border: 1px solid var(--vp-c-divider);
  max-height: 820px;
  overflow-y: auto;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}
.control-panel::-webkit-scrollbar { width: 4px; }
.control-panel::-webkit-scrollbar-thumb { background: var(--vp-c-divider); border-radius: 2px; }

.control-group {
  margin-bottom: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.control-group:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

.group-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.option-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
  min-width: 0;
}
.option-grid.small {
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.option-btn {
  padding: 8px 6px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.option-btn:hover { border-color: var(--vp-c-brand-1); }
.option-btn.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.option-btn .option-icon { display: block; font-size: 20px; margin-bottom: 2px; }
.option-btn .option-name { font-size: 12px; }

.color-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.color-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
}
.color-btn:hover { transform: scale(1.08); }
.color-btn.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}
.color-btn .check-mark { text-shadow: 0 0 4px rgba(0,0,0,0.5); }

.slider-group { display: flex; flex-direction: column; gap: 8px; }
.slider-group.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 16px; }

.slider-item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.slider-item .slider-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
  min-width: 32px;
}
.slider-item input[type="range"] {
  flex: 1;
  min-width: 0;
  accent-color: var(--vp-c-brand-1);
  height: 4px;
  cursor: pointer;
}
.slider-item .slider-value {
  font-size: 12px;
  color: var(--vp-c-text-3);
  min-width: 44px;
  text-align: right;
}

.toggle-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.toggle-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  cursor: pointer;
}
.toggle-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--vp-c-brand-1);
  cursor: pointer;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}
.actions .btn { flex: 1; padding: 10px 16px; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; text-align: center; }
.btn-primary { background: var(--vp-c-brand-1); color: white; }
.btn-primary:hover { background: var(--vp-c-brand-2); transform: translateY(-2px); }
.btn-outline { background: transparent; color: var(--vp-c-text-2); border: 2px solid var(--vp-c-divider); }
.btn-outline:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }

/* ===== 预览面板 ===== */
.preview-panel {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-divider);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--vp-c-divider);
  margin-bottom: 16px;
}
.preview-title { font-size: 16px; font-weight: 600; color: var(--vp-c-text-1); }
.preview-info { font-size: 13px; color: var(--vp-c-text-3); background: var(--vp-c-bg); padding: 4px 14px; border-radius: 12px; }

.paper-preview {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 16px;
  min-height: 500px;
  min-width: 0;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.04);
}

.paper-svg {
  width: 100%;
  max-width: 100%;
  height: auto;
  aspect-ratio: 800/1100;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

/* ===== 响应式 ===== */
@media (max-width: 1100px) {
  .main-layout { grid-template-columns: 1fr; }
  .control-panel { max-height: none; }
  .paper-svg { max-width: 100%; }
}

@media (max-width: 600px) {
  .option-grid { grid-template-columns: 1fr 1fr; }
  .option-grid.small { grid-template-columns: 1fr 1fr; }
  .slider-group.two-col { grid-template-columns: 1fr; }
  .color-grid { gap: 6px; }
  .color-btn { width: 34px; height: 34px; }
  .actions { flex-direction: column; }
  .preview-panel { padding: 12px; }
  .paper-preview { padding: 8px; min-height: 300px; }
}
</style>

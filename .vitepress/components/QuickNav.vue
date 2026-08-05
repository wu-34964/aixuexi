<template>
  <div class="quick-nav">
    <div class="nav-header">
      <h2 class="nav-title">🚀 网站快捷导航</h2>
      <p class="nav-subtitle">选择工具，高效学习</p>
    </div>

    <div class="nav-grid">
      <a
        v-for="item in navItems"
        :key="item.link"
        :href="item.link"
        class="nav-card"
      >
        <div class="card-icon-wrapper">
          <span class="card-icon">{{ item.icon }}</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ item.name }}</h3>
          <p class="card-desc">{{ item.desc }}</p>
          <span class="card-arrow">→</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
const navItems = [
  { icon: '📚', name: '历年真题', desc: '历年高考真题，按年份地区分类', link: '/tools/历年真题' },
  { icon: '📐', name: '公式查询', desc: '数学、物理常用公式速查', link: '/tools/公式查询' },
  { icon: '🔠', name: '单词攻坚', desc: '科学记忆，高效背单词', link: '/tools/单词攻坚' },
  { icon: '⏱️', name: '计时工具', desc: '学科计时 + 番茄时钟', link: '/tools/计时工具' },
  { icon: '📖', name: '电子课本', desc: '查找课本封面，跳转网盘下载', link: '/tools/电子课本' },
  { icon: '📝', name: '名句默写', desc: '按课本篇目筛选，翻卡看答案', link: '/tools/名句默写' },
  { icon: '📖', name: '150天背单词', desc: '系统掌握高考核心词汇', link: '/tools/150天背单词' },
  { icon: '🖨️', name: '打印模板', desc: '笔记、计划、单词卡一键打印', link: '/tools/打印模板' },
]
</script>

<style scoped>
.quick-nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 24px 50px;
}

/* ===== 头部 ===== */
.nav-header {
  text-align: center;
  margin-bottom: 32px;
}

.nav-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.nav-subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* ===== 卡片网格 ===== */
.nav-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* ===== 卡片样式 ===== */
.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 20px 28px;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: all 0.35s ease;
  position: relative;
  overflow: hidden;
  min-height: 200px;
}

/* 卡片悬停效果 */
.nav-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
  background: var(--vp-c-bg);
}

/* 卡片底部装饰线 */
.nav-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: var(--vp-c-brand-1);
  border-radius: 4px;
  transition: width 0.4s ease;
}

.nav-card:hover::after {
  width: 60%;
}

/* ===== 图标 ===== */
.card-icon-wrapper {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: all 0.35s ease;
}

.nav-card:hover .card-icon-wrapper {
  /*background: var(--vp-c-brand-1);*/
  transform: scale(1.05);
}

.card-icon {
  font-size: 34px;
  line-height: 1;
  transition: all 0.35s ease;
}


/* ===== 文字内容 ===== */
.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 6px 0;
  transition: color 0.3s ease;
}

.nav-card:hover .card-title {
  color: var(--vp-c-brand-1);
  text-shadow: 0 6px 6px rgba(59, 130, 246, 0.3);
  /* 参数：水平偏移 垂直偏移 模糊半径 颜色 */
}

.card-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 12px 0;
  line-height: 1.5;
  flex: 1;
}

/* ===== 箭头 ===== */
.card-arrow {
  display: inline-block;
  font-size: 18px;
  color: var(--vp-c-text-3);
  transition: all 0.35s ease;
  opacity: 0.5;
}

.nav-card:hover .card-arrow {
  transform: translateX(6px);
  color: var(--vp-c-brand-1);
  opacity: 1;
}

/* ============================================================ */
/* ===== 响应式适配 ===== */
/* ============================================================ */

/* 平板：两列 */
@media (max-width: 1024px) {
  .nav-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
}

/* 手机：单列 */
@media (max-width: 640px) {
  .quick-nav {
    padding: 20px 16px 30px;
  }

  .nav-title {
    font-size: 22px;
  }

  .nav-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .nav-card {
    flex-direction: row;
    text-align: left;
    padding: 20px 24px;
    min-height: unset;
    align-items: center;
    gap: 18px;
  }

  /* 手机端去掉底部装饰线 */
  .nav-card::after {
    display: none;
  }

  .card-icon-wrapper {
    width: 56px;
    height: 56px;
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .card-icon {
    font-size: 26px;
  }

  .card-content {
    align-items: flex-start;
  }

  .card-title {
    font-size: 16px;
  }

  .card-desc {
    font-size: 13px;
    margin-bottom: 0;
  }

  .card-arrow {
    display: none;
  }

  /* 手机端悬停效果简化 */
  .nav-card:hover {
    transform: none;
    box-shadow: none;
  }

  .nav-card:hover .card-icon-wrapper {
    transform: none;
  }

  .nav-card:hover .card-title {
    color: var(--vp-c-brand-1);
  }
}

/* 小手机：进一步调整 */
@media (max-width: 400px) {
  .nav-card {
    padding: 16px 18px;
    gap: 14px;
  }

  .card-icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .card-icon {
    font-size: 22px;
  }

  .card-title {
    font-size: 15px;
  }

  .card-desc {
    font-size: 12px;
  }
}
</style>

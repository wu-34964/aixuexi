---
title: 全部学科
layout: home
---

<script setup>
import { withBase } from 'vitepress'

const subjects = [
  { name: '语文', icon: '📖', color: '#3b82f6', link: '/语文/前言', desc: '语言建构与运用·文化传承' },
  { name: '数学', icon: '📐', color: '#f59e0b', link: '/数学/前言', desc: '逻辑推理·数学建模' },
  { name: '英语', icon: '🎧', color: '#10b981', link: '/英语/前言', desc: '语言能力·跨文化交际' },
  { name: '物理', icon: '🧲', color: '#ef4444', link: '/物理/前言', desc: '物理观念·科学探究' },
  { name: '化学', icon: '🧪', color: '#8b5cf6', link: '/化学/前言', desc: '宏观辨识·微观探析' },
  { name: '生物', icon: '🧬', color: '#22d3ee', link: '/生物/前言', desc: '生命观念·科学思维' },
  { name: '历史', icon: '🎞️', color: '#f472b6', link: '/历史/前言', desc: '时空观念·家国情怀' },
  { name: '政治', icon: '📰', color: '#fb923c', link: '/政治/前言', desc: '政治认同·法治意识' },
  { name: '地理', icon: '🔭', color: '#34d399', link: '/地理/前言', desc: '人地协调·区域认知' }
]
</script>

<style scoped>
.subjects-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.subject-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subject-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.subject-card .icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.subject-card .name {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.subject-card .desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.subject-card .badge {
  margin-top: 12px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  padding: 4px 16px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
}

/* 每个学科的颜色条 */
.subject-card .color-bar {
  width: 48px;
  height: 4px;
  border-radius: 2px;
  margin: 10px auto 0;
}

/* 响应式适配 */
@media (max-width: 900px) {
  .subjects-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 500px) {
  .subjects-container {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .subject-card {
    padding: 24px 16px;
  }
  
  .subject-card .icon {
    font-size: 36px;
  }
}

/* 页面标题样式 */
.page-header {
  text-align: center;
  padding: 20px 0 10px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.page-header p {
  font-size: 18px;
  color: var(--vp-c-text-2);
  margin-top: 8px;
}
</style>

<div class="page-header">
  <h1>📚 全部学科</h1>
  <p>选择一门学科，开始你的学习之旅</p>
</div>

<div class="subjects-container">
  <a v-for="subject in subjects" 
     :key="subject.name"
     :href="withBase(subject.link)"
     class="subject-card">
    <div class="icon">{{ subject.icon }}</div>
    <div class="name">{{ subject.name }}</div>
    <div class="desc">{{ subject.desc }}</div>
    <div class="color-bar" :style="{ background: subject.color }"></div>
    <div class="badge">立即开始 →</div>
  </a>
</div>

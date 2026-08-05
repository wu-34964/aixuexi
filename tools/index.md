# 🧰 学习工具箱

这里汇集了帮助你高效学习的小工具，点击即可使用。

<div class="tool-grid">
  <a href="./单词攻坚" class="tool-card">
    <div class="tool-icon">🔠</div>
    <h3>单词攻坚</h3>
    <p>按照难度分级，自定义单词数量</p>
  </a>
  <a href="./公式查询" class="tool-card">
    <div class="tool-icon">🔦</div>
    <h3>公式查询</h3>
    <p>数学、物理常用公式速查</p>
  </a>
  <a href="./打印模板" class="tool-card">
    <div class="tool-icon">🖨</div>
    <h3>打印模板</h3>
    <p>笔记、计划、单词卡等多种模板一键打印</p>
  </a>
  <a href="./计时工具" class="tool-card">
    <div class="tool-icon">⏱️</div>
    <h3>计时工具</h3>
    <p>番茄钟专注学习，提高效率</p>
  </a>
    <a href="./150天背单词" class="tool-card">
    <div class="tool-icon">📖</div>
    <h3>150天背完3000词</h3>
    <p>每天一个页面，系统掌握高考核心词汇</p>
</a>
  <a href="./电子课本" class="tool-card">
    <div class="tool-icon">📚</div>
    <h3>电子课本</h3>
    <p>查找课本封面，跳转百度网盘下载</p>
  </a>
  <a href="./名句默写" class="tool-card">
    <div class="tool-icon">📝</div>
    <h3>名句默写</h3>
    <p>按课本和篇目筛选，翻卡查看答案</p>
  </a>
</div>

<style>
.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.tool-card {
  display: block;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  text-decoration: none;
  color: var(--vp-c-text-1);
}
.tool-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}
.tool-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.tool-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}
.tool-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
</style>

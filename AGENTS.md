# 项目协作说明

## 1. 项目定位

- 项目名称：爱学习。
- 目标用户：中国高中生，主要服务于高考复习、知识点查阅和学习工具使用。
- 产品形态：基于 VitePress 的静态学习资料网站，Markdown 承载学科内容，Vue 组件提供交互工具。
- 当前线上地址：<https://wu-34964.github.io/aixuexi/>。
- GitHub 仓库：<https://github.com/wu-34964/aixuexi>。
- 默认分支：`main`。

## 2. 技术栈与常用命令

- VitePress：`^2.0.0-alpha.17`。
- Vue 3：由 VitePress 提供，交互组件统一使用 `<script setup>`。
- 数学公式：VitePress Markdown 数学支持、KaTeX 和 `markdown-it-mathjax3`。
- 包管理器：npm，依赖锁定文件为 `package-lock.json`。
- 推荐使用 Node.js 20 或与 GitHub Actions 一致的兼容版本。

```bash
npm install
npm run docs:dev
npm run docs:build
npm run docs:preview
```

在 Windows PowerShell 因执行策略无法运行 `npm.ps1` 时，可改用：

```powershell
npm.cmd run docs:dev
npm.cmd run docs:build
```

## 3. 目录结构

```text
.
├─ .github/workflows/       GitHub Pages 自动部署
├─ .vitepress/
│  ├─ config.mts            站点、导航、侧边栏、搜索和 Markdown 配置
│  ├─ components/           学习工具 Vue 组件
│  ├─ data/                 词汇、真题、公式、课本、名句等静态数据
│  └─ theme/                默认主题扩展与全局样式
├─ public/                  静态资源，目前主要是 logo.png
├─ tools/                   工具入口 Markdown 页面
├─ 语文/ 数学/ 英语/        主要学科资料
├─ 物理/ 化学/ 生物/        目前主要是学科前言或占位内容
├─ 历史/ 地理/ 政治/        目前主要是学科前言或占位内容
├─ index.md                 首页
├─ subjects.md              全部学科卡片页
├─ 前言.md                  高考与学习方法总览
└─ package.json             脚本和依赖
```

`node_modules/`、`.vitepress/dist/`、`.vitepress/cache/` 和 `.vitepress/.temp/` 都是依赖或生成目录，不应提交或直接编辑。

## 4. 内容组织现状

### 语文

语文内容已经按四个模块展开：

- 语言文字运用：词语与成语、病句、语句衔接与表达效果、压缩仿写与图文转换。
- 古诗文阅读：实词虚词与句式、断句与翻译、内容理解与文化常识、诗歌鉴赏、名篇名句默写。
- 现代文阅读：通用方法、信息类文本、文学类文本。
- 写作：审题立意、结构论证、素材语言与升格修改。

专题文章大体采用统一结构：考点定位、知识清单、解题步骤、示例、易错点、自测题、复习建议。新增语文文章时应尽量保持这一模板。

### 数学

数学按九个模块组织：

- 集合与逻辑
- 函数与不等式
- 三角函数与平面向量
- 数列
- 复数
- 立体几何与空间向量
- 解析几何
- 计数原理与概率统计
- 导数及其应用

每个模块有 `index.md` 和两篇左右的专题文章。专题通常包含核心结论、典型方法、例题、自测与复习建议。数学公式应继续使用 Markdown 数学语法，不要用图片替代可排版的公式。

### 英语

- 学科首页内容相对完整，包含考情、复习计划和学习入口。
- 单词模块已有索引、高频词汇和熟词生义页面，但部分内容仍较简略。
- 语法、题型攻略和作文下有多个占位页，后续需要补充正文。
- 词汇学习的主要交互能力由 `WordCard.vue` 和 `DailyWord.vue` 提供。

### 其他学科

物理、化学、生物、历史、地理和政治当前主要为前言或建设中提示，尚未形成与语文、数学相同深度的专题体系。

## 5. 交互工具与数据对应关系

| 工具页面 | Vue 组件 | 主要数据源/状态 |
| --- | --- | --- |
| 首页快捷导航 | `QuickNav.vue` | 组件内导航数组 |
| 历年真题 | `ExamArchive.vue` | `data/examLinks.js` |
| 150 天背单词 | `DailyWord.vue` | `data/dailyWords.js`、`localStorage: dailyWord_review` |
| 单词攻坚 | `WordCard.vue` | `data/words.js`、`data/words1.js`、学习与历史记录本地存储 |
| 公式查询/学习 | `FormulaSearch.vue`、`FormulaLearn.vue` | `data/formulas.js`、KaTeX |
| 计时工具 | `TimerTool.vue` | `localStorage: timer_subject_records`、`timer_pomodoro_data` |
| 打印模板 | `PrintPaper.vue` | 组件内纸张设置，使用新窗口和浏览器打印 |
| 电子课本 | `TextbookReader.vue` | `data/textbooks.js`，包含外部网盘链接与提取码 |
| 名句默写 | `MingjuTool.vue` | `data/mingju.js`、`localStorage: mingju-game-state-v1` |

大型数据文件需要谨慎修改：

- `dailyWords.js` 约 1 MB、3 万多行。
- `mingju.js` 约 600 KB、1 万多行。
- `words.js` 和 `words1.js` 各包含数千行词汇数据。
- `examLinks.js`、`textbooks.js` 也包含大量外部链接。

编辑这些文件时应保持现有对象字段结构、ID 唯一性和导出名称，避免无意义的全文件格式化，以免产生巨大 diff。

## 6. VitePress 配置和主题

- `.vitepress/config.mts` 维护站点标题、描述、顶部导航、各学科侧边栏、工具侧边栏和本地搜索中文文案。
- Markdown 已开启行号和数学公式支持。
- `.vitepress/theme/index.js` 继承默认主题，加载 `custom.css`，并注册 `NavDivider`。
- `.vitepress/theme/custom.css` 包含品牌色、首页、工具页、响应式和暗色模式等全局样式。
- 页面级 Vue 组件通常在对应 Markdown 的 `<script setup>` 中显式导入，不依赖全局注册。

新增学科文章时，除了创建 Markdown 文件，还要同步更新 `.vitepress/config.mts` 中对应侧边栏，否则页面虽然可访问，但用户难以发现。

## 7. 链接与 GitHub Pages 子路径规则

这是本项目最重要的部署约束。

线上站点不是部署在域名根目录，而是在 `/aixuexi/` 子路径下。`.vitepress/config.mts` 通过以下方式兼容本地和线上：

```ts
base: process.env.BASE_PATH || '/'
```

GitHub Actions 构建时自动注入 `BASE_PATH=/aixuexi/`。

链接编写规则：

- VitePress 配置中的 `nav`、`sidebar` 和标准 Markdown 内部链接可以使用 `/路径`。
- Vue 模板中的动态内部链接必须使用 `withBase()`：

```vue
<script setup>
import { withBase } from 'vitepress'
</script>

<a :href="withBase('/tools/历年真题')">历年真题</a>
```

- 原生 HTML `<a href="/tools/...">` 不会自动补齐部署子路径。相同目录下优先写相对地址，例如工具索引中使用 `href="./公式查询"`。
- 不要把 `/aixuexi/` 硬编码到源码，否则本地开发和未来更换仓库名时会出问题。
- 修改链接后，应使用线上子路径构建并扫描产物：

```powershell
$env:BASE_PATH='/aixuexi/'
npm.cmd run docs:build
rg -n -P 'href="/(?!aixuexi/|/|#)' .vitepress/dist -g '*.html' -g '*.js'
```

扫描无输出才表示没有发现遗漏仓库前缀的根路径链接。

## 8. 部署流程

- 工作流文件：`.github/workflows/deploy-pages.yml`。
- 触发条件：推送到 `main`，也支持手动运行。
- 构建环境：Ubuntu、Node.js 20、`npm ci`、`npm run docs:build`。
- 构建产物：`.vitepress/dist`。
- 发布方式：`actions/upload-pages-artifact` + `actions/deploy-pages`。
- GitHub Pages 已启用，构建来源为 GitHub Actions。
- 工作流根据仓库名自动判断站点是否需要子路径，因此既兼容普通项目仓库，也兼容 `用户名.github.io` 类型仓库。

发布前至少执行：

```bash
npm run docs:build
git diff --check
```

推送后应确认 GitHub Actions 的 `build` 和 `deploy` 两个 job 都成功，再把线上地址交付给用户。

## 9. 开发与维护约定

- 源码和内容统一保存为 UTF-8。Windows 终端偶尔会把中文显示成乱码；不要据此直接重写文件，应以编辑器内容和实际构建结果判断编码是否正常。
- 新增页面时优先使用中文目录和清晰的中文标题，与现有内容体系保持一致。
- 文章面向高中生，语言应准确、直接、可执行；避免只有概念罗列，尽量包含方法、例题、易错点和自测。
- 涉及考试政策、考试时间、教材版本或外部下载地址的内容可能过时，更新前应核对权威来源。
- 外部下载链接应使用 `target="_blank"` 时同时加 `rel="noopener noreferrer"`。
- 使用 `window`、`document`、`localStorage` 的逻辑只能在浏览器生命周期内运行，避免在模块顶层访问导致 VitePress SSR 构建失败。
- 本项目没有单独的自动化测试套件，`npm run docs:build` 是当前最重要的回归检查。
- 修改交互工具时，还应手动检查移动端布局、暗色模式、键盘操作、本地存储恢复和打印窗口。
- 不要提交 `.vitepress/dist`、缓存、日志或 `node_modules`。

## 10. 已知风险和后续优先级

1. 英语多个专题及六门其他学科仍缺少完整内容，是当前最明显的内容缺口。
2. 大型数据直接打包进前端，已出现构建 chunk 超过 500 KB 的警告；数据继续增长时应考虑按工具或日期拆分、动态加载。
3. 电子课本和真题依赖外部网盘链接，需要定期检查失效情况。
4. 学习进度仅保存在浏览器 `localStorage`，清理浏览器数据或更换设备后无法同步。
5. 部分工具组件体积较大（如 `WordCard.vue`、`DailyWord.vue`、`TimerTool.vue`），新增功能前优先考虑拆分子组件和通用逻辑。
6. 网站目前没有后端、账号、云同步、访问统计或内容管理系统，所有内容随 Git 提交发布。

## 11. 修改任务的推荐检查顺序

1. 阅读目标 Markdown、关联 Vue 组件和数据文件。
2. 检查是否需要同步修改导航或侧边栏。
3. 检查内部链接是否兼容 `base`。
4. 执行生产构建。
5. 执行 `git diff --check` 并审阅 diff，尤其避免大型数据文件被整体重排。
6. 如需发布，推送 `main` 后检查 GitHub Actions 和线上页面。


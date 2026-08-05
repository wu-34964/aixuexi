---
layout: home

hero:
  name: "爱学习"
  text: "构建你的专属知识体系"
  tagline: 轻松掌握学习方法，高效备战每一次考试
  image:
    src: /logo.png
    alt: 爱学习
  actions:
    - theme: brand
      text: 开始学习 →
      link: /前言
    - theme: alt
      text: 查看全部学科
      link: /subjects

features:
  - icon: 📚
    title: 学科全覆盖
    details: 涵盖九大学科，知识点系统化整理，附带知识框架图，学习更高效。
  - icon: 🔍
    title: 精准查缺补漏
    details: 快速定位知识薄弱点，针对性学习，告别题海战术。
  - icon: 🛠️
    title: 实用学习工具
    details: 内置单词本、公式查询、背诵计划表等工具，提升学习效率。
---
<script setup>
import QuickNav from './.vitepress/components/QuickNav.vue'
</script>

<QuickNav />

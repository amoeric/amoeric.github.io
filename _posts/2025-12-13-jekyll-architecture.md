---
layout: single
title: Jekyll 專案架構介紹
date: 2025-12-13 23:00 +0800
tags:
  - jekyll
  - githubio
toc: true
---

本文章介紹 Jekyll 專案的基本架構，幫助你快速理解各個資料夾和檔案的用途。

## 目錄結構

一個標準的 Jekyll 專案結構如下：

```
.
├── _config.yml      # 網站設定檔
├── _data/           # 資料檔案（YAML、JSON、CSV）
├── _drafts/         # 草稿文章
├── _includes/       # 可重用的元件
├── _layouts/        # 版面配置模板
├── _posts/          # 文章存放處
├── _sass/           # Sass 樣式檔
├── _site/           # 編譯後的靜態網站（自動產生）
├── assets/          # 靜態資源（CSS、JS、圖片）
└── index.html       # 首頁
```

## 各資料夾說明

### _config.yml

網站的核心設定檔，包含網站標題、描述、permalink 格式等設定。

```yaml
title: 我的部落格
description: 這是我的技術筆記
permalink: /:categories/:title/
```

### _posts/

所有文章都放在這裡，檔名格式必須是 `YYYY-MM-DD-title.md`。

```
_posts/
├── 2025-12-13-my-first-post.md
└── 2025-12-13-jekyll-architecture.md
```

每篇文章開頭需要有 front matter：

```yaml
---
layout: single
title: 文章標題
date: 2025-12-13 11:00 +0800
tags:
  - tag1
  - tag2
---
```

### _layouts/

定義頁面的版面配置，常見的有：

| Layout | 用途 |
|--------|------|
| default | 基礎版面 |
| single | 單篇文章 |
| archive | 文章列表 |
| home | 首頁 |

### _includes/

存放可重用的 HTML 片段，例如 header、footer、sidebar 等。在其他檔案中可以這樣引用：

```liquid
{% include header.html %}
```

### _sass/

存放 Sass/SCSS 樣式檔，Jekyll 會自動編譯成 CSS。

### assets/

存放靜態資源，通常會有以下結構：

```
assets/
├── css/       # 樣式檔
├── js/        # JavaScript
└── images/    # 圖片
```

### _site/

這是 Jekyll 編譯後產生的靜態網站，**不要手動修改這個資料夾的內容**，每次執行 `jekyll build` 都會重新產生。

## 常用指令

| 指令 | 說明 |
|------|------|
| `jekyll new 專案名` | 建立新專案 |
| `jekyll build` | 編譯網站 |
| `jekyll serve` | 本地預覽（http://localhost:4000） |
| `jekyll serve --drafts` | 預覽包含草稿 |

## Front Matter 常用屬性

| 屬性 | 說明 | 範例 |
|------|------|------|
| layout | 使用的版面 | single |
| title | 文章標題 | 我的文章 |
| date | 發布日期 | 2025-12-13 11:00 +0800 |
| tags | 標籤 | [jekyll, tutorial] |
| categories | 分類 | [技術] |
| toc | 顯示目錄 | true |
| published | 是否發布 | false |

## 參考來源
- [Jekyll 官方文件](https://jekyllrb.com/docs/)
- [Minimal Mistakes 主題文件](https://mmistakes.github.io/minimal-mistakes/)

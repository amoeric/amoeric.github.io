---
layout: post
title: "如何在 jekyll 上使用標籤？"
author: amoeric
image: assets/images/1.jpg
date: 2020-08-19 00:40:00 +0800
tags: [jekyll]
comments: true
---
>其實在各網站上都有相關的處理方法，解法也百百種，在此紀錄我的奇耙解法XDD

# 在此之前

我們必須先了解 `jekyll` 頁面是怎麼執行的， `jekyll` 預設文章會放在 `_posts` 資料夾底下，

並且會產生對應路徑 `site.url/post-name.html` 。

這樣的話我只要建立一個沒有內容的文章，並設定專屬的 `layout` ， `_layouts` 底下再新增 `tag.html` 

並由 `tag.html` 負責印出所有標籤。

於是 `_posts` 底下就多了一個沒有內容的文章 `tags.md` (因為只需要 layout、路徑)

但是這樣的話會產生一個問題... 在首頁預設印出所有文章的時候會印出這沒用的文章

----

# 解法

**最終的做法**

在 `Gemfile` 同一層路徑下新增 `tags.md` 檔，如此一來所有文章也不會印出來，路徑也會變成 `/tags` 。

接著在 `tags.md` 裡面設定專屬的 `layout` 例如：`--- layout: tag ---` ，

接下來設定 `_layouts/tag.html` 裡面關鍵段落就完成了。

```ruby
  { % if site.tags % }
    { % for current_tag in site.tags % }
      <ul class="my-3">
        <span class="tag-mark"> {{ current_tag[0] }} </span>
          { % for post in current_tag[1] % }
            <li class="my-2">
              <a href="{{ site.url }}{{post.url}}">{{ post.title }}    {{ post.date | date: "%Y-%m-%d"}}</a>
            </li>
          { % endfor %}
      </ul>
    { % endfor %}
  { % endif %}
```
-------

# 結論

網路上其實有很多種方法，不仿都去嘗試看看。
只要能夠解決就是個解法
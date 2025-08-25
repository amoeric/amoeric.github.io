---
layout: single
title: 在 active_admin 中使用 select2
date: 2021-07-04 16:00 +0800
tags: [rails, active_admin, activeadmin_addons, select2, 雷]
toc: true
---

在試著用 rails 建立自己的部落格時，需要在 active_admin 使用的後台建立 post 並使用 select2 建立 tags。  
然而，當我試著用[正常方式](https://stackoverflow.com/questions/59156567/how-to-require-select2-with-webpacker-rails)處理時，卻一直跑出 <mark>TypeError: $(...).select2 is not a function</mark> 的錯誤...  
  
---

後來發現，在前台使用 select2 時一切正常，猜想可能是 active_admin 使用的 layout 並非我所設定的，  
後來找到 activeadmin_addons 這個 gem 來使用 select2。

---

### 安裝
``` ruby
gem 'activeadmin_addons'
```
``` ruby
bundle
```

``` ruby
rails g activeadmin_addons:install
```
  
這指令會產生 <mark>config/initializers/activeadmin_addons.rb</mark> 設定檔。

接下來步驟參考[官方](https://github.com/platanus/activeadmin_addons/blob/master/docs/install_generator.md)

### 最後，有關 active_admin_addons 的相關檔案如下  
``` javascript
//app/assets/javascripts/active_admin.js
//= require active_admin/base
//= require activeadmin_addons/all
```

``` scss
// app/assets/stylesheets/active_admin.scss
@import "active_admin/mixins";
@import "active_admin/base";
@import 'activeadmin_addons/src/stylesheets/all';
```

如果使用 webpack 的話，要額外 <mark>yarn add activeadmin_addons</mark>
  
<img src="/assets/images/active_admin/yarn_activeadmin_addons.png" alt="yarn_add">
  
會發現到，該指令也幫你一併安裝了 select2 和 datetimepicker

### 使用 select2 新增 tag
在[該官方文章](https://github.com/platanus/activeadmin_addons/blob/master/docs/select2_tags.md)會教你如何使用，  
也可以參考 [fred的文章](https://www.spreered.com/rails-tagging-using-select2/) ，我最後是一起使用並完成的。

---

### 參考文章
* [how-to-require-select2-with-webpacker-rails](https://stackoverflow.com/questions/59156567/how-to-require-select2-with-webpacker-rails)
* [activeadmin_addons_select2_tags](https://github.com/platanus/activeadmin_addons/blob/master/docs/select2_tags.md)
* [官方gem](https://github.com/platanus/activeadmin_addons)
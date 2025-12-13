---
layout: single
title: 使用 active_admin 快速打造後台
date: 2021-07-04 16:00 +0800
tags: [rails, active_admin]
toc: true
---

每每寫小專案或活動網站時，總需要一個簡單的後台，而又不想花費精力寫個後台時，就可以用 <mark>active_admin</mark> 來快速打造一個簡易的後台。


---

## active_admin
[active_admin](https://github.com/activeadmin/activeadmin)這個 gem 雖然透過很簡單的步驟就可以建立後台，  
但它支援的 gem 也是該有的都有，舉凡像是常用的 devise 、 cancancan 、 pundit 、 draper 等，甚至還可以匯入別人寫好的主題。  

### 安裝步驟
安裝方式也很簡單，只要下列幾個步驟即可，以下步驟以建立 Admin 管理員為範例。

### 安裝 gem
``` ruby
gem 'activeadmin'
gem 'devise'
```

bundle install  
  
### 建立相關 migrate 與設定

接著輸入下列指令  

``` ruby
rails g active_admin:install Admin
```

<img src="/assets/images/active_admin/install_com.png" alt="install">

該指令會幫你  
* 建立 devise admin
* 建立 Admin model
* 設定 routes (devise_for)
* 寫入簡易 seed 檔
* 建立 app/admin/dashboard.rb
* 建立 app/admin/admins.rb
* 建立 app/assets/javascripts/active_admin.js
* 建立 app/assets/stylesheets/active_admin.scss
* 建立 config/initializers/active_admin.rb

### 完成

``` ruby
rails db:migrate
rails db:seed
rails server
```

大功告成!  
接下來輸入 /admin 就會看到後台登入畫面囉！  

<img src="/assets/images/active_admin/login_page.png" alt="login_page">

### 後記
如果對這個 gem 有興趣的話，[這裡提供](https://awesomeopensource.com/projects/activeadmin)支援 active_admin 的延伸 gem 可以做使用。  
  
---
### 參考文章
* [官方gem](https://github.com/activeadmin/activeadmin)
* [官方doc](https://activeadmin.info/0-installation.html)
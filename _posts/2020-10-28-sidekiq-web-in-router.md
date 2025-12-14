---
layout: post
title: "sidekiq web-ui session destroy"
author: amoeric
image: assets/images/1.jpg
date: 2020-10-28 1500 +0800
tags: [sidekiq]
---
最近用 `sidekiq` 後台頁面時遇到了一個問題  
在 `routes` 中如果要使用 `devise` 限制 `sidekiq` 的使用對象的話  
登入後每切換一個頁面就會自動登出  
後來發現每次切換頁面 session 就會被清空一次，導致這個狀況發生
  
----

```ruby
#routes.rb
require 'sidekiq/web'
Rails.application.routes.draw do
  authenticate :user, Proc.new { |u| u.can_managed? } do
    mount Sidekiq::Web => '/sidekiq'
  end
```
  
後來的解決方法參考 [Not sharing session with sidekiq web-ui](https://github.com/redis-store/redis-rails/issues/34)   
在 `require 'sidekiq/web'` 底下加入 `Sidekiq::Web.set :sessions, false` 就完成了！  
  
```ruby
#routes.rb
require 'sidekiq/web'
Sidekiq::Web.set :sessions, false
Rails.application.routes.draw do
  authenticate :user, Proc.new { |u| u.can_managed? } do
    mount Sidekiq::Web => '/sidekiq'
  end
  ....略
```
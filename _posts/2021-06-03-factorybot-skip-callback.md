---
layout: single
cover: 'assets/images/summit.jpg'
title: how to skip callback in rspec
date: 2021-06-03 16:50 +0800
tags: [rails, factorybot, skip_callback]
comments: true
---

當寫了一個 callback 導致整個 spec 爆炸時，可以使用 `skip_callback` method 讓 spec 恢復正常

```ruby
# model
after_commit :generate_zip
```



```ruby
#factory
after :build do |post|
  post.class.skip_callback(:commit, :after, :generate_zip, raise: false) 
end
```



如果要針對該 callback 進行測試時，可以

```ruby
# factory
factory :post_with_generate_zip do
  after :create do |post|
    post.send(:generate_zip)
  end
end
```

用法

```ruby
create(:post_with_generate_zip)
```







## 參考資料

* [https://github.com/thoughtbot/factory_bot/issues/931](https://github.com/thoughtbot/factory_bot/issues/931)
* [https://www.codenong.com/8751175/](https://www.codenong.com/8751175/)
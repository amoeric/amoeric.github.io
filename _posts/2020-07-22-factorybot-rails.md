---
layout: single
title:  "Factory_bot_rails 筆記"
date:   2020-07-22 1500 +0800
tags: [factorybot, ruby]
toc: true
---


在 factory_bot_rails 裡面 Callbacks 分為四種
順序依序為：after(:build) -> before(:create) -> after(:create)
另外 after(:stub) #在 build_stubbed 建立物件時使用

---

而在使用 factory_bot 建立物件時，常常會用到 build(:user)、create(:user)、build_stubbed(:user)，這三種的差異是？

### build(:user)、create(:user)、build_stubbed(:user) 差異

* build(:user)
不會將物件存進資料庫中、且觸發驗證與關聯

* create(:user)
會將物件存進資料庫、且觸發驗證與關聯

* build_stubbed(:user)
不會將物件存進資料庫中、不會觸發關聯性物件的驗證，而且會提供一個假 id、假 created_at

---

### fatory_bot_rails 使用情況

### 基本用法為

``` ruby
factory :user do
  name { "Friendly User" }

  trait :male do
    name { "John Doe" }
    gender { "Male" }
  end
end
create(:user) #建立 user 物件
create(:user, :male) #建立 user 並帶入 male 的設定
```

### 想在建立使用者時順便建立起相關聯的 factory 的話

``` ruby
factory :user do
  #some attributes
  after :create do |user|
    create :profile, user: user             # has_one
    create_list :article, 3, user: user     # has_many :article * 3
  end
end
```

### 想在建立 profile 時順便建立使用者的話

``` ruby
factory :profile do
  user #這是 association :user, factory: :user 的縮寫
  association :user, factory: [:user, :sometrait]  #也可以指定 factory
end
```

### 如果想一次建立多個 factory

``` ruby
factory :article do
  title { "A title" }

  factory :approved_post do
    approved { true }
  end
end

approved_post = create(:approved_post)
approved_post.title    # => "A title"
approved_post.approved # => true

```

### 不想寫在裡面的話也可以這樣寫

``` ruby
factory :post do
  title { "A title" }
end
factory :approved_post, parent: :post do
  approved { true }
end
```

### 想在建立使用者時順便建立起相關聯的 factory且要不同 trait 的話？

``` ruby
#memberships.rb
factory :pay_at_2018, parent: :membership, traits: [:pay2018]
factory :pay_at_2019, parent: :membership, traits: [:pay2019]
factory :pay_at_2020, parent: :membership, traits: [:pay2020]
#users.rb
after(:create) do |user|
  create(:pay_at_2018, user: user)
  create(:pay_at_2019, user: user)
  create(:pay_at_2020, user: user)
end
```

### 參考文獻
* [File: GETTING_STARTED - Documentation for factory_bot (5.2.0)](https://www.rubydoc.info/gems/factory_bot/file/GETTING_STARTED.md#transient-attributes)

* [Use Factory Girl's build_stubbed for a Faster Test Suite](https://thoughtbot.com/blog/use-factory-girls-build-stubbed-for-a-faster-test)

* [FactoryGirl (Bot) - create vs build vs build_stubbed - Qiita](https://qiita.com/Kolosek/items/ac078b9911639f8dec3c)

* [Factory Bot cheatsheet](https://devhints.io/factory_bot)

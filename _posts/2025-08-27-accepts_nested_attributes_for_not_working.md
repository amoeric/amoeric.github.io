---
layout: post
title: "Rails 8 中 accepts_nested_attributes_for 無法正常運作的解決方案"
author: amoeric
image: assets/images/1.jpg
date: 2025-08-27 11:00 +0800
tags: 
toc: true
---
## 問題描述

升級到 Rails 8 後，將 `params.require` 改為 `params.except` 的用法後，遇到了 `accepts_nested_attributes_for` 無法正常運作的問題。

## Rails 8 的參數處理變更

Rails 8 需要將原本的 `params.require` 改成 `params.except`：

```ruby
# Rails 7 的寫法
user_params = params.require(:user).permit(:name, :handle)

# Rails 8 的寫法
user_params = params.except(user: [:name, :handle])
```

## 問題現象

然而修改後，`accepts_nested_attributes_for` 在建立相關 record 時卻出現無法建立的狀況。

```ruby
# User model
class User < ApplicationRecord
  has_many :roles
  accepts_nested_attributes_for :roles, allow_destroy: true
end

# Controller
def user_params
  params.except(
    user: [:name, :handle,
           roles_attributes: [:id, :name, :_destroy]]
  )
end
```

看起來語法沒有錯誤，但 log 中卻沒有出現 roles 相關的 SQL 語句。

## 解決方案

後來發現，Rails 8 在處理 `has_many` 關聯時，需要額外加上雙括號來表示這是一個陣列屬性：

```ruby
def user_params
  params.except(
    user: [:name, :handle,
           roles_attributes: [[:id, :name, :_destroy]]]
  )
end
```

## 關鍵差異

- **Rails 7**: `roles_attributes: [:id, :name, :_destroy]`
- **Rails 8**: `roles_attributes: [[:id, :name, :_destroy]]`

注意 `roles_attributes` 的值需要用雙括號 `[[]]` 來包裝，這樣 Rails 8 才能正確識別這是一個陣列屬性。

## 總結

Rails 8 的 `params.except` 語法與 `accepts_nested_attributes_for` 配合使用時，需要特別注意 `has_many` 關聯的參數格式。使用雙括號 `[[]]` 來表示陣列屬性，這樣才能確保巢狀屬性能夠正常運作。

## 參考文章

- [How to Convert to Rails params.except](https://martinemde.com/2024/12/21/how-to-convert-to-rails-params-expect.html)
- [Rails 8 accepts_nested_attributes_for not working](https://stackoverflow.com/questions/79341062/rails-8-accepts-nested-attributes-for-in-a-model-is-not-working-the-same-as-rail)
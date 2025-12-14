---
layout: post
title: "use nesteds_form in rails"
author: amoeric
image: assets/images/7.jpg
date: 2021-06-03 16:00 +0800
tags: [rails, nesteds_form]
toc: true
---
在 rails 中，如果要在同個表單下一併儲存關聯性物件常常會用到 nested_forms 的功能，以下介紹。



### Model

- 把需要一併新增的關聯物件設定 `accepts_nested_attributes_for` ， controller 就可以使用 `addresses_attributes` params ，一併將address新增。

```ruby
class Person < ApplicationRecord
  has_many :addresses, inverse_of: :person

  accepts_nested_attributes_for :addresses
end

class Address < ApplicationRecord
  belongs_to :person
end
```



### Form

```ruby
<%= form_with model: @person do |form| %>
  Addresses:
  <ul>
    <%= form.fields_for :addresses do |addresses_form| %>
      <li>
        <%= addresses_form.label :kind %>
        <%= addresses_form.text_field :kind %>

        <%= addresses_form.label :street %>
        <%= addresses_form.text_field :street %>
        ...
      </li>
    <% end %>
  </ul>
<% end %>
```



### Params

```ruby
{
  'person' => {
    'name' => 'John Doe',
    'addresses_attributes' => {
      '0' => {
        'kind' => 'Home',
        'street' => '221b Baker Street'
      },
      '1' => {
        'kind' => 'Office',
        'street' => '31 Spooner Street'
      }
    }
  }
}
```



### controller

```ruby
params.require(:person).permit(:name, address_attributes: [:id, :kind, :street])
```



------



這樣就可以在新增 person 時一併新增 address 了！可以多多使用這種方式省下不必要的 model 。

另外， ``accepts_nested_attributes_for``  還提供了 `allow_destroy: true` 方式能夠刪除 address。



---

### 加入 allow_destroy: true

### model

```ruby
--略--
 accepts_nested_attributes_for :addresses, allow_destroy: true
--略--
```



### form

```ruby
    <%= form.fields_for :addresses do |addresses_form| %>
      <li>
        <%= addresses_form.check_box :_destroy %>
      </li>
    <% end %>
```



此時觀察 params 就會發現多了一個 _destroy 的 params，因此加入 controller 的 permit 即可。

```ruby
params.require(:person).permit(:name, address_attributes: [:id, :kind, :street, :_destroy])
```





## 參考來源
[https://guides.rubyonrails.org/form_helpers.html#nested-forms](https://guides.rubyonrails.org/form_helpers.html#nested-forms)
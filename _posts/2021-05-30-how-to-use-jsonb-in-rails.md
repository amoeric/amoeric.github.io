---
layout: post
title: "如何在 rails 中使用 jsonb 格式？"
author: amoeric
image: assets/images/1.jpg
date: 2021-05-30 11:00 +0800
tags: [rails, jsonb, postgresql]
toc: true
---
在設計專案 DB 時，時常遇到像是地址這種一大層裡面包了多層小層的資料，如果設計 DB 時可以用大層的設計去避免掉多開很多無謂欄位是不是很好呢？



#### 例如：

```
地址： { 縣市：xxx , 鄉鎮： xxx, 區域： xxx, 街道： xx路xx號 }
```



而在 `PostgreSQL 9.4` 後就引進了 `jsonb` 這個新的欄位種類實現以上的狀況。



###  Json 與  Jsonb 有什麼差異呢？

由下方連結文章的結論來說，Jsonb 因為儲存方式不同的關係，會稍微比 Json 來得慢一點。

[Using PostgreSQL and jsonb with Ruby on Rails](https://nandovieira.com/using-postgresql-and-jsonb-with-ruby-on-rails)

-----

### 那麼，在 Rails 中如何使用呢？

-----

#### Migration
在這裡要注意要把欄位設定成 `jsonb` 屬性，並給它 `index` `gin`，在[postgresql文件中有提到](https://docs.postgresql.tw/the-sql-language/index/index-types)
<blockquote>
GIN 索引是「反向索引」，適用於包含多個值的組合的資料值，例如陣列。反向索引包含每個組合值的單獨項目，並且可以有效地處理測試特定組合值是否存在的查詢。</blockquote>

  
{% highlight ruby %}
#some_migration
  def change
    change_table :posts, bulk: true do |t|
      t.jsonb :address, null: false, default: {}
      t.index :address, using: :gin
    end
  end
{% endhighlight ruby %}



#### Model

只要用 `Rails` 的 `Store` 功能 accessors 你要的 `key` 就好了

{% highlight ruby %}
  store :address, accessors: [:town, :city]
{% endhighlight ruby %}



#### Form

在表單中只需要輸入對應的 `accessors key`就可以了  

{% highlight ruby %}
  <%= f.collection_radio_buttons :city, ['高雄', '台北'] %>
  <%= f.collection_radio_buttons :town, ['鳳山區', '前鎮區'] %>
{% endhighlight ruby %}



#### Controller

這邊也跟平常一樣，不需要設定

{% highlight ruby %}
  params.require(:post).permit(:city, :town)
{% endhighlight ruby %}



#### 儲存後的呈現會像是  
  
在 console 叫出 address 欄位  
  
{% highlight ruby %}
  address: {"city"=>"高雄", "town"=>"鳳山區"}
{% endhighlight ruby %}



### 結論

使用 `jsonb` 加上 `rails store` combo 讓效率大大提升，像這類型的欄位未來如果要修改也不用再新增 migration 來新增或者修改了！

可喜可賀～




------------------------------------

### 參考文章

* #### jsonb

  * [Using PostgreSQL and jsonb with Ruby on Rails](https://nandovieira.com/using-postgresql-and-jsonb-with-ruby-on-rails)
  * [https://melvinchng.github.io/](https://melvinchng.github.io/rails/RailsJSONB.html#42-add-a-jsonb-column-to-existing-table)

* #### Gin index

  * [postgresql.org](https://www.postgresql.org/docs/9.5/gin-intro.html)

* #### Store 設定

  * [Rails 實戰聖經](https://ihower.tw/rails/activerecord-others.html)
  * [Ruby On Rails api](https://api.rubyonrails.org/classes/ActiveRecord/Store.html)


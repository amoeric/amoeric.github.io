---
layout: single
title: rails 8 solid_cache 安裝紀錄
date: 2025-08-23 16:00 +0800
tags: [rails, rails 8, solid_cache]
toc: true
---

在 rails 8 預設使用 [solid_cache](https://github.com/rails/solid_cache) Gem 來處理 cache 的儲存(rails 7.1 以上則是選用)，這篇文章紀錄安裝 `solid_cache` 的完整過程。

以下介紹來自 [solid_cache](https://github.com/rails/solid_cache) README
> Solid Cache 是一個基於資料庫的 Active Support 快取存儲，它讓您能夠保持比傳統純記憶體 Redis 或 Memcached 存儲通常可能達到的更大的快取。這要歸功於現代 SSD 驅動器的速度，對於大多數快取用途來說，使用磁碟而非 RAM 的存取時間損失變得微不足道。簡單來說，您現在通常最好在磁碟上保持一個巨大的快取，而不是在記憶體中保持一個小的快取。

## 安裝方式

1. 把 solid_cache 加到 Gemfile
```ruby
gem "solid_cache"
```
2. bin/rails solid_cache:install

這指令會做以下修正
  - 建立 config/cache.yml
  - 建立 db/cache_schema.rb
  - 修改 config/environments/production.rb

![截圖 2025-08-22 上午8.42.58](https://hackmd.io/_uploads/HkO7a4BFxx.png)

以下是實際產生出來的檔案

### config/cache.yml

```yml
default: &default
  store_options:
    # Cap age of oldest cache entry to fulfill retention policies
    # max_age: <%= 60.days.to_i %>
    max_size: <%= 256.megabytes %>
    namespace: <%= Rails.env %>

development:
  <<: *default

test:
  <<: *default

production:
  database: cache
  <<: *default

```

### db/cache_schema.rb

注意：註解的資訊提醒我們不用建立任何 migration，rails 會自動讀取這檔案去建立對應的 table。
> 一開始還建立對應的 migration 讓 DB 有對應的內容，後來 db:migrate 的時候出現 already exists 的字樣才意識到不用這麼做。

```ruby
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_08_21_064403) do
  create_table "solid_cache_entries", force: :cascade do |t|
    t.binary "key", null: false
    t.binary "value", null: false
    t.datetime "created_at", null: false
    t.bigint "key_hash", null: false
    t.integer "byte_size", null: false
    t.index ["byte_size"], name: "index_solid_cache_entries_on_byte_size"
    t.index ["key_hash", "byte_size"], name: "index_solid_cache_entries_on_key_hash_and_byte_size"
    t.index ["key_hash"], name: "index_solid_cache_entries_on_key_hash", unique: true
  end
end

```


## 設定

安裝步驟執行完後，只需要在 database.yml 中設定對應的 config 即可 (這邊以 sqlite3 為例)

```yml
production:
  primary:
    <<: *default
    database: my_test_repo
    port: 5432
  cache:
    <<: *sqlite
    database: solid/my_test_repo.sqlite3
    migrations_paths: db/cache_migrate
```


**注意：這裡的 migrations_paths 不要做修改，否則會找不到對應的 schema.rb。**

設定完 config 後，接著執行

```bash
rails db:migrate
```

**執行後會沒有任何 migrate 訊息，這是正常的。**

到這裡 production 已經完成設定，在 production 存 cache 的方式已經改用額外的 db 處理。

> PS: database: solid/my_test_repo.sqlite3 的意思是，會自動在根目錄底下建一個 solid 資料夾去存放 sqlite3 (記得把這目錄加進 .gitignore 避免無效的 commit)

## 要怎麼在開發環境下使用？

如果要在開發環境下使用的話，需要做以下設定：
1. 新增 db/database.yml 設定
2. 調整 config/cache.yml
3. 調整 config/environments/development.rb

### 1. 新增 db/database.yml 設定
```yml
development:
  primary:
    <<: *default
    database: my_test_development
  cache:
    <<: *sqlite
    database: solid/my_test_development_cache.sqlite3
    migrations_paths: db/cache_migrate
```

設定完後記得跑

```bash
rails db:migrate
```

### 2. 調整 config/cache.yml

development 加上 database: cache 即可 (這裡的 cache 會對應到 database.yml 的 cache)

```yml

default: &default
  store_options:
    # Cap age of oldest cache entry to fulfill retention policies
    # max_age: <%= 60.days.to_i %>
    max_size: <%= 256.megabytes %>
    namespace: <%= Rails.env %>

development:
  database: cache
  <<: *default

test:
  <<: *default

production:
  database: cache
  <<: *default
```

### 3. 調整 config/environments/development.rb

```ruby
# config/environments/development.rb
# 把原本的 :memory_store 改為 :solid_cache_store
# config.cache_store = :memory_store, { size: 64.megabytes }
config.cache_store = :solid_cache_store
```

到這裡已經完成所有設定，記得重啟 rails server。

可以翻 log 看看，你會發現在用到 cache 的地方會有 SolidCache 相關的 log。

![截圖 2025-08-22 上午9.18.42](https://hackmd.io/_uploads/SyNIdrStxl.png)


## 參考文件

- [https://github.com/rails/solid_cache](https://github.com/rails/solid_cache)
- [https://www.youtube.com/watch?v=mA6somzKYEg](https://www.youtube.com/watch?v=mA6somzKYEg)
- [https://blog.csdn.net/gitblog_00399/article/details/144451352](https://blog.csdn.net/gitblog_00399/article/details/144451352)
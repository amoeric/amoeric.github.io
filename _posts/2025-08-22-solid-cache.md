---
layout: single
title: "Rails 8 Solid Cache 安裝與設定完整指南"
date: 2025-08-23 16:00 +0800
tags: [rails, rails-8, solid-cache, caching, database]
toc: true
---

## 概述

在 Rails 8 中，預設使用 [Solid Cache](https://github.com/rails/solid_cache) Gem 來處理快取儲存（Rails 7.1 以上則是選用）。這篇文章記錄安裝和設定 `solid_cache` 的完整過程。

## 什麼是 Solid Cache？

以下介紹來自 [Solid Cache](https://github.com/rails/solid_cache) README：

> Solid Cache 是一個基於資料庫的 Active Support 快取存儲，它讓您能夠保持比傳統純記憶體 Redis 或 Memcached 存儲通常可能達到的更大的快取。這要歸功於現代 SSD 驅動器的速度，對於大多數快取用途來說，使用磁碟而非 RAM 的存取時間損失變得微不足道。簡單來說，您現在通常最好在磁碟上保持一個巨大的快取，而不是在記憶體中保持一個小的快取。

## 安裝方式

### 1. 添加 Gem 到 Gemfile

```ruby
gem "solid_cache"
```

### 2. 執行安裝指令

```bash
bin/rails solid_cache:install
```

這個指令會自動執行以下操作：
- 建立 `config/cache.yml`
- 建立 `db/cache_schema.rb`
- 修改 `config/environments/production.rb`

<img src="/assets/images/solid_cache/1.png" alt="solid_cache_install">

## 安裝後產生的檔案

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

**重要提醒**：註解中的資訊提醒我們不需要建立任何 migration，Rails 會自動讀取這個檔案來建立對應的 table。

> 一開始還建立對應的 migration 讓 DB 有對應的內容，後來 `db:migrate` 的時候出現 "already exists" 的字樣才意識到不用這麼做。

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

## 生產環境設定

安裝步驟執行完後，只需要在 `database.yml` 中設定對應的 config 即可（這邊以 SQLite3 為例）：

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

**重要提醒**：這裡的 `migrations_paths` 不要做修改，否則會找不到對應的 `schema.rb`。

設定完 config 後，接著執行：

```bash
rails db:migrate
```

**執行後會沒有任何 migrate 訊息，這是正常的。**

到這裡 production 已經完成設定，在 production 存快取的方式已經改用額外的資料庫處理。

> **注意**：`database: solid/my_test_repo.sqlite3` 的意思是，會自動在根目錄底下建立一個 `solid` 資料夾去存放 SQLite3 檔案（記得把這目錄加進 `.gitignore` 避免無效的 commit）。

## 開發環境設定

如果要在開發環境下使用 Solid Cache，需要做以下設定：

1. 新增 `db/database.yml` 設定
2. 調整 `config/cache.yml`
3. 調整 `config/environments/development.rb`

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

設定完後記得執行：

```bash
rails db:migrate
```

### 2. 調整 config/cache.yml

development 加上 `database: cache` 即可（這裡的 `cache` 會對應到 `database.yml` 的 `cache`）：

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

## 完成設定

到這裡已經完成所有設定，記得重啟 Rails server。

可以查看 log 來確認設定是否成功，你會發現在用到快取的地方會有 SolidCache 相關的 log：

<img src="/assets/images/solid_cache/2.png" alt="solid_cache_log">

## 總結

Solid Cache 為 Rails 8 提供了一個基於資料庫的高效能快取解決方案。透過適當的設定，您可以在開發和生產環境中享受其帶來的優勢：

- 更大的快取容量
- 基於 SSD 的高效能
- 與 Rails 生態系統的完美整合
- 簡化的部署和維護

## 參考文件

- [Solid Cache GitHub Repository](https://github.com/rails/solid_cache)
- [Rails 8 Solid Cache 介紹影片](https://www.youtube.com/watch?v=mA6somzKYEg)
- [Solid Cache 使用指南](https://blog.csdn.net/gitblog_00399/article/details/144451352)
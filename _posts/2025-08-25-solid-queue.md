---
layout: post
title: "Rails 8 Solid Queue 安裝與設定完整指南"
author: amoeric
image: assets/images/solid_queue/1.png
date: 2025-08-25 10:00 +0800
tags: [rails, rails-8, solid-queue, background-jobs, active-job]
toc: true
---
## 概述

Rails 8 已經將 `solid_queue` 移進預設使用的 Gem，這篇文章記錄 `solid_queue` 的完整安裝流程和設定方法。

## 什麼是 Solid Queue？

以下介紹來自 [Solid Queue README](https://github.com/rails/solid_queue?tab=readme-ov-file#solid-queue)：

> Solid Queue 是一個基於資料庫的 Active Job 佇列後端，設計理念注重簡潔性和效能。
> 
> 除了常規的工作入隊和處理外，Solid Queue 還支援延遲工作、並發控制、重複性工作、暫停佇列、每項工作的數值優先級、按佇列順序的優先級，以及批量入隊（Active Job 的 `perform_all_later` 的 `enqueue_all`）。
> 
> Solid Queue 可以與 MySQL、PostgreSQL 或 SQLite 等 SQL 資料庫一起使用，並且如果可用的話，它會利用 `FOR UPDATE SKIP LOCKED` 子句來避免在輪詢工作時阻塞和等待鎖定。它依賴 Active Job 來處理重試、丟棄、錯誤處理、序列化和延遲，並且與 Ruby on Rails 的多執行緒相容。

## Solid Queue 安裝

### 1. 安裝 Solid Queue Gem

```ruby
# Gemfile
gem 'solid_queue'
```

記得執行 `bundle install`。

### 2. 執行安裝指令

```bash
bin/rails solid_queue:install
```

這個指令會產生以下檔案：

<img src="/assets/images/solid_queue/1.png" alt="solid_queue_install">

## 安裝後產生的檔案

### 1. config/queue.yml

如果不需要對 job 做額外的限制的話，這個檔案不需要修正。

```yml
default: &default
  dispatchers:
    - polling_interval: 1
      batch_size: 500
  workers:
    - queues: "*"
      threads: 3
      processes: <%= ENV.fetch("JOB_CONCURRENCY", 1) %>
      polling_interval: 0.1

development:
  <<: *default

test:
  <<: *default

production:
  <<: *default
```

### 2. config/recurring.yml

在這個設定檔可以排程 job 要執行的時間，並且設定優先度、args 等。

```yml
# examples:
#   periodic_cleanup:
#     class: CleanSoftDeletedRecordsJob
#     queue: background
#     args: [ 1000, { batch_size: 500 } ]
#     schedule: every hour
#   periodic_cleanup_with_command:
#     command: "SoftDeletedRecord.due.delete_all"
#     priority: 2
#     schedule: at 5am every day
```

### 3. db/queue_schema.rb

Rails 會自動抓取這個 schema 內容去建立對應的 table。

```ruby
ActiveRecord::Schema[7.1].define(version: 1) do
  create_table "solid_queue_blocked_executions", force: :cascade do |t|
    t.bigint "job_id", null: false
    t.string "queue_name", null: false
    t.integer "priority", default: 0, null: false
    t.string "concurrency_key", null: false
    t.datetime "expires_at", null: false
    t.datetime "created_at", null: false
    t.index [ "concurrency_key", "priority", "job_id" ], name: "index_solid_queue_blocked_executions_for_release"
    t.index [ "expires_at", "concurrency_key" ], name: "index_solid_queue_blocked_executions_for_maintenance"
    t.index [ "job_id" ], name: "index_solid_queue_blocked_executions_on_job_id", unique: true
  end
  #....略
end
```

### 4. bin/jobs

可以看到這個檔案會去執行 `SolidQueue::Cli`：

```bash
#!/usr/bin/env ruby

require_relative "../config/environment"
require "solid_queue/cli"

SolidQueue::Cli.start(ARGV)
```

### 5. config/environments/production.rb

可以看到多了兩行 solid_queue 設定：

**重要提醒**：`writing: :queue` 對應的是 `database.yml` 裡面的 `queue` 設定。

```ruby
  # Use a real queuing backend for Active Job (and separate queues per environment).
  config.active_job.queue_adapter = :solid_queue
  config.solid_queue.connects_to = { database: { writing: :queue } }
```

## 基本設定

跑完安裝流程後，還需要一點額外的設定才能正常使用。

### 1. 設定 database.yml

需要設定 `queue` connection：

```yml
# database.yml

production:
  primary:
    <<: *default
    database: my_test_production
  queue:
    <<: *sqlite
    database: solid/my_test_production_queue.sqlite3
    migrations_paths: db/queue_migrate
```

**重要提醒**：`migrations_paths` 直接複製就可以了，不需要修改。

### 2. 加入 Procfile.dev

記得把 `bin/jobs` 加進 `Procfile.dev`，讓 `./bin/dev` 執行的時候可以跑 solid_queue：

```yml
# Procfile.dev
web: bin/rails server
css: bin/rails tailwindcss:watch
job: bin/jobs
```

記得把要執行的 job 加到 `config/recurring.yml`。

## 開發環境設定

如果要在開發環境下使用 Solid Queue，需要做以下設定：

- 新增 `db/database.yml` 設定
- 調整 `config/environments/development.rb`

### 新增 db/database.yml 設定

一樣需要在 development 加上 `queue` connection。設定完後記得跑 `rails db:migrate`，讓 Rails 建立對應的 table。（migrate 跑完沒有出現任何訊息是正常的）

```yml
# database.yml

development:
  primary:
    <<: *default
    database: my_test_development
  queue:
    <<: *sqlite
    database: solid/my_test_development_queue.sqlite3
    migrations_paths: db/queue_migrate
```

### 調整 config/environments/development.rb

把 `config/environments/production.rb` 的變更加進 `config/environments/development.rb`：

```ruby
  config.active_job.queue_adapter = :solid_queue
  config.solid_queue.connects_to = { database: { writing: :queue } }
```

設定完後執行 `./bin/dev` 就完成了。如果要單獨看 job 的 log 可以開三個視窗分別執行：

- `bin/rails server`
- `bin/rails tailwindcss:watch`
- `bin/jobs`

看到 `bin/jobs` 執行後沒有任何結果是正常的：

<img src="/assets/images/solid_queue/2.png" alt="solid_queue_job_log">

## Bonus：Job 管理頁面

在使用 solid_queue 以前，如果要在 background 執行 job 的話大多都是用 [Sidekiq](https://github.com/sidekiq/sidekiq) 這個 Gem。

Sidekiq 很貼心的會有額外的頁面可以去看 job 執行或失敗，方便開發人員查看執行的狀況：

<img src="/assets/images/solid_queue/3.png" alt="sidekiq_page">

改用 solid_queue 後，如果要有類似額外頁面的話會需要安裝 [Mission Control Jobs](https://github.com/rails/mission_control-jobs) 這個 Gem。

實際上的頁面如下：

<img src="/assets/images/solid_queue/4.png" alt="mission_control">

### 安裝 Mission Control Jobs

#### 1. 在 Gemfile 裡面加上 & bundle install

```ruby
gem "mission_control-jobs"
```

#### 2. 新增相關頁面路由

```ruby
# routes.rb
Rails.application.routes.draw do
  mount MissionControl::Jobs::Engine, at: "/jobs"
  #...略...
end
```

#### 3. 設定頁面的權限

通常這頁面只會讓特定人員進來查看，所以需要額外的設定去管理。

我的做法是建立額外的 controller 加上 Rails 8 的 Authentication 去做管理。

##### 3-1. 建立 mission_control.rb

```ruby
# config/initializers/mission_control.rb
# frozen_string_literal: true

MissionControl::Jobs.base_controller_class = "MissionControlAuthenticationController"
MissionControl::Jobs.http_basic_auth_enabled = false
```

##### 3-2. 建立 MissionControlAuthenticationController

```ruby
# frozen_string_literal: true

class MissionControlAuthenticationController < ApplicationController
  include Authentication
  include Pundit::Authorization

  before_action :can_access_mission_control!
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def can_access_mission_control!
    authorize :mission_control, :read?
  end

  def user_not_authorized
    flash[:alert] = I18n.t("errors.messages.not_authorized")
    redirect_to root_path
  end

  def current_user
    Current.session&.user
  end
end
```

你也可以使用 [Basic Auth](https://github.com/rails/mission_control-jobs?tab=readme-ov-file#authentication)，這方式不用額外建立 controller：

```ruby
# config/initializers/mission_control.rb
# frozen_string_literal: true

MissionControl::Jobs.http_basic_auth_user = "dev"
MissionControl::Jobs.http_basic_auth_password = "secret"
```

<img src="/assets/images/solid_queue/5.png" alt="basic_auth">

輸入帳密後就可以成功進入：

<img src="/assets/images/solid_queue/6.png" alt="mission_control_page">

## 總結

Solid Queue 為 Rails 8 提供了一個基於資料庫的高效能背景工作處理解決方案。透過適當的設定，您可以在開發和生產環境中享受其帶來的優勢：

- 基於資料庫的可靠佇列系統
- 支援延遲工作、並發控制、重複性工作
- 與 Rails 生態系統的完美整合
- 可選的 Mission Control Jobs 管理介面
- 簡化的部署和維護

## 參考文章

- [Solid Queue GitHub Repository](https://github.com/rails/solid_queue?tab=readme-ov-file#solid-queue)
- [Rails 8 Solid Queue 介紹影片](https://www.youtube.com/watch?v=ReyKfb12EVU)
- [Solid Queue Issue #357](https://github.com/rails/solid_queue/issues/357)
- [Mission Control Jobs Authentication](https://github.com/rails/mission_control-jobs?tab=readme-ov-file#authentication)

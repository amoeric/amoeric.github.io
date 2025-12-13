---
layout: single
title:  "Send error notice to slack"
date:   2019-10-03 1500 +0800
tags: [rails, slack]
---

做專案時難免會遇到錯誤
那麼要如何收到第一時間的通知呢？  

--- 


### 首先需要兩個gem
1. exception_notification
2. slack-notifier


接著在 initializer 下創一個 rb檔

``` ruby
ExceptionNotification.configure do |config|
  config.ignore_if do |exception, options|
    Rails.env.development?
  end
# Notifiers =================================================================
# Email notifier sends notifications by email.
  # config.add_notifier :email, {
  #   :email_prefix         => "[ERROR] ",
  #   :sender_address       => %{"Notifier" <notifier@example.com>},
  #   :exception_recipients => %w{exceptions@example.com}
  # }
# Campfire notifier sends notifications to your Campfire room. Requires 'tinder' gem.
  # config.add_notifier :campfire, {
  #   :subdomain => 'my_subdomain',
  #   :token => 'my_token',
  #   :room_name => 'my_room'
  # }
# HipChat notifier sends notifications to your HipChat room. Requires 'hipchat' gem.
  # config.add_notifier :hipchat, {
  #   :api_token => 'my_token',
  #   :room_name => 'my_room'
  # }
# Webhook notifier sends notifications over HTTP protocol. Requires 'httparty' gem.
  # config.add_notifier :webhook, {
  #   :url => 'http://example.com:5555/hubot/path',
  #   :http_method => :post
  # }
  config.add_notifier :slack, {
    webhook_url: 要設定的url,
    ignore_crawlers: %w{Googlebot bingbot},
    username: "我的專案",
    additional_parameters: {
      mrkdwn: true
    }
  }
end

```

上面的 rb 檔要設定的總共有兩個：
### 1.取得 webhook_url  
取得的方式首先到 slack 上的 administration 裡面的 manage apps
接著搜尋 Incoming WebHooks 並新增

<img src="/assets/images/slack/webhook_url.png" alt="webhook_url">

也可以在 Post to Channel 設定你要在哪個頻道接到錯誤訊息哦！

### 2.設定 username
基本上隨便打沒關係，差別只在於到時候是誰密你。  
為求方便也可以設定那個誰（專案）發送給你的名稱，
接下來在 environments 下決定哪個環境要發送。

``` ruby
#production.rb
#加上
  config.middleware.use ExceptionNotification::Rack
  #最後步驟
  #接下來在會發生錯誤的地方用
  #用這行去設定目標url
  notifier = Slack::Notifier.new ENV["slack_webhook_url_error"]
  begin   
    "你的code"
  rescue ArgumentError => error
    #之後再去
    notifier.ping error
  end
```

--- 

## 完成

<img src="/assets/images/slack/finish.png" alt="finish">
---
layout: single
title:  "用 capistrano 部署 sidekiq 6"
date:   2020-10-27 2230 +0800
tags: [capistrano, sidekiq]
comments: true
---


如何在deploy時讓sidekiq在背景時執行呢？
原本打算用這個 gem [capistrano-sidekiq](https://github.com/seuros/capistrano-sidekiq) 處理  
  
但是發現 deploy 時會出現  
`sidekiq stderr: invalid option: --index`
  
爬文後發現這個 gem 已經不支援 sidekiq 6 了!  

----

這樣的話解決方法有兩種  
1. 改回 sidekiq 6 以下版本
2. 自己在 ubuntu systemd 下寫個 service
  
第一種方法治標不治本，專案遲早會面臨到不得不升級的狀況  
  
以下採用方法二的方式解決問題 [service code 參考這裡](https://pastebin.com/GFnhS7YV)
  

# 步驟一：建立 sidekiq.service
`在 /lib/systemd/system，底下創建 sidekiq.service`
{% highlight ruby %}
# Customize this file based on your bundler location, app directory, etc.
# Put this in /usr/lib/systemd/system (CentOS) or /lib/systemd/system (Ubuntu).
# Run:
#   - systemctl enable sidekiq
#   - systemctl {start,stop,restart} sidekiq
#
# This file corresponds to a single Sidekiq process.  Add multiple copies
# to run multiple processes (sidekiq-1, sidekiq-2, etc).
#
# See Inspeqtor's Systemd wiki page for more detail about Systemd:
# https://github.com/mperham/inspeqtor/wiki/Systemd
#
[Unit]
Description=legacy-sidekiq-staging
After=syslog.target network.target

[Service]
Type=simple
WorkingDirectory=/home/deploy/your_project_name/current
ExecStart=/bin/bash -lc 'bundle exec sidekiq -e staging -C config/sidekiq.yml'
User=deploy
Group=deploy
UMask=0002

# if we crash, restart
RestartSec=1
#Restart=on-failure
Restart=always

# output goes to /var/log/syslog
#StandardOutput=syslog
#StandardError=syslog

# This will default to "bundler" if we don't specify it
SyslogIdentifier=sidekiq

[Install]
WantedBy=multi-user.target
{% endhighlight ruby %}




# 步驟二：寫 sidekiq:restart
{% highlight ruby %}
namespace :sidekiq do
  task :quiet do
    on roles(:app) do
      puts capture("pgrep -f 'sidekiq' | xargs kill -TSTP") 
    end
  end
  task :restart do
    on roles(:app) do
      execute :sudo, :systemctl, :restart, :sidekiq
    end
  end
end

after 'deploy:starting', 'sidekiq:quiet'
after 'deploy:reverted', 'sidekiq:restart'
after 'deploy:published', 'sidekiq:restart'
{% endhighlight ruby %}
  
在 execute :sudo, :systemctl, :restart, :sidekiq 的時候就會執行到 sidekiq.service 了！  
  
接著如果你的 deploy 使用者使用 sudo 需要密碼的話應該會遇到 `sudo: no tty present and no askpass program specified` 的問題  
<img src="/assets/images/sidekiq/sidekiq_visudo.png" alt="sidekiq_visudo">

[解決方法參考文章](https://stackoverflow.com/questions/21659637/how-to-fix-sudo-no-tty-present-and-no-askpass-program-specified-error?fbclid=IwAR3Lg9VNjJBwCG0lQmY43NfFmUycADoOFJs8cUKw0dCQltk0y1F5E3Nn9eg)  
解法為：  
先在主機上打 `sudo visudo`  
進入後在空白處加上 `%username ALL=NOPASSWD:/bin/systemctl restart sidekiq` 儲存後離開即可
  
  
接著在主機上確認看看  `sudo service sidekiq status`  
  
<img src="/assets/images/sidekiq/sidekiq_status.png" alt="sidekiq_status">

成功！
  
# 總結
爬了很久才找到解法，絕大多數的做法都在 `sidekiq:restart` 的時候使用 `bundle exec sidekiq -e staging -C config/sidekiq.yml -d`  
但是這方法會讓我在 deploy 時卡在 sidekiq 畫面，無法成功部署....不知道是不是版本問題？











[本篇文章參考<-](http://ilab.me/howto/run-sidekiq-6-using-systemd/)

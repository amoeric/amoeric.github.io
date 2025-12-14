---
layout: post
title: "用 monit 監控 sidekiq 是否正常運作"
author: amoeric
image: assets/images/monit/monit_in_monitrc.png
date: 2020-10-28 1500 +0800
tags: [sidekiq, monit]
comments: true
---
由於 `sidekiq` 不是可靠的 `process`，有時候會自己掛掉，所以需要額外安裝監控程式去防止 `sidekiq` 掛掉。所以決定使用 `monit` 來監控 `sidekiq` 是否正常運行，本文紀錄 `monit` 安裝過程遇到的狀況與排除。

---

# 安裝 monit

在 `ubuntu` 主機上執行  
### 1. `sudo apt-get install monit`  
### 2. 建立 `sidekiq.conf`
安裝完成後到 `/etc/monit/conf.d` 底下建立 `sidekiq.conf`， 內容如下  
{% highlight ruby %}
#把 your_project 換成專案名稱即可
 check process sidekiq_your_project_staging0
   with pidfile "/home/deploy/your_project/shared/tmp/pids/sidekiq.pid"
   start program = "/bin/su - deploy -c 'cd /home/deploy/your_project/current && /usr/bin/env bundle exec sidekiq   --index 0 --pidfile /home/deploy/your_project/shared/tmp/pids/sidekiq.pid --environment staging  --logfile /home/deploy/your_project/shared/log/sidekiq.log  -d'" with timeout 30 seconds

   stop program = "/bin/su - deploy -c 'cd /home/deploy/your_project/current && /usr/bin/env bundle exec sidekiqctl stop /home/deploy/your_project/shared/tmp/pids/sidekiq.pid'" with timeout 20 seconds
   group your_project-sidekiq
{% endhighlight ruby %}
### 3. sudo vim /etc/monit/monitrc
編輯 `/etc/monit` 底下的 `monitrc` 檔案，把 http 以下四行註解取消，如下圖  
<img src="/assets/images/monit/monit_in_monitrc.png" alt="monit_in_monitrc">

### 4. sudo service monit restart 重啟服務
### 5. sudo monit status 就可以看到成功畫面
<img src="/assets/images/monit/monit_status.png" alt="monit_status">

# 沒有sidekiq.pid?
[參考文章](https://www.thinbug.com/q/12143350)  
如果你跟我一樣在專案裡面 `tmp/pids` 底下沒有 `sidekiq.pid` 的話，那就自己建一個吧！  
 `pid` 檔只有一行數字，其數字是該服務執行下的 `pid` 位置  
 那如何查 `pid` 位置呢？  
 像如果要找 `sidekiq` 的話指令可以輸入 `ps -aux | grep sidekiq`  

<img src="/assets/images/sidekiq/sidekiq_pid_local.png" alt="sidekiq_pid_local">
  
在紅線處就是 `pid` 位置了，把 `sidekiq.pid` 檔更新後就完成了  
不過這方法缺點就是每次 `deploy` 後 `sidekiq.pid` 就會跑掉，目前還在尋找更好的作法就是了。




---
layout: post
title: "在 Ubuntu 上安裝 Elasticsearch"
author: amoeric
image: assets/images/elasticsearch-install/java-version.png
date: 2020-10-13 19:23 +0800
tags: [elasticsearch]
comments: true
---
最近要在新主機上安裝 elasticsearch，但是由於運行中專案主機上面版本是 6.8.8 ， 發文前版本已經更新到 7.9.2 了！  
至於要怎麼安裝以前的版本這部分，摸索了好久才搞定，在此紀錄安裝過程。


# 安裝 java
由於在安裝 elasticsearch 前需要先安裝 java，而不同版本所需要的 java 有所不同，6.8 版本只需要安裝 Java8 就可以了。  
  
有需求的可以點這裡查看[官網支援版本][java-sup]  
  
這裡選擇安裝 OpenJDK 8

{% highlight ruby %}
sudo apt install openjdk-8-jdk
{% endhighlight ruby %}
  
安裝後打下面指令確認 java 版本
{% highlight ruby %}
java -version
{% endhighlight ruby %}

看到這訊息就表示安裝成功了
<img src="/assets/images/elasticsearch-install/java-version.png" alt="java-version">
  
安裝好 java 後，下一步就是安裝 elasticsearch

# 安裝 elasticsearch

* 步驟一：下載和安裝公鑰  
  
{% highlight ruby %}
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
{% endhighlight ruby %}  
  
沒意外的話視窗會顯示 `OK`
  
* 步驟二：

更新 apt 、 安裝 apt-transport-https  
  
{% highlight ruby %}
sudo apt update
sudo apt install apt-transport-https
{% endhighlight ruby %} 

* 步驟三：
  
將儲存庫定義保存到 `/etc/apt/sources.list.d/elastic-6.x.list`  
  
{% highlight ruby %}
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list
{% endhighlight ruby %} 

**這裡的6.x是版本號的意思，如果要安裝特定版本可以修改，例如要安裝7的版本可以改成 7.x**  
  
* 步驟四：
  
更新 apt 並安裝 elasticsearch  
{% highlight ruby %}
sudo apt update
sudo apt install elasticsearch
{% endhighlight ruby %} 
   

跑完後就安裝成功了！不過安裝完成後並不會自動執行，還需要  
{% highlight ruby %}
sudo systemctl enable elasticsearch.service
sudo systemctl start elasticsearch.service
{% endhighlight ruby %} 
  
# 確認是否執行

可以透過以下方式確認 elasticsearch 有沒有在執行  

{% highlight ruby %}
curl -X GET "localhost:9200/"
{% endhighlight ruby %} 
  
應該會看到下面畫面
  
<img src="/assets/images/elasticsearch-install/elastic-version2.png" alt="elastic-version2">
  
又或者
{% highlight ruby %}
sudo service elasticsearch status
{% endhighlight ruby %} 

<img src="/assets/images/elasticsearch-install/elastic-status.png" alt="elastic-status">

**如果出錯的話也可以透過這指令查詢**

分享一下安裝錯 java 後產生的錯誤視窗
<img src="/assets/images/elasticsearch-install/elastic-error.png" alt="elastic-error">

# 查看版本

那安裝成功後怎麼看 elasticsearch 版本呢？在這邊提供兩個方法


* 方法一

{% highlight ruby %}
curl -X GET "localhost:9200/"
{% endhighlight ruby %} 

<img src="/assets/images/elasticsearch-install/elastic-version2.png" alt="elastic-version2">

這裡的 `version number` 就是版本號了

* 方法二

由於方法一僅限於在安裝成功後才能確認，方法二安裝失敗也可以用哦！

{% highlight ruby %}
cd /usr/share/elasticsearch
sudo ./bin/elasticsearch --version
{% endhighlight ruby %} 

<img src="/assets/images/elasticsearch-install/elastic-version1.png" alt="elastic-version1">

# 結論

爬了很多文章後整理在這裡，希望有相關需求的人能夠少繞點路。如果不幸出錯的話建議砍掉重裝(目前遇過兩次都是 java 問題)，下面有連結可以移除相關程式，如果想要看 log 排除狀況的話可以到 `/var/log/elasticsearch/elasticsearch.log` 查看哦！


## 參考文章
* [官網教學](https://www.elastic.co/guide/en/elasticsearch/reference/6.8/deb.html)  
* [如何在Ubuntu 18.04上安装Elasticsearch](https://www.myfreax.com/how-to-install-elasticsearch-on-ubuntu-18-04/)  


## 刪除相關程式
* [刪除 java](https://askubuntu.com/questions/84483/how-to-completely-uninstall-java)  
* [刪除 elasticsearch](https://howtoinstall.co/en/ubuntu/xenial/elasticsearch?action=remove)  
* [刪除 apt-get update clear update](https://unix.stackexchange.com/questions/217369/clear-apt-get-list)




[java-sup]: https://www.elastic.co/support/matrix#matrix_jvm
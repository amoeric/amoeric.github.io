---
layout: single
title:  "在rails 6安裝font-awesome"
date:   2020-09-08 22:00 +0800
tags: [rails, font-awesome]
comments: true
---

參考至 [此篇教學][installfont-awesome]，額外透過此篇文章紀錄安裝方法。  
{: .message }

1.首先透過 `yarn` 安裝
{% highlight ruby %}
yarn add @fortawesome/fontawesome-free
{% endhighlight %}

2.再匯入 `application.scss`（也可以另外建立`font-awesome.scss`再額外`import`）
{% highlight ruby %}
#application.scss
$fa-font-path: '@fortawesome/fontawesome-free/webfonts';
@import '@fortawesome/fontawesome-free/scss/fontawesome';
@import '@fortawesome/fontawesome-free/scss/solid';
@import '@fortawesome/fontawesome-free/scss/regular';
@import '@fortawesome/fontawesome-free/scss/brands';
@import '@fortawesome/fontawesome-free/scss/v4-shims';
{% endhighlight %}

3.再修改 `application.js`
{% highlight ruby %}
import "@fortawesome/fontawesome-free/js/all";
{% endhighlight %}
4.搞定

{% highlight ruby %}
<i class="fab fa-bootstrap"></i>
{% endhighlight %}


[installfont-awesome]: https://medium.com/@kelishrestha97/how-to-install-font-awesome-with-yarn-in-rails-6-0-c2506543c13d
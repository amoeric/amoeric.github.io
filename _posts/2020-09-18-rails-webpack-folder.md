---
layout: post
title: "如何在 rails 6 中使用 webpack"
author: amoeric
image: assets/images/1.jpg
date: 2020-09-08 22:00 +0800
tags: [rails, webpack]
comments: true
---
本人對 webpack 接觸機會不多，之前也只有在寫活動專案才會用 rails 5 的版本下安裝 webpack (拿來用 Vue)，然而 rails 6 開始就把 webpack 當作預設工具，讓效能更加提升。  

本文將會介紹 webpack 是什麼、為什麼要用、rails 中如何使用 webpack

# webpack 是什麼？
> Webpack 是一個開源的前端打包工具。Webpack 提供了前端開發缺乏的模組化開發方式，將各種靜態資源視為模組，並從它生成最佳化過的程式碼。 <- from wiki
  
# 為什麼需要用 webpack?
因為 webpack 有以下優點可以使專案速度更加提升
* 將任何類型的檔案通通打包給 js，讓 ruby 負擔更少。
* 包含任何類型的檔案到 JavaScript
  * ES6、SCSS、CSS、Images、JSON、Coffeescript、LESS...等
* 將以上的東西通通打包，轉換成瀏覽器看得懂的語言。


# 了解了 Webpack 優點後，接著實際在 rails 中使用
# 1.新增 rails 6 專案
{% highlight ruby %}
 rails new trbweb 
{% endhighlight ruby %}
你會發現在 `console` 裡面多了個 `yarn` 這個東西在幫我們安裝套件，而相關的檔案會放在 `node_modules` 這個資料夾。 專案裡面該裝什麼東西都寫在 `package.json` ，然而專案是不會把 `node_modules` 這個資料夾 `commit` 上去的，而是會去看 `package.json` 來安裝對應的套件。

安裝好後，看 `application.html.erb` 會發現
{% highlight ruby %}
<%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
{% endhighlight ruby %}
已經被換成
{% highlight ruby %}
<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
{% endhighlight ruby %}

正式宣告 `js` 的部分由 `webpack` 處理。

# 2.安裝 `foreman`

要邊跑 `rails` 邊執行 `webpack` 還需要再安裝 `foreman` 來處理
{% highlight ruby %}
group :development do
  gem 'foreman'
end
{% endhighlight ruby %}
建立 `Profile` 檔案在專案中(與 `Gemfile` 同層)
{% highlight ruby %}
  #Profile
  web: bin/rails server -p 3000
  webpacker: bin/webpack-dev-server
{% endhighlight ruby %}

接著只要把以往啟動的指令從 `rails s` 改成 `foreman start` 就可以囉!

# 3. 讓 Webpack 處理 css
其實 webpack 也可以幫忙處理 `css` 的，只需要底下步驟就可以了。


* ### 首先安裝 bootstrap jquery popper.js
{% highlight javascript %}
yarn add bootstrap jquery popper.js
{% endhighlight javascript %}
* ### 接著把 jquery、popper 設定在 environment.js 中
{% highlight ruby %}
#environment.js
const { environment } = require('@rails/webpacker')

const webpack = require('webpack')
environment.plugins.append('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
  })
)

module.exports = environment
{% endhighlight ruby %}

* ### js、css 分類
首先在 `app/javascript` 下分別建立 `stylesheets`、 `js` 資料夾，建立成功後會跟下面結構一樣。
{% highlight ruby %}
javascript
  -  js
  -  channels
  -  packs
  -  stylesheets
{% endhighlight ruby %}
* ### require  
光是這樣還不夠，還需要在 `packs/application.js` 中， require `stylesheets`、`js` 兩個資料夾

{% highlight ruby %}
require("stylesheets")
require("js")
{% endhighlight ruby %}

* ### `require` 後預設會找資料夾底下的 `index`檔

{% highlight ruby %}
#stylesheets/index.scss
@import "~bootstrap/scss/bootstrap";
#index.html.erb
<div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div>
{% endhighlight ruby %}

如果沒意外就會看到 `bootstrap` 成功套用拉～


* ### 命名  
此時追求完美的你是不是覺得哪邊怪怪的？ 由於 `app/javascript` 已經不是原本的形狀了，是不是改名成 `frontend` 比較合適？
其實是可以的，改名後只需要修改 `webpack.yml` 中的 source_path ， 把 `app/javascript` 換成 `app/frontend` 就可以囉！  
舒服。

# 總結
該選擇 Sprockets 還是 Webpacker ?  
如果專案不大，而且只需要用 `js` 功能，那就可以不用用到 `webpack` 。相反的，如果專案大的話可以試著裝上 `webpacker` ，讓前端的東西都給 `webpack` 處理，如果你手邊有大型專案的話，慢慢的把 `app/assets` 都搬來讓 `webpack` 處理吧！



# 參考文章
* [什麼是webpack][webpack]
* [如何在 Rails 使用 Webpacker][webpacker1]
* [Ruby on Rails 6 with Webpacker and Bootstrap][webpacker2]
* [Webpack 與 Webpacker 在 Rails 的運作方式][webpacker3]












[webpack]: https://medium.com/i-am-mike/%E4%BB%80%E9%BA%BC%E6%98%AFwebpack-%E4%BD%A0%E9%9C%80%E8%A6%81webpack%E5%97%8E-2d8f9658241d

[webpacker1]: https://kaochenlong.com/2019/11/21/webpacker-with-rails-part-1/

[webpacker2]:https://medium.com/@adrian_teh/ruby-on-rails-6-with-webpacker-and-bootstrap-step-by-step-guide-41b52ef4081f

[webpacker3]:https://medium.com/lynn-%E7%9A%84%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98/rails-%E6%96%B0%E6%89%8B%E6%9D%91-webpack-%E8%88%87-webpacker-%E5%9C%A8-rails-%E7%9A%84%E9%81%8B%E4%BD%9C%E6%96%B9%E5%BC%8F-b06cb5a84971
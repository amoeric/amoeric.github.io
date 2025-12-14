---
layout: post
title: "Ruby 新手入門隨手記 何謂 :symbol？"
author: amoeric
image: assets/images/1.jpg
date: 2019-08-12 22:00 +0800
tags: [ruby]
comments: true
---
:posts 還記得第一次用rails的時候被這火星文給震懾住
{: .message }

{% highlight ruby %}
Rails.application.routes.draw do   
  resources :people   #這是什麼意思??? :寫錯位置了吧? 
end
{% endhighlight ruby %}
一問才知道原來是symbol  
那`symbol`是什麼呢？  
在`ruby`裡面什麼東西都是物件  
而`symbol`也只是個有名字的物件  
你可以把它看成不能修改的字串  
`symbol` vs. `string`
其實`symbol`在宣告的時候就已經在記憶體裡面佔有一席之地了！  
然而`string`就像個無業遊民，每次叫他就又在另一個記憶體位址  
{% highlight ruby %}
p "hello".object_id   #47132441787720    
p "hello".object_id   #47132441787480    
p "hello".object_id   #47132441787400     
p :hello.object_id    #1040988    
p :hello.object_id    #1040988    
p :hello.object_id    #1040988
{% endhighlight ruby %}
上面的例子得知 **『在Ruby每個字串都有不一樣的記憶體位置』**  
而:hello就是給hello一個專屬的記憶體位置  
然而你也可以不透過symbol把"hello"存起來  
{% highlight ruby %}
a = "hello"    
p a.object_id  #47367933032220    
p a.object_id  #47367933032220    
p a.object_id  #47367933032220
{% endhighlight ruby %}
會發現其實a透過『位址』去找值  
就只是沒有個物件把它存起來罷了  
ruby的參數是透過『傳址不傳值』這規則去實踐的  
那怎麼用symbol?  
在用之前需要知道symbol有一個特性，那就是不能修改  
{% highlight ruby %}
#你可以     
p :hello.upcase    #:HELLO     
p :HELLO.downcase  #:hello     
p :hello.length    #5     
p :hello[0]        #"h"     
#不能夠     
p :hello[0] = "i"  #這樣會噴錯誤訊息
{% endhighlight ruby %}
`symbol`使用時機？  
因為`symbol`不能修改的特性  
往往會應用在不用去修改的資料上(廢話  
在`hash`的`key`就很常看到`symbol`的出現  
{% highlight ruby %}
my_symbol = { :hello => "symbol", "hello" => "string"} 
p my_symbol[:hello]  # "symbol" 
p my_symbol["hello"] # "string"
{% endhighlight ruby %}
`symbol`與`string`間的轉換  
轉換方法有分為這幾種  
{% highlight ruby %}
#字串轉symbol     
p "name".to_sym   <=常用     
p "name".intern        
#symbol轉字串     
p :name.to_s      <=常用     
p :name.id2name
{% endhighlight ruby %}
# 範圍技轉symbol
在ruby有個指令叫冰凍字串
{% highlight ruby %}
#frozen_string_literal: true #沒錯，連#也要給他打下去     
s = "abc"     
s[0] = "x"     #會出錯     
p s
{% endhighlight ruby %}
#frozen_string_literal: true
可以把整個程式碼都冰凍住，不得修改
讓程式可以跑快一點 (現在的我也感覺不出來快多少 XD
有範圍技當然就有指定技囉！
{% highlight ruby %}
s = "abc".freeze  #.freeze就把字串凍住了！     
s[0] = "x"     
p s
{% endhighlight ruby %}
# 總整理
symbol : 效能較佳 不能修改內容 轉字串用.to_s
string : 效能較差 可以修改內容 轉符號用.to_sym
效能有沒有差異大概也要寫到很大一包才有感覺吧？！
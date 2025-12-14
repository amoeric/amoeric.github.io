---
layout: post
title: "在 jekyll 上使用 disqus"
author: amoeric
image: assets/images/2.jpg
date: 2020-08-18 22:33:00 +0800
tags: [jekyll, disqus]
comments: true
---
# disqus 介紹
 是一個可以讓網頁快速產生留言功能的服務，透過簡單的埋 code 的動作就可以搞定!
 
 更是透過 github.io 建立靜態頁面使用者的福音! 到時候完成的效果會長得像文章下面的留言區

{: .message }

 [什麼是 disqus? 原文][what-is-disqus] 
 
## 如何使用 disqus ?

 1.在 `md 檔` 
 原本的設定區域多新增一個
  `comments: true`

...

tags: [jekyll, disqus]

comments: true

...



 2.去[disqus 官網][disqus-home] 註冊會員，照官網流程做的話程式應該會像下面這樣，只要把程式碼貼在要實現的 layout 上即可

```ruby
  # % if page.comments %
    <div id="disqus_thread"></div>
    <script>
        /**
         *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
         *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
         */
        /*
        var disqus_config = function () {
            this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };
        */
        (function () {  // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');

            s.src = 'https://your-shortname.disqus.com/embed.js';

            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    </script>
    <noscript>Please enable JavaScript to view the 
      <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a>
    </noscript>
  #  % endif %
```
## 結論

本篇只有簡單帶到怎麼用這服務，像是不同付費方案可以用更多延伸功能（有人留言時會寄信到信箱、設定 comment policy...等)

有興趣的話可以看 [6 Things To Do After Installing Disqus][disqus-after-install]

[圖文並茂好文][disqus-install]


 [what-is-disqus]: https://help.disqus.com/en/articles/1717053-what-is-disqus
 [disqus-home]: https://disqus.com/
 [disqus-after-install]: https://www.youtube.com/watch?time_continue=42&v=wTRsNa8kzTw&feature=emb_logo
 [disqus-install]: https://dev-yakuza.github.io/en/jekyll/disqus/
---
layout: single
title: 使用 Github io 建立自己的 Blog 
date: 2021-05-29 1500 +0800
tags: github
---


想免費擁有一個屬於自己的網站的朋友有福了！
現在可以透過 github.io 去建立一個屬於自己的網站囉

-----

## 1. 到 github 建立一個 github 專案

 專案名稱打上 **你的github帳號.github.io** 建立即可
   <img src="/assets/images/create-github-io/create_git_repo.png" alt="create_git_repo">

## 2. 建立 git 資料夾

   在自己電腦中找個資料夾隨便建立一份檔案，並在終端機該資料夾路徑中打上

   <img src="/assets/images/create-github-io/git_init.png" alt="git_init">

  依序為：

  1. touch 
  2. git init 
  3. git add .
  4. git commit -m "some message"

## 3. 推上建立好的 git 資料夾

   輸入 <mark>git remote -v</mark>後，你的 remote 應該會長得像這樣  
   ```
   origin git@github.com:your_github_id/your_github_id.github.io
   ```
   <img src="/assets/images/create-github-io/git_remote.png" alt="git remote">

   
   再把專案推上去 github 就完成囉

  ```
  git push origin master
  ```


   推成功後輸入網址 [https://your_github_id.github.io/](https://amoeric.github.io/) 就會看到你建立好的檔案相關畫面囉


#### 參考文章
* [龍哥 的 github.io 建立教學](https://gitbook.tw/chapters/github/using-github-pages.html)
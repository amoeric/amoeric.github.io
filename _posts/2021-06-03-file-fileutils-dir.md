---
layout: single
title: ruby->File？FileUtils？Tempfile？Dir？
date: 2021-06-03 16:00 +0800
tags: [ruby]
toc: true
---



FileUtils 、 File 、 Dir 、甚至還有一個 Tempfile 第一次接觸時都不知道該從何下手，使用時機是哪個？

本文會介紹各種常用的技巧，讓你在寫程式的時候能夠知道該用什麼處理的好。



### FileUtils 幾種常用的方法

```ruby
'touch -> 建立檔案'
FileUtils.touch 'timestamp'

'mkdir_p -> 目錄不存在才建立新資料夾'
FileUtils.mkdir_p "#{Rails.root}/tmp/cat.png"

'mv -> 移動檔案'
FileUtils.mv('test.rb', 'tmp/')

'cp -> 複製檔案'
FileUtils.cp 'test.rb', 'tmp'

'copy_entry -> 複製整個資料夾內容到'
FileUtils.copy_entry("tmp", "new_dest")

'rm_rf -> 刪除資料夾'
FileUtils.rm_rf "#{Rails.root}/cat/cat.png"

'rm -> 刪除檔案'
FileUtils.rm "cat.png" if File.exist?("cat.png")
```



### File 幾種常用的方法

```ruby
"w" : '若有檔案則打開原檔，清空內容，從頭開始寫入。'
"a" : '若有檔案則打開原檔，將內容加在最後面。'
"r" : '若有檔案則打開原檔，將內容加在最前面。'
"r+": '讀取 / 寫入，不會主動建檔，將內容加在檔案最前面，會覆蓋原有內容，檔案必須存在)'
"w+": '讀取 / 寫入。同 w 功能 '
"a+": '讀取 / 寫入。同 a 功能'
'在每個模式後面加上"b" #例如 "rb" 或 "rb+"，就可以開啟「二進位」模式'
```

參考至： [https://ithelp.ithome.com.tw/articles/10220270](https://ithelp.ithome.com.tw/articles/10220270)



#### 檔案的生命週期 -> open-use-close

這邊要注意的是，使用 File 時後記得把它 file.close 掉，否則不會儲存哦！

```ruby
'.new -> 新建檔案'
file = File.new('test.txt', 'w') # => #<File:test.txt> 

'.open -> 開啟現有文件'
file = File.open('ruby.rb', 'w')

'.write -> 寫入'
file.write("hello world!")  # 寫入內容

'.close -> 關閉'
file.close #如果檔案有寫入的話記得使用

'.join -> 使用 join 合併成路徑'
File.join("usr", "eric")   #=> "usr/eric"

'.exist? -> 檔案是否存在'
File.exist?('test.txt')

'.size -> 檔案大小'
File.size('test.txt')

'.rename -> 重名'
File.rename('test.txt', 'test.rb')

'delete -> 刪除檔案'
File.delete('test.rb')

'absolute_path -> 絕對路徑查詢'
File.absolute_path('tmp/timestamp')
-> '/Users/eric/Desktop/code/tess/tmp/timestamp'

File.read
'把檔案內容讀取轉成字串'

File.open
'是傳回一個檔案'
```



### Dir 各種用法

```ruby
'pwd -> 當前資料夾位址'
Dir.pwd

'mkdir -> 在當前位置建立 test 資料夾 '
Dir.mkdir("test")

'delete -> 刪除該路徑的 test 資料夾'
Dir.delete("test") 

'entries(".") -> 查詢目前資料夾底下的所有檔案及資料夾列表，回傳Array'
Dir.entries(".")
```



### Tempfile 用法

用法與 File 一樣，但其中差異性是 tempfile 並不會產生一個實體檔案，也在 close 後多了一個 unlink 來刪除 temp 檔。

```ruby
#form ruby doc

require 'tempfile'

file = Tempfile.new('foo')
file.path      # => A unique filename in the OS's temp directory,
               #    e.g.: "/tmp/foo.24722.0"
               #    This filename contains 'foo' in its basename.
file.write("hello world")
file.rewind
file.read      # => "hello world"
file.close
file.unlink    # deletes the temp file
```

也因為 close 、 unlink 是必須的，所以可以

```ruby
# form ruby doc

file = Tempfile.new('foo')
begin
   # ...do something with file...
ensure
   file.close
   file.unlink   # deletes the temp file
end
```



## 參考資料

#### File

* 官方文件 [https://ruby-doc.org/core-2.5.0/File.html](https://ruby-doc.org/core-2.5.0/File.html)

#### FileUtils 

* 官方文件 [https://www.rubydoc.info/stdlib/fileutils/FileUtils](https://www.rubydoc.info/stdlib/fileutils/FileUtils)
* [https://ithelp.ithome.com.tw/articles/10220270](https://ithelp.ithome.com.tw/articles/10220270)

#### Dir

* 官方文件 [https://ruby-doc.org/core-2.6.7/Dir.html](https://ruby-doc.org/core-2.6.7/Dir.html)
* [https://ithelp.ithome.com.tw/articles/10219819](https://ithelp.ithome.com.tw/articles/10219819)

#### Tempfile 官方

* [https://ruby-doc.org/stdlib-2.5.3/libdoc/tempfile/rdoc/Tempfile.html](https://ruby-doc.org/stdlib-2.5.3/libdoc/tempfile/rdoc/Tempfile.html)




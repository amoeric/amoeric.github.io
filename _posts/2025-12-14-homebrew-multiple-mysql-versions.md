---
layout: post
title: "使用 homebrew 安裝多個 mysql 版本"
author: amoeric
image: assets/images/8.jpg
tags: [MySQL, Homebrew, Mac]
---

既專案使用 mysql@5.6 後，新專案需要安裝 mysql 最新版本，透過 brew services 切換版本需要以下設定

步驟如下：



## 安裝新版 mysql 並設定 data_dir

```bash
brew install mysql
```

```bash
/usr/local/opt/mysql/bin/mysqld --datadir=/usr/local/var/mysql80 --initialize-insecure
```

指令來源：https://dev.mysql.com/doc/refman/5.7/en/data-directory-initialization.html



## 修改不同版本 services plist

brew services start 時會產生一個臨時的 plist 檔，要修改內容的話路徑為對應 service 底下的 `.plist` 檔

例如：`/usr/local/Cellar/mysql/8.0.23_1/homebrew.mxcl.mysql.plist`

[https://stackoverflow.com/questions/36089384/brew-services-where-to-edit-configuration](https://stackoverflow.com/questions/36089384/brew-services-where-to-edit-configuration)



#### mysql@5.6

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>KeepAlive</key>
  <true/>
  <key>Label</key>
  <string>homebrew.mxcl.mysql@5.6</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/opt/mysql@5.6/bin/mysqld_safe</string>
    <string>--datadir=/usr/local/var/mysql</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>WorkingDirectory</key>
  <string>/usr/local/var/mysql</string>
</dict>
</plist>
```

#### mysql

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>KeepAlive</key>
  <true/>
  <key>Label</key>
  <string>homebrew.mxcl.mysql</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/opt/mysql/bin/mysqld_safe</string>
    <string>--datadir=/usr/local/var/mysql80</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>WorkingDirectory</key>
  <string>/usr/local/var/mysql</string>
</dict>
</plist>
```





## Mysql 8

`ERROR 2059 (HY000): Authentication plugin 'caching_sha2_password' cannot be loaded: dlopen(/usr/local/Cellar/mysql@5.6/5.6.51/lib/plugin/caching_sha2_password.so, 2): image not found`

#### 解法

[https://blog.csdn.net/weixin_43770545/article/details/88854427](https://blog.csdn.net/weixin_43770545/article/details/88854427)

[https://stackoverflow.com/questions/49194719/authentication-plugin-caching-sha2-password-cannot-be-loaded](https://stackoverflow.com/questions/49194719/authentication-plugin-caching-sha2-password-cannot-be-loaded)

使用 mysql8 用 root 權限登入操作
```bash
mysql -u root

#console
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```


## 使用 bash_profile 寫 command ，讓切換 mysql 版本更加簡單

```bash
vim ~/.bash_profile
```

```bash
mysqlv() {
    brew services stop mysql
    brew services stop mysql@5.7
    brew services stop mysql@5.6
    brew unlink mysql mysql@5.7 mysql@5.6
    brew link --force --overwrite $1
    brew services start $1
}

alias mysql56="mysqlv mysql@5.6"
alias mysql57="mysqlv mysql@5.7"
alias mysql80="mysqlv mysql"
```

```bash
source ~/.bash_profile
```

[https://gist.github.com/ivanvermeyen/c2dfb8ad55a4fb699c5913a09422c1d9#switch-mysql-versions](https://gist.github.com/ivanvermeyen/c2dfb8ad55a4fb699c5913a09422c1d9#switch-mysql-versions)

## 解決 Access denied for user 'root'@'localhost' (using password: YES) 問題

```sql
#mysql console
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'YourMyNewPass';
exit;
```
[https://peterli.website/%E5%9C%A8-mac-os-x-%E4%B8%8B%E5%AE%89%E8%A3%9D-mysql-%E8%88%87%E7%B0%A1%E6%98%93%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4/](https://peterli.website/%E5%9C%A8-mac-os-x-%E4%B8%8B%E5%AE%89%E8%A3%9D-mysql-%E8%88%87%E7%B0%A1%E6%98%93%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4/)

## 其他指令

找執行的 mysql

```bash
ps -feax | grep mysqld
launchctl list | grep mysql
```

[https://serverfault.com/questions/459316/error-2002-mysql-socket-tmp-mysql-sock](https://serverfault.com/questions/459316/error-2002-mysql-socket-tmp-mysql-sock)



kill pid

```bash
kill -9 pid
```

```bash
pkill mysqld
```



看錯誤訊息

```bash
cat /usr/local/var/mysql@8.0/xuhuangzhandeMacBook-Air.local.err
```



設定密碼

```bash
mysql_secure_installation
```

[https://at0dd.medium.com/install-mysql-5-7-on-mac-os-mojave-cd07ec936034](https://at0dd.medium.com/install-mysql-5-7-on-mac-os-mojave-cd07ec936034)



root 登入

```bash
mysql -uroot
```

加上密碼

```bash
mysql -uroot -ppassword
```



查看版本

```bash
mysql -V
```



砍掉重練

[https://stackoverflow.com/questions/56676869/brew-start-an-older-version-of-mysql-service-but-how-to-connect-to-it](https://stackoverflow.com/questions/56676869/brew-start-an-older-version-of-mysql-service-but-how-to-connect-to-it)

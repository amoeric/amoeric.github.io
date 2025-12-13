---
layout: single
title:  "Rails 用 carrierwave 上傳至 AWS s3"
date:   2019-08-13 22:00 +0800
tags: [rails, AWS]
comments: true
---
一步一步的紀錄在 rails 中使用 carrierwave 上傳至 AWS s3
{: .message }

首先必須安裝  
{% highlight ruby %}
gem 'fog-aws', '~> 3.5', '>= 3.5.1'
gem 'figaro', '~> 1.1', '>= 1.1.1'
gem 'carrierwave', '~> 1.3', '>= 1.3.1'
{% endhighlight ruby %}  
需要的資料有：五項資料  
{% highlight ruby %}
aws_access_key_id:     ENV["aws_access_key_id"],         #key_id
aws_secret_access_key: ENV["aws_secret_access_key"],     #私鑰     
host:                "s3-ap-northeast-1.amazonaws.com",  #主機位置
region:              "ap-northeast-1"                    #區域
config.fog_directory  = ENV['bucket_name']               #創建的空間名
{% endhighlight ruby %}

# 1.先到 S3 創一個bucket（名稱不能重複

bucket_name：5x-pet-collage  
區域：東京


<img src="/assets/images/aws-upload-img/awsstep1.png" alt="awsstep1">

# 2.在儲存空間內上傳
<img src="/assets/images/aws-upload-img/awsstep2.png" alt="awsstep2">

# 3.把圖片點開來看
<img src="/assets/images/aws-upload-img/awsstep3.png" alt="awsstep3">

# 4.從物件ＵＲＬ可以得知
https://5x-pet-collage.s3-ap-northeast-1.amazonaws.com/  
目前為止五項有了三項
{% highlight ruby %}
host:               "s3-ap-northeast-1.amazonaws.com",     #主機位置
region:             "ap-northeast-1"                       #區域
config.fog_directory  = "5x-pet-collage"                   #空間名稱
{% endhighlight ruby %}

# 5.獲取鑰匙id跟私鑰
點選建立新的存取金鑰
<img src="/assets/images/aws-upload-img/awsstep5.png" alt="awsstep5">

# 6.建立新的存取金鑰
<img src="/assets/images/aws-upload-img/awsstep6.png" alt="awsstep6">

如此一來該要的資料都到齊了

# 7.接著在自己創建的 carrierwave.rb
{% highlight ruby %}
CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'                        
  config.fog_credentials = {
    provider:              'AWS',                        
    aws_access_key_id:     ENV["aws_access_key_id"],                        
    aws_secret_access_key: ENV["aws_secret_access_key"],                        
    host:                    "s3-ap-northeast-1.amazonaws.com", 
    region:                "ap-northeast-1" 
  }
  config.fog_directory  = ENV['bucket_name']           
end
{% endhighlight ruby %}
# 8.在carrierwave創建的uploder檔修改

{% highlight ruby %}
# if Rails.env.production?      #production的時候改為上傳至sw3
#   storage :fog
# else
#   storage :file
# end
{% endhighlight ruby %}

# 9.完成
<img src="/assets/images/aws-upload-img/awsstep9.png" alt="awsstep9">

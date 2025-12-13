---
  layout: single
  title: 導入 obsidian 隨時隨地編輯 github.io
  date: 2025-12-13 11:00 +0800
  tags:
    - obsidian
    - githubio
    - jekyll
  toc: true
---

本文章是在已經完成用 jekyll 推上 github.io 的基礎上進行的設置，如果還沒有設定的話請參考 [建立你自己的 github.io](https://amoeric.github.io/create_your_github_io/)、[jekyll 架構介紹](https://amoeric.github.io/jekyll-architecture/)，也歡迎點擊 jekyll 標籤看更多相關文章。

以下紀錄如何用 macos & ios obsidian 的方便性去完成跨裝置、並且隨時隨地的編輯自己的 github.io 。

## Git
在 obsidian 如果要完成跨裝置同步的功能，本文章的做法是統一上傳到 github ，並且透過插件去自動 commit、push、pull，以下紀錄安裝步驟。

首先到 obsidian 的設定 > 第三方外掛程式 > 社群外掛程式

搜尋 git
![](../assets/images/2025-12-13-obsidian-x-jekyll-x-github.io/2025-12-13-obsidian-x-jekyll-x-github.io-20251213225724.png)


安裝後再到插件裡面設定
1. 開啟 Auto commit-and-sync after stopping file edits
2. Auto commit-and-sync interval (minutes) 設定停止編輯幾分鐘後會 commit 並上傳
3.  滑到下方的「pull」區塊，把 pull on startup 打開

![](../assets/images/2025-12-13-obsidian-x-jekyll-x-github.io/2025-12-13-obsidian-x-jekyll-x-github.io-20251213225805.png)
![](../assets/images/2025-12-13-obsidian-x-jekyll-x-github.io/2025-12-13-obsidian-x-jekyll-x-github.io-20251213225810.png)

設定完後 obsidian 就會幫你在未編輯的幾分後自動 commit & push 了，因為有啟用 Pull on startup 的關係，也不用擔心同步的問題。

## Custom Attachment Location

在 obsidian 中，預設的圖片會像是這種格式

```
![[xxx.png]]
```


但是這種格式在 jekyll 的架構中是沒辦法讀取的， jekyll 的圖檔是放在根目錄的 `assets/images/` 底下，在這裡就要用到 Custom Attachment Location 這個插件去解決圖檔路徑問題。

一樣到 obsidian 的設定 > 第三方外掛程式 > 社群外掛程式，搜尋 Custom Attachment Location 並且安裝。

你有極大的可能出現這畫面，不曉得為什麼沒辦法手動去修改參數。

![](../assets/images/2025-12-13-obsidian-x-jekyll-x-github.io/2025-12-13-obsidian-x-jekyll-x-github.io-20251213224444.png)

不過沒關係，我們可以透過修改 config 的方式去達成一樣的效果。
附上 .obsidian/plugins/obsidian-custom-attachment-location/data.json

```json
{
  "attachmentFolderPath": "assets/images/${noteFileName}",
  "attachmentRenameMode": "All",
  "collectAttachmentUsedByMultipleNotesMode": "Skip",
  "collectedAttachmentFileName": "",
  "customTokensStr": "",
  "defaultImageSize": "",
  "defaultImageSizeDimension": "width",
  "duplicateNameSeparator": " ",
  "emptyAttachmentFolderBehavior": "DeleteWithEmptyParents",
  "excludePaths": [],
  "excludePathsFromAttachmentCollecting": [],
  "generatedAttachmentFileName": "${noteFileName}-${date:YYYYMMDDHHmmss}",
  "includePaths": [],
  "jpegQuality": 0.8,
  "markdownUrlFormat": "../assets/images/${noteFileName}/${generatedAttachmentFileName}",
  "renamedAttachmentFileName": "",
  "shouldConvertPastedImagesToJpeg": false,
  "shouldDeleteOrphanAttachments": false,
  "shouldRenameAttachmentFiles": true,
  "shouldRenameAttachmentFolder": true,
  "shouldRenameCollectedAttachments": false,
  "specialCharacters": "#^[]|*\\<>:?/",
  "specialCharactersReplacement": "-",
  "timeoutInSeconds": 5,
  "treatAsAttachmentExtensions": [
    ".excalidraw.md"
  ],
  "version": "9.18.4"
}
```

| 設定項                         | 原本                      | 修改後                                                             |
| --------------------------- | ----------------------- | --------------------------------------------------------------- |
| attachmentFolderPath        | ./assets/images         | assets/images/${noteFileName}                                   |
| attachmentRenameMode        | Only pasted images      | All                                                             |
| generatedAttachmentFileName | ${noteName}-${date:...} | ${noteFileName}-${date:YYYYMMDDHHmmss}                          |
| markdownUrlFormat           | (空)                     | ../assets/images/${noteFileName}/${generatedAttachmentFileName} |
| shouldRenameAttachmentFiles | false                   | true                                                            |

  效果：
  - 圖片會存到 assets/images/筆記名稱/ 資料夾（從根目錄開始）
  - 檔名格式：筆記名稱-時間戳.png
  - Markdown 路徑使用 ../assets/images/...，讓 Obsidian 和 Jekyll 都能正確顯示圖片


## 手機端

### obsidian sync

先說結論，目前嘗試把整個專案上傳到 icloud ，再移動到 obsidian 資料夾底下，但是這方式被 obsidian 偵測並阻擋下來，以目前的架構來說沒辦法透過 icloud sync 實現手機端同步。

另外兩種方式：
- Working Copy app (20 鎂買斷) 
- 每個月花 8 鎂給 obsidian

有需要手機同步的人可以試試看這兩種方法，以下紀錄 Git 第三方插件手機上的配置。

### Github 設定

先到 ios obsidian 第三方插件 Git 設定 「Authenticcation/commit author」

![500](../assets/images/2025-12-13-obsidian-x-jekyll-x-github.io/2025-12-13-obsidian-x-jekyll-x-github.io-20251214001301.png)

![500](../assets/images/2025-12-13-obsidian-x-jekyll-x-github.io/2025-12-13-obsidian-x-jekyll-x-github.io-20251214001301%201.png)


### Personal Access Token
這 token 在 [github token](https://github.com/settings/tokens)頁面的 Token (classic) > Generate new token > Generate new token (classic)

![](../assets/images/2025-12-13-obsidian-x-jekyll-x-github.io/2025-12-13-obsidian-x-jekyll-x-github.io-20251214001743.png)

token 到期日自己設定、把 repo 打勾，並送出即可。

![](../assets/images/2025-12-13-obsidian-x-jekyll-x-github.io/2025-12-13-obsidian-x-jekyll-x-github.io-20251214001751.png)


## 參考來源
- https://www.youtube.com/watch?v=IlNOhNeWGgY
---
name: MR 撰寫規範
description: 依照以下規則撰寫 mr 標題、內容
---

## MR 標題撰寫規範

### 格式
```
<類型>: <簡短描述>
```

### 常用類型
- `feat`: 新功能
- `fix`: 錯誤修復
- `refactor`: 重構代碼
- `docs`: 文檔更新
- `test`: 測試相關
- `chore`: 維護性工作（依賴更新、配置調整等）
- `perf`: 性能優化
- `style`: 代碼格式調整

### 範例
```
feat: 增加簡訊發送功能
fix: 修復用戶登入驗證錯誤
refactor: 重構消息處理服務
```

## MR 內容/描述撰寫規範

### 基本結構

```markdown
## Description
簡要說明此 MR 的目的和背景

## Changed
- 主要變更點 1
- 主要變更點 2
- 主要變更點 3

## Rspec
- [ ] 單元測試
- [ ] 整合測試
- [ ] 手動測試項目

## ref Issue
Closes #123 <- 這裡的 #2 請依照 git branch 後面的 #序號 自動調整

## Memo
- 需要執行的遷移
- 需要更新的環境變數
- 其他需要注意的事項
```

## 完整範例

### Title
```
feat: 增加簡訊發送功能
```

### Content
```markdown
## Description
實現透過第三方 API 發送簡訊的功能，支援單筆和批次發送

## Changed
- 新增 `SmsService` 服務類別處理簡訊發送邏輯
- 新增 `SmsMessage` model 記錄發送歷史
- 新增相關的 RSpec 測試
- 新增簡訊發送的 API endpoint

## Rspec
- [x] 單元測試 - SmsService 測試覆蓋率 95%
- [x] 整合測試 - API endpoint 測試
- [ ] 手動測試 - 實際發送測試簡訊

## ref Issue
Closes #2

## Memo
- 需要在環境變數中設定 `SMS_API_KEY` 和 `SMS_API_URL`
- 需要執行 `rails db:migrate` 建立 sms_messages 資料表
```

## 最佳實踐

1. **標題要簡潔明確**：一眼就能看出這個 MR 做了什麼
2. **描述要完整**：讓 reviewer 能快速理解變更的來龍去脈
3. **列出測試項目**：確保變更經過充分測試
4. **關聯相關 Issue**：使用 `Closes #123` 自動關閉 Issue
5. **註明注意事項**：特別是需要額外操作的事項（遷移、環境變數等）

-----

注意！產生的內容請務必包含 markdown 語法，務必以 develop branch 的角度來確認變更內容。
# Personal Website - AI 協作說明

## 專案概述
陳建良 (Neil Chen) 個人介紹網站，採用木質調深色主題風格。

## 檔案結構
```
personal_web/
├── CLAUDE.md           # AI 協作說明（本檔案）
├── index.html          # 主頁面，使用模板結構
├── css/
│   └── style.css       # 木質調深色主題樣式
├── js/
│   └── main.js         # 導航邏輯 + 內容動態載入
├── data/
│   └── content.json    # 📌 內容資料檔（更新重點）
└── images/
    └── line-qr.png     # Line QRcode 圖片
```

## 更新指南

### 📌 新增/修改 AI 專案
編輯 `data/content.json` 中的 `aiProjects` 陣列：
```json
{
  "id": "unique-id",
  "title": "專案名稱",
  "badge": "標籤（如：核心成果、跨平台）",
  "featured": true,
  "description": "一段簡短描述",
  "features": [
    { "icon": "✅", "text": "功能重點 1" },
    { "icon": "📝", "text": "功能重點 2" }
  ],
  "techStack": ["技術標籤1", "技術標籤2"]
}
```

### 📌 更新工作經歷
編輯 `data/content.json` 中的 `experience.projects` 陣列。

### 📌 更新個人資訊
編輯 `data/content.json` 中的 `personal` 物件。

## 內容規範

### AI 專案卡片
- `featured: true` 的卡片會有特殊邊框高亮
- `badge` 會顯示在標題左上角
- `features` 建議 2-4 項，用統整數據而非詳細技術細節
- `techStack` 建議 2-4 個標籤

### 撰寫風格
- 用統整數據呈現（如：新增 7 個案例）
- 避免過於技術導向的描述
- 適合個人介紹展示用途

## 技術細節

### 動態載入機制
`main.js` 會在頁面載入時：
1. 讀取 `data/content.json`
2. 根據資料動態渲染各區塊
3. 若載入失敗，顯示預設靜態內容

### CSS 主題變數（可調整）
```css
--wood: #c49a6c;           /* 木質主色 */
--wood-light: #d4b896;     /* 木質淺色 */
--gold: #c9a962;           /* 金色點綴 */
--bg-darkest: #0d0d0d;     /* 最深背景 */
--bg-dark: #1a1a1a;        /* 深色背景 */
--bg-card: #1f1f1f;        /* 卡片背景 */
```

## 常見操作範例

### 新增一個 AI 專案
1. 開啟 `data/content.json`
2. 在 `aiProjects` 陣列新增物件
3. 刷新網頁即可看到變更

### 從 Jira 週報更新內容
可請求 AI 協助：
> 「請從 Jira 週報統整本週 AI 應用成果，更新到 content.json」

AI 會自動：
1. 查詢 Jira API 取得最新週報
2. 統整成適合網站展示的格式
3. 更新 content.json

## 注意事項
- 修改 JSON 後需確保格式正確（可用 JSON 驗證工具）
- 圖片檔案放置於 `images/` 目錄
- Line QRcode 圖片請自行放入 `images/line-qr.png`

## 🌐 多語言翻譯規則（必遵守）

### 同步更新規則
**當中文內容有任何更動時，必須同步更新對應的英文翻譯。**

翻譯內容位於 `js/main.js` 中的 `uiStrings` 物件：
- `uiStrings['zh-TW']` - 中文內容
- `uiStrings['en']` - 英文內容

### 更新流程
1. 修改中文內容 (`uiStrings['zh-TW']` 的某個欄位)
2. **立即**修改英文內容 (`uiStrings['en']` 的對應欄位)
3. 檢查 `switchLanguage()` 函數是否有處理該欄位
4. 執行完整翻譯檢查

### 翻譯檢查
詳細檢查清單請參閱：`docs/LANGUAGE_CHECK.md`

觸發檢查的 Prompt：
```
請依照 docs/LANGUAGE_CHECK.md 的規範，完整檢查網站中英文翻譯
```

### 翻譯品質標準
- 專有名詞保留英文（如 Robot Framework, Claude Skills）
- 技術術語使用業界慣用翻譯
- 語意準確，非逐字翻譯
- 英文句子自然流暢

## 🤖 AI Skill 說明

本網站配有專用 AI Skill 協助開發維護，詳見：`docs/SKILL_PERSONAL_WEB.md`

### 常用觸發詞
| 功能 | 觸發詞 |
|------|--------|
| 翻譯檢查 | 「檢查網站翻譯」、「language check」 |
| 新增專案 | 「新增專案」、「add project」 |
| 外部專案 | 「外部專案」、「外部 AI 應用」 |
| Jira 更新 | 「從 Jira 更新」、「Jira 週報更新」 |
| 更新內容 | 「更新網站內容」、「修改 XX 區塊」 |
| 專案結構 | 「專案結構」、「檔案說明」 |
| 樣式調整 | 「調整樣式」、「修改顏色」 |

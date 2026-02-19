# Personal Web 開發維護 Skill

## Skill 基本資訊

| 項目 | 內容 |
|------|------|
| 名稱 | `personal_web_dev` |
| 描述 | 陳建良個人網站開發、更新與維護助手 |
| 版本 | 1.0.0 |
| 建立日期 | 2026-02-18 |

## 觸發詞

以下任一詞彙可觸發此 Skill：
- "更新網站"
- "網站維護"
- "personal web"
- "翻譯檢查" / "language check"
- "新增專案" / "add project"
- "外部專案" / "外部 AI 應用"
- "從 Jira 更新" / "Jira 週報更新"

---

## 功能模組

### 1. 🌐 語言檢查 (Language Check)

**觸發**：「檢查網站翻譯」、「language check」

**執行內容**：
1. 讀取 `js/main.js` 中的 `uiStrings` 物件
2. 對照 `index.html` 內容
3. 依照 `docs/LANGUAGE_CHECK.md` 完整檢查清單逐項比對（100+ 項目）
4. 產出檢查報告
5. 自動修正缺失項目

**檢查範圍**：
- 導航連結 (4)
- 頁面標題 (3)
- Hero 區塊 (2)
- 學歷區塊 (7)
- 技能區塊 (16)
- 獎項區塊 (4)
- 培訓區塊 (3)
- 工作經歷區塊 (20)
- 聯絡區塊 (9)
- AI 專案區塊 (42)
- 頁尾 (1)

---

### 2. ➕ 新增 AI 專案 (Add AI Project)

**觸發**：「新增專案」、「add project」、「新增 AI 專案」

**執行內容**：
1. 詢問專案資訊（或從提供的描述中擷取）
2. 更新 `js/main.js` 中的 `uiStrings['zh-TW'].projects.cards`
3. 同步更新 `uiStrings['en'].projects.cards`（英文翻譯）
4. 更新 `switchLanguage()` 函數（若需要）
5. 驗證語法正確
6. 執行翻譯檢查確認

**專案卡片結構**：
```javascript
{
    badge: '標籤',           // 如：核心成果、團隊工具
    title: '專案名稱',
    desc: '專案描述（使用 → 標示工作流程）',
    features: [
        '功能特點 1',
        '功能特點 2',
        '功能特點 3',
        '功能特點 4'
    ]
}
```

---

### 2.1 🌐 外部 AI 應用 (External AI Project)

**觸發**：「外部專案」、「外部 AI 應用」、「非 Jira 專案」

**適用情境**：
- 非 Jira 週報內的 AI 應用
- 個人側專案或學習成果
- 外部平台開發的 AI 工具
- 開源專案貢獻

**執行內容**：
1. 詢問專案資訊（或從提供的描述中擷取）
2. 確認專案類型與標籤
3. 更新 `js/main.js` 中的 `uiStrings['zh-TW'].projects.cards`
4. 同步更新 `uiStrings['en'].projects.cards`（英文翻譯）
5. 驗證語法正確
6. 執行翻譯檢查確認

**提供資訊格式**：
```
外部專案
名稱：[專案名稱]
來源：[GitHub / 個人專案 / 其他平台]
描述：[功能說明]
特色：[特色1]、[特色2]、[特色3]
標籤：[核心成果 / 團隊工具 / 個人專案]
```

**標籤選擇指南**：
| 標籤 | 適用情況 |
|------|----------|
| 核心成果 | 工作相關、具影響力的專案 |
| 團隊工具 | 團隊協作開發的工具 |
| 個人專案 | 個人學習、Side Project |
| 開源貢獻 | 對開源社群的貢獻 |

---

### 3. 📊 從 Jira 更新內容 (Update from Jira)

**觸發**：「從 Jira 更新」、「Jira 週報更新」、「更新週報數據」

**執行邏輯**：

```
1. 取得 Jira 週報資料
   ↓
2. 分析內容屬於哪個類別
   ↓
3. 檢查是否有相關現有專案/區塊
   ├─ 有 → 更新現有內容（數據/敘述）
   └─ 無 → 新增專案卡片
   ↓
4. 同步更新英文翻譯
   ↓
5. 執行翻譯檢查
```

**更新策略**：

| 情況 | 處理方式 | 範例 |
|------|---------|------|
| 數據增加 | 更新現有數字 | 「7 個測試案例」→「12 個測試案例」 |
| 功能擴展 | 新增 feature 項目 | 新增「支援批次匯出」到現有卡片 |
| 流程優化 | 更新描述文字 | 改進工作流程描述 |
| 全新應用 | 新增專案卡片 | 建立新的 AI 應用卡片 |

**現有專案對應表**：

| Jira 關鍵字 | 對應專案 | uiStrings 路徑 |
|------------|---------|----------------|
| Robot Framework / 測試 / RF | Robot Framework AI 輔助測試開發 | projects.cards[1] |
| Jira / 工單 / ticket | Jira 工單自動化管理 | projects.cards[2] |
| Git / MR / commit | Git 工作流自動化套件 | projects.cards[3] |
| 文件 / Confluence | AI 協作最佳實踐文件 | projects.cards[4] |
| Bug / 標題 | Bug 標題自動生成器 | projects.cards[5] |
| 網站 / personal web | AI 輔助個人網站架設 | projects.cards[0] |

**可更新欄位**：

```javascript
// 專案卡片可更新項目
{
    desc: '更新描述文字',
    features: [
        '新增或更新功能項目',
        '更新數據：N 個案例 → M 個案例'
    ]
}

// 工作經歷可更新項目
exp: {
    stats: [
        { number: '1400+', label: '處理工單' },  // 可更新數字
        { number: '780+', label: '提交 Bug' }    // 可更新數字
    ],
    projectCards: [/* 可新增專案描述 */],
    automationItems: [/* 可更新自動化成果 */]
}
```

**範例：從 Jira 週報更新**

```
User: 這週 Jira 週報新增了 3 個 RF 測試案例，請更新網站

AI: 檢查到「Robot Framework AI 輔助測試開發」專案已存在
    
    更新內容：
    - features[0]: 「新增 7 個 HA 環境測試案例」
      → 「新增 10 個 HA 環境測試案例」（7+3=10）
    
    已同步更新中英文版本
    ✅ 翻譯檢查通過
```

---

### 4. ✏️ 更新內容 (Update Content)

**觸發**：「更新網站內容」、「修改 XX 區塊」

**支援更新的區塊**：
| 區塊 | 路徑 |
|------|------|
| Hero | `uiStrings.hero` |
| 學歷 | `uiStrings.edu` |
| 技能 | `uiStrings.skill` |
| 獎項 | `uiStrings.award` |
| 培訓 | `uiStrings.training` |
| 工作經歷 | `uiStrings.exp` |
| 聯絡 | `uiStrings.contact` |
| AI 專案 | `uiStrings.projects` |

**規則**：
- 更新中文後必須同步更新英文
- 完成後執行翻譯檢查

---

### 4. 🔍 專案結構說明 (Project Structure)

**觸發**：「專案結構」、「檔案說明」

**專案結構**：
```
personal_web/
├── CLAUDE.md               # AI 協作說明（主要參考文件）
├── index.html              # 主頁面 HTML
├── css/
│   └── style.css           # 木質調深色主題樣式
├── js/
│   └── main.js             # 導航 + 語言切換 + uiStrings
├── data/
│   ├── content.json        # 中文內容資料
│   └── content-en.json     # 英文內容資料（備用）
├── images/
│   ├── profile.jpg         # 個人照片
│   └── line-qr.png         # Line QRcode
└── docs/
    ├── LANGUAGE_CHECK.md   # 翻譯檢查規範
    └── SKILL_PERSONAL_WEB.md # 本 Skill 說明
```

---

### 6. 🎨 樣式調整 (Style Adjustment)

**觸發**：「調整樣式」、「修改顏色」

**CSS 變數位置**：`css/style.css`

**主題色彩**：
```css
--wood: #c49a6c;           /* 木質主色 */
--wood-light: #d4b896;     /* 木質淺色 */
--gold: #c9a962;           /* 金色點綴 */
--bg-darkest: #0d0d0d;     /* 最深背景 */
--bg-dark: #1a1a1a;        /* 深色背景 */
--bg-card: #1f1f1f;        /* 卡片背景 */
```

---

## 使用範例

### 範例 1：新增 AI 專案
```
User: 新增一個 AI 專案，名稱是「自動化報告生成器」，
      功能是每週自動從 Jira 抓取資料生成週報

AI: 好的，我會：
    1. 在 uiStrings['zh-TW'].projects.cards 新增卡片
    2. 在 uiStrings['en'].projects.cards 新增對應英文
    3. 執行語法檢查
    4. 執行翻譯檢查確認
```

### 範例 2：翻譯檢查
```
User: 檢查網站翻譯

AI: 依照 LANGUAGE_CHECK.md 執行完整檢查...
    ✅ 導航區塊: 4/4 通過
    ✅ 頁面標題: 3/3 通過
    ...
    總計: 107/107 項目通過
```

### 範例 3：更新技能
```
User: 把 AI 應用技能新增「MCP Server 開發」

AI: 好的，我會：
    1. 在 skill.skills 陣列新增「MCP Server 開發」
    2. 在英文版新增「MCP Server Development」
    3. 執行翻譯檢查確認
```

---

## 重要規則

### ⚠️ 同步更新原則
**任何中文內容更動，必須同步更新對應的英文翻譯。**

### ⚠️ 翻譯品質標準
- 專有名詞保留英文（如 Robot Framework, Claude Skills）
- 技術術語使用業界慣用翻譯
- 語意準確，非逐字翻譯

### ⚠️ 完成後驗證
每次更新後必須：
1. 執行 `node --check js/main.js` 確認語法
2. 執行翻譯檢查確認中英同步

---

## 相關文件

| 文件 | 用途 |
|------|------|
| [CLAUDE.md](../CLAUDE.md) | AI 協作主要說明 |
| [LANGUAGE_CHECK.md](LANGUAGE_CHECK.md) | 翻譯檢查完整清單 |
| [js/main.js](../js/main.js) | uiStrings 定義位置 |
| [index.html](../index.html) | 頁面 HTML 結構 |

---

## 維護紀錄

| 日期 | 版本 | 更新內容 |
|------|------|---------|
| 2026-02-18 | 1.0.0 | 初始建立 Skill |

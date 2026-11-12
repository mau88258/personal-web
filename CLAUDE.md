# Personal Website - AI 協作說明

## 專案概述
陳建良 (Neil Chen) 個人網站。2026-11-12 整個重寫：單頁捲動式、深色為預設（右上角可切淺色）、中英雙語。
線上網址：https://mau88258.github.io/personal-web/ （GitHub Pages，push 到 `main` 後約 1 分鐘生效）。

## 檔案結構
```
personal_web/
├── CLAUDE.md               # 本檔
├── index.html              # 骨架：導覽列、頁尾、<div id="app">（內容全由 JS 渲染）
├── css/site.css            # 全部樣式；顏色都是 :root 變數，淺色在 :root[data-theme="light"]
├── js/app.js               # 讀兩份 JSON → 渲染各區塊；語言／主題切換、捲動定位
├── data/
│   ├── content.json        # 📌 中文內容（單一來源）
│   └── content-en.json     # 📌 英文內容（結構必須與中文完全一致）
├── images/                 # profile.jpg（已壓到 900px）、line-qr.png
├── scripts/check-translation.js   # 比對兩份 JSON 的 key 結構與陣列長度
└── docs/                   # ⚠️ 舊架構（uiStrings 寫在 main.js）時期的文件，內容已過時，僅供參考
```

## 改內容
**只改 `data/content.json` 與 `data/content-en.json`，兩份同步改**，不用動 HTML／JS。

| 要改什麼 | JSON 位置 |
|---|---|
| 首屏標語、簡介 | `hero` |
| 首屏六格數字 | `stats`（`value`／`label`／`note`） |
| 「現在在做什麼」三欄 | `about.pillars` |
| 專業能力標籤 | `capabilities.groups` |
| AI 重點成果卡 | `ai.featured`（`diagram` 填 `fleet` 或 `pipeline` 會佔整列並帶圖） |
| 機群圖／流程圖的文字 | `ai.fleetDiagram`／`ai.pipeline.steps` |
| 其他工具小卡 | `ai.more.items` |
| AI 導入歷程 | `ai.timeline.items` |
| 工作經歷、學歷、獎項、培訓 | `experience` |
| 聯絡方式 | `contact` |

改完：
```bash
node scripts/check-translation.js      # key 結構要一致（jobs[1].areasTitle 空字串是刻意的）
python3 -m http.server 8080            # 本機預覽一定要走 HTTP，直接開 index.html 會讀不到 JSON
```

## 改版面
- 樣式只在 `css/site.css`；區塊的 HTML 結構在 `js/app.js` 的 `renderHero／renderAbout／renderAI／renderExperience／renderContact`。
- 錨點固定：`#about`、`#ai-projects`、`#experience`、`#contact`（舊連結沿用，不要改名）。
- **改了 css／js／JSON 要同步改版本號**：`index.html` 兩處 `?v=YYYYMMDD` 與 `js/app.js` 的 `VERSION`，否則瀏覽器會吃到舊快取。

## 內容規範（公開網站）
- 只寫概括性描述：**不放**工單號、內部專案代碼、IP／主機名、同事姓名、客戶案件、未公開的產品規劃。
- 數字要有來源；累計數字用「+」表示下限，不寫估計值。
- 專有名詞保留英文（Playwright、Robot Framework、Claude Skills）；英文版語意準確、不逐字翻。

## 部署
純靜態、無建構步驟。`git push origin main` 即部署；push 前跑翻譯檢查、本機切中英與深淺色各看一次。

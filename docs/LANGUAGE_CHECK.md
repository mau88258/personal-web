# 語言檢查 AI 架構

## 用途
當需要檢查網站中英文翻譯是否正確、完整時，請依照以下流程執行。
**此文件為強制性規範，每次翻譯檢查必須完整執行所有項目。**

## 重要規則

### 同步更新規則（必遵守）
> **當中文內容有任何更動時，必須同步更新對應的英文翻譯。**
> 
> 1. 修改 `uiStrings['zh-TW']` 的任何內容後
> 2. 必須立即修改 `uiStrings['en']` 對應位置
> 3. 完成後執行完整翻譯檢查確認無遺漏

## 檢查流程

### 1. 執行語言檢查
請 AI 協助檢查時，提供以下 Prompt：

```
請依照 docs/LANGUAGE_CHECK.md 的規範，完整檢查 personal_web 網站的中英文翻譯：

1. 讀取 js/main.js 中的 uiStrings 物件
2. 對照 index.html 中的實際內容
3. 逐項檢查下方「完整檢查清單」的每一個項目
4. 找出以下問題：
   - 缺少翻譯的內容（HTML 有但 uiStrings 沒有）
   - 翻譯不一致（中英對應有誤）
   - 語法或拼寫錯誤
   - switchLanguage() 函數中缺少對應選擇器
5. 產出修正建議並執行修正
```

### 2. 完整檢查清單（必須逐項確認）

#### 2.1 導航區塊 (nav)
| # | 項目 | 中文 | 英文 | uiStrings 路徑 |
|---|------|------|------|----------------|
| 1 | 關於連結 | 關於 | About | nav.about |
| 2 | 經歷連結 | 經歷 | Experience | nav.experience |
| 3 | AI 專案連結 | AI 專案 | AI Projects | nav.projects |
| 4 | 聯繫連結 | 聯繫 | Contact | nav.contact |

#### 2.2 頁面標題 (page)
| # | 項目 | 中文 | 英文 | uiStrings 路徑 |
|---|------|------|------|----------------|
| 1 | 工作經歷標題 | 工作經歷 | Work Experience | page.experience |
| 2 | AI 專案標題 | AI 應用專案 | AI Projects | page.projects |
| 3 | 聯絡我標題 | 聯絡我 | Contact Me | page.contact |

#### 2.3 關於區塊標題 (section)
| # | 項目 | 中文 | 英文 | uiStrings 路徑 |
|---|------|------|------|----------------|
| 1 | 學歷背景 | 學歷背景 | Education | section.education |
| 2 | 專業技能 | 專業技能 | Skills | section.skills |
| 3 | 榮譽獎項 | 榮譽獎項 | Awards | section.awards |
| 4 | 專業培訓 | 專業培訓 | Training | section.training |

#### 2.4 Hero 區塊 (hero)
| # | 項目 | uiStrings 路徑 |
|---|------|----------------|
| 1 | 副標題 | hero.subtitle |
| 2 | 描述文字 | hero.description |

#### 2.5 學歷區塊 (edu)
| # | 項目 | uiStrings 路徑 |
|---|------|----------------|
| 1 | 學校名稱 | edu.tku |
| 2 | 科系名稱 | edu.eeDept |
| 3 | 碩士學位 | edu.masterDegree |
| 4 | 學士學位 | edu.bachelorDegree |
| 5 | 碩士主修 | edu.masterMajor |
| 6 | 碩士活動描述 | edu.masterActivities |
| 7 | 學士活動描述 | edu.bachelorActivities |

#### 2.6 技能區塊 (skill)
| # | 項目 | uiStrings 路徑 |
|---|------|----------------|
| 1 | AI 應用標題 | skill.aiApp |
| 2 | 程式開發標題 | skill.programming |
| 3 | 測試自動化標題 | skill.automation |
| 4 | 技術領域標題 | skill.techDomain |
| 5-16 | 12 項技能 | skill.skills[0-11] |

#### 2.7 獎項區塊 (award)
| # | 項目 | uiStrings 路徑 |
|---|------|----------------|
| 1 | 淡江機器人競賽名稱 | award.tku2017 |
| 2 | 淡江機器人競賽結果 | award.tku2017Result |
| 3 | 新光保全競賽名稱 | award.sks2016 |
| 4 | 新光保全競賽結果 | award.sks2016Result |

#### 2.8 培訓區塊 (training)
| # | 項目 | uiStrings 路徑 |
|---|------|----------------|
| 1 | 工業局 AI 精粹計畫 | training[0] |
| 2 | AI 智慧應用計畫 | training[1] |
| 3 | 台大智齡設計課程 | training[2] |

#### 2.9 工作經歷區塊 (exp)
| # | 項目 | uiStrings 路徑 |
|---|------|----------------|
| 1 | 公司名稱 | exp.company |
| 2 | 職位 | exp.position |
| 3 | 時間 | exp.period |
| 4 | 描述 | exp.desc |
| 5 | 負責專案標題 | exp.projectsTitle |
| 6 | 自動化測試標題 | exp.automationTitle |
| 7 | 累計成果標題 | exp.achievementsTitle |
| 8-10 | 專案卡片描述 x3 | exp.projectCards[0-2].desc |
| 11-12 | 自動化項目 title | exp.automationItems[0-1].title |
| 13-14 | 自動化項目 desc | exp.automationItems[0-1].desc |
| 15-16 | 累計成果標籤 x2 | exp.stats[0-1].label |
| 17 | 前公司名稱 | exp.prevCompany |
| 18 | 前職位 | exp.prevPosition |
| 19 | 前時間 | exp.prevPeriod |
| 20 | 前描述 | exp.prevDesc |

#### 2.10 聯絡區塊 (contact)
| # | 項目 | uiStrings 路徑 |
|---|------|----------------|
| 1 | Email 標題 | contact.email |
| 2 | LinkedIn 標題 | contact.linkedin |
| 3 | Line 標題 | contact.line |
| 4 | 頁面介紹 | contact.intro |
| 5 | LinkedIn 連結文字 | contact.linkedinLink |
| 6 | Line 連結文字 | contact.lineLink |
| 7 | Line 提示文字 | contact.lineHint |
| 8 | CTA 標題 | contact.ctaTitle |
| 9 | CTA 描述 | contact.ctaDesc |

#### 2.11 AI 專案區塊 (projects)
| # | 項目 | uiStrings 路徑 |
|---|------|----------------|
| 1 | 頁面介紹 | projects.intro |
| **卡片 1: AI 輔助個人網站架設** |
| 2 | badge | projects.cards[0].badge |
| 3 | title | projects.cards[0].title |
| 4 | desc | projects.cards[0].desc |
| 5-8 | features x4 | projects.cards[0].features[0-3] |
| **卡片 2: Robot Framework AI 輔助測試開發** |
| 9 | badge | projects.cards[1].badge |
| 10 | title | projects.cards[1].title |
| 11 | desc | projects.cards[1].desc |
| 12-15 | features x4 | projects.cards[1].features[0-3] |
| **卡片 3: Jira 工單自動化管理** |
| 16 | badge | projects.cards[2].badge |
| 17 | title | projects.cards[2].title |
| 18 | desc | projects.cards[2].desc |
| 19-22 | features x4 | projects.cards[2].features[0-3] |
| **卡片 4: Git 工作流自動化套件** |
| 23 | badge | projects.cards[3].badge |
| 24 | title | projects.cards[3].title |
| 25 | desc | projects.cards[3].desc |
| 26-29 | features x4 | projects.cards[3].features[0-3] |
| **卡片 5: AI 協作最佳實踐文件** |
| 30 | badge | projects.cards[4].badge |
| 31 | title | projects.cards[4].title |
| 32 | desc | projects.cards[4].desc |
| 33-36 | features x4 | projects.cards[4].features[0-3] |
| **卡片 6: Bug 標題自動生成器** |
| 37 | badge | projects.cards[5].badge |
| 38 | title | projects.cards[5].title |
| 39 | desc | projects.cards[5].desc |
| 40-42 | features x3 | projects.cards[5].features[0-2] |

#### 2.12 頁尾 (footer)
| # | 項目 | uiStrings 路徑 |
|---|------|----------------|
| 1 | 版權文字 | footer |

### 總計：約 100+ 翻譯項目

### 3. 快速驗證指令

在瀏覽器 Console 執行：
```javascript
// 切換到英文
PersonalSite.setLang('en');

// 切換到中文
PersonalSite.setLang('zh-TW');

// 檢查當前語言
console.log('Current:', PersonalSite.getLang());
```

### 4. 常見問題

1. **feature-item 未翻譯**：HTML 中的 `.feature-item span` 需要在 uiStrings 中對應
2. **project-card 內容未翻譯**：每張卡片的 badge/title/desc 都要有對應翻譯
3. **子標題未翻譯**：如工作經歷的 subsection-title

## 新增翻譯步驟

1. 在 `uiStrings['zh-TW']` 加入中文內容
2. 在 `uiStrings['en']` 加入對應英文翻譯
3. 在 `switchLanguage()` 函數中加入選擇器與更新邏輯
4. 測試切換功能

## 翻譯品質標準

- 專有名詞保留英文（如 Robot Framework, Claude Skills）
- 技術術語使用業界慣用翻譯
- 語意準確，非逐字翻譯
- 英文句子自然流暢

## 維護紀錄

| 日期 | 更新內容 |
|------|---------|
| 2026-02-18 | 初始建立多語言架構 |
| 2026-02-18 | 完整翻譯 AI 專案 features（23條）、聯絡頁面完整內容 |
| 2026-02-18 | 建立完整檢查清單（100+ 項目）、同步更新規則 |

---

## Claude Skill 整合建議

若要在 Claude Desktop 中建立專用 Skill 來執行翻譯檢查，可參考以下設定：

### Skill 名稱
`personal_web_language_check`

### Skill 描述
```
檢查 personal_web 網站的中英文翻譯完整性。
執行完整的 100+ 項目檢查，確保所有內容都有正確的中英對照。
```

### 觸發詞
- "檢查網站翻譯"
- "language check"
- "翻譯檢查"

### 執行內容
```
1. 讀取 personal_web/js/main.js 中的 uiStrings 物件
2. 讀取 personal_web/index.html 內容
3. 依照 docs/LANGUAGE_CHECK.md 完整檢查清單逐項比對
4. 產出檢查報告：
   - ✅ 通過項目數
   - ❌ 缺失項目列表
   - ⚠️ 需修正項目
5. 若有缺失，自動執行修正
```

### 相關文件路徑
- `personal_web/js/main.js` - uiStrings 定義
- `personal_web/index.html` - HTML 結構
- `personal_web/docs/LANGUAGE_CHECK.md` - 檢查規範

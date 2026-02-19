/**
 * Personal Website - Main JavaScript
 * Author: Neil Chen
 * Version: 3.0.1 - Embedded language support
 */

// 全域變數
let currentLang = localStorage.getItem('lang') || 'zh-TW';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initMobileMenu();
    initScrollEffects();
    initLanguageSwitcher();
});

/**
 * 初始化導航功能
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // 處理導航點擊
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetPage = link.getAttribute('data-page');
            
            // 更新導航狀態
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // 切換頁面
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                }
            });

            // 關閉手機選單
            closeMobileMenu();
            
            // 滾動到頂部
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // 更新 URL hash
            history.pushState(null, null, `#${targetPage}`);
        });
    });

    // 處理直接訪問帶有 hash 的 URL
    handleInitialHash();
}

/**
 * 處理初始 URL hash
 */
function handleInitialHash() {
    const hash = window.location.hash.slice(1);
    if (hash) {
        const targetLink = document.querySelector(`.nav-link[data-page="${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
}

/**
 * 初始化手機版選單
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // 點擊外部關閉選單
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            closeMobileMenu();
        }
    });
}

/**
 * 關閉手機版選單
 */
function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks) navLinks.classList.remove('active');
    if (menuBtn) menuBtn.classList.remove('active');
}

/**
 * 初始化滾動效果
 */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 添加滾動陰影效果
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // 元素進入視窗的動畫
    initIntersectionObserver();
}

/**
 * 初始化 Intersection Observer 動畫
 */
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 觀察需要動畫的元素
    const animateElements = document.querySelectorAll(
        '.project-card, .skill-category, .contact-card, .ai-project-card, .label-card'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-target');
        observer.observe(el);
    });
}

/**
 * 處理瀏覽器返回/前進按鈕
 */
window.addEventListener('popstate', () => {
    handleInitialHash();
});

// 添加動畫樣式
const style = document.createElement('style');
style.textContent = `
    .animate-target {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .animate-target.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

/**
 * 專案卡片共用資料（icon、techStack、featured 不隨語言變化）
 */
const projectsData = [
    {
        icons: ['💬', '🎨', '📄', '🤖'],
        techStack: ['HTML/CSS/JS', 'GitHub Copilot', 'JSON'],
        featured: true
    },
    {
        icons: ['✅', '📝', '🔧', '⏱️'],
        techStack: ['GitHub Copilot', 'Robot Framework', 'Python'],
        featured: true
    },
    {
        icons: ['🔍', '🏷️', '📊', '🔄'],
        techStack: ['JavaScript', 'Jira REST API', 'Claude Skills'],
        featured: true
    },
    {
        icons: ['📝', '🔀', '💬', '📦'],
        techStack: ['PowerShell', 'GitLab API', 'Teams Webhook'],
        featured: true
    },
    {
        icons: ['📖', '📋', '🔧', '👥'],
        techStack: ['Documentation', 'Prompt Engineering'],
        featured: true
    },
    {
        icons: ['🐛', '📏', '🔍'],
        techStack: ['Claude Skills', 'Prompt Engineering'],
        featured: true
    },
    {
        icons: ['🔍', '📊', '👥', '📁'],
        techStack: ['Node.js', 'Jira REST API', 'Chart.js'],
        featured: true,
        image: 'images/ai_weekly_report.jpg'
    }
];

/**
 * 動態渲染專案卡片
 */
function renderProjectCards(lang) {
    const container = document.querySelector('.ai-projects-grid');
    if (!container) return;
    
    const ui = uiStrings[lang];
    if (!ui?.projects?.cards) return;
    
    container.innerHTML = '';
    
    ui.projects.cards.forEach((card, idx) => {
        const data = projectsData[idx] || { icons: [], techStack: [], featured: false };
        
        const cardEl = document.createElement('div');
        cardEl.className = `ai-project-card${data.featured ? ' featured' : ''}`;
        
        // Header
        let headerHtml = '<div class="project-header">';
        if (card.badge) {
            headerHtml += `<span class="project-badge">${card.badge}</span>`;
        }
        headerHtml += `<h2>${card.title}</h2></div>`;
        
        // Description
        const descHtml = `<p class="project-desc">${card.desc}</p>`;
        
        // Features
        let featuresHtml = '<div class="features-list">';
        card.features.forEach((feature, fIdx) => {
            const icon = data.icons[fIdx] || '•';
            featuresHtml += `
                <div class="feature-item">
                    <span class="feature-icon">${icon}</span>
                    <span>${feature}</span>
                </div>`;
        });
        featuresHtml += '</div>';
        
        // Tech Stack
        let techHtml = '<div class="tech-stack">';
        data.techStack.forEach(tech => {
            techHtml += `<span>${tech}</span>`;
        });
        techHtml += '</div>';
        
        // Image (if exists)
        let imageHtml = '';
        if (data.image) {
            imageHtml = `
                <div class="project-image">
                    <img src="${data.image}" alt="${card.title}" loading="lazy">
                </div>`;
        }
        
        cardEl.innerHTML = headerHtml + descHtml + featuresHtml + techHtml + imageHtml;
        container.appendChild(cardEl);
    });
}

/**
 * 嵌入式多語言 UI 文字
 */
const uiStrings = {
    'zh-TW': {
        nav: { about: '關於我', experience: '工作經歷', projects: 'AI 應用經歷', contact: '聯絡我' },
        page: { experience: '工作經歷', projects: 'AI 應用專案', contact: '聯絡我' },
        section: {
            education: '學歷背景',
            skills: '專業技能',
            awards: '榮譽獎項',
            training: '專業培訓'
        },
        hero: {
            subtitle: 'AI 輔助開發實踐者 · 軟體自動化測試工程師 @ QNAP',
            description: '以 QA 自動化為基礎，積極探索 AI 在工作流程中的實際應用。從測試案例生成、工單管理到文件協作，持續實驗並落地各種 AI 輔助方案。相信 AI 不只是工具，更是改變工作方式的契機——目標是成為能善用 AI 創造價值的工程師。'
        },
        edu: {
            tku: '淡江大學',
            eeDept: '電機工程學系',
            masterDegree: '碩士',
            bachelorDegree: '學士',
            masterMajor: '電機工程學系（智慧型機器人實驗室 - 機器人工程碩士學位）',
            masterActivities: '擔任實驗室負責人，統籌團隊年度研究規劃、進度管理與任務分配。帶領團隊參與 FIRA RoboWorld Cup 國際機器人競賽，培養團隊協調與專案執行能力。',
            bachelorActivities: '大一即加入智慧型機器人實驗室，累積四年機器人開發與 AI 應用經驗。擔任系學會副會長與班級代表，培養領導與溝通能力。'
        },
        skill: {
            aiApp: 'AI 應用',
            programming: '程式開發',
            automation: '測試自動化',
            techDomain: '技術領域',
            skills: [
                'Claude Skills 開發', 'GitHub Copilot 協作', 'Prompt Engineering', 'AI 輔助工作流程設計',
                'Python', 'Robot Framework', 'JavaScript / Node.js',
                '自動化測試架構設計', 'CI/CD 整合', 'Linux 系統操作',
                'Storage / NAS 系統', 'HA 高可用架構', '深度學習影像辨識'
            ]
        },
        award: {
            tku2017: '淡江大學機器人創意競賽',
            tku2017Result: '第一名 (2017)',
            sks2016: '新光保全智慧型機器人競賽',
            sks2016Result: '優等 (2016)'
        },
        training: [
            '工業局 AI 精粹計畫（機器學習、深度學習與影像辨識實戰）',
            'AI 智慧應用新世代人才培育計畫 - 工業機器人之應用',
            '國立臺灣大學創新設計學院「智齡設計」跨校課程'
        ],
        exp: {
            company: 'QNAP Systems, Inc.',
            position: '軟體自動化測試工程師',
            period: '2021/11 - 現今（4年+）',
            desc: '負責 QuTS hero 及相關產品的品質保證工作，專注於自動化測試與 AI 工具整合。',
            projectsTitle: '📋 負責專案',
            automationTitle: '🤖 自動化測試',
            achievementsTitle: '📈 累計成果',
            projectCards: [
                { title: 'Hero HA (High Availability)', desc: '高可用性架構測試，確保系統穩定性與故障轉移機制' },
                { title: 'Storage Manager', desc: '儲存管理功能測試，包含 RAID 擴展等核心功能' },
                { title: 'Snapshot Manager', desc: '快照功能完整測試，涵蓋快照建立、排程、還原、刪除、匯出/匯入等核心操作' }
            ],
            automationItems: [
                { title: 'Robot Framework 測試環境', desc: '建立並維護 RF 7.3 測試環境，開發自動化測試案例' },
                { title: '測試案例管理', desc: 'AI 輔助測試案例產出與驗證，提升測試覆蓋率' }
            ],
            stats: [
                { number: '1400+', label: '處理工單' },
                { number: '780+', label: '提交 Bug' }
            ],
            prevCompany: '廣略國際股份有限公司',
            prevPosition: '營運經理',
            prevPeriod: '2020/12 - 2021/6（7個月）',
            prevDesc: '跨領域挑戰：協助朋友漢堡店開店初期，從零學習餐飲經營全流程。負責店鋪日常營運管理、行銷企劃發想、活動執行與粉絲團經營。在完全陌生的領域快速上手，培養了獨立解決問題、專案規劃與跨領域學習的能力。'
        },
        contact: {
            email: 'Email',
            linkedin: 'LinkedIn',
            line: 'Line',
            intro: '歡迎與我聯繫，討論合作機會或技術交流',
            linkedinLink: '查看我的 LinkedIn',
            lineLink: '加我好友',
            lineHint: '或掃描下方 QR Code',
            ctaTitle: '有任何問題嗎？',
            ctaDesc: '無論是技術討論、合作洽談或是單純想交流，都歡迎透過上方方式與我聯繫！'
        },
        projects: {
            intro: '積極探索 AI 在實際工作中的應用，從測試開發、工單管理到團隊協作，每個專案都有完整的工作流程。正在嘗試將 AI 應用於各種發想中，此頁面將持續更新。',
            cards: [
                { 
                    badge: '本站', 
                    title: 'AI 輔助個人網站架設', 
                    desc: '使用 GitHub Copilot (Claude) 從零建立本網站。以自然語言描述需求與設計偏好 → AI 生成基礎架構 → 對話迭代調整配色與互動 → 建立 JSON 資料驅動架構 → 撰寫 CLAUDE.md 協作規範。全程無需手寫程式碼，完全透過 AI 對話完成開發。',
                    features: ['全程自然語言對話開發，零手寫程式碼', '木質調深色主題設計與響應式佈局', 'JSON 資料驅動架構，內容更新無需改 HTML', 'CLAUDE.md 協作規範，AI 可直接理解維護']
                },
                { 
                    badge: '核心成果', 
                    title: 'Robot Framework AI 輔助測試開發', 
                    desc: '整合 GitHub Copilot 於 Robot Framework 測試開發。提供既有架構與規範給 AI 分析 → 描述測試需求 → AI 生成符合規範的測試案例 → 人工 Review 確認邏輯 → 執行驗證通過。也用於批量重構既有測試檔案，一次性更新以符合新規範。',
                    features: ['新增 7 個 HA 環境測試案例，涵蓋 Thick/Thin/Dedupe 驗證', '批量重構 16 個測試檔案，統一程式碼風格與規範', '修復共用關鍵字相容性問題，提升測試穩定性', '測試案例開發時間從數小時縮短至 30 分鐘內']
                },
                { 
                    badge: '跨平台', 
                    title: 'Jira 工單自動化管理', 
                    desc: '建立 Claude Skills 整合 Jira REST API 的完整自動化系統。在 Claude 中以自然語言下達指令 → Skill 呼叫對應 JS 腳本 → 腳本執行 API 操作 → Claude 整理成易讀格式呈現。功能涵蓋工單查詢、標籤管理、狀態轉換、週報自動統整，全套支援 macOS 與 Windows。',
                    features: ['自然語言查詢工單，支援多種篩選條件', '一鍵批量添加/移除標籤，管理 AI 相關任務分類', 'Weekly AI Summary 自動生成週報，彙整工作成果', '工單狀態轉換自動化，減少重複操作']
                },
                { 
                    badge: '團隊工具', 
                    title: 'Git 工作流自動化套件', 
                    desc: '使用 AI 協助開發的 PowerShell 腳本套件，自動化日常 Git 操作。執行 commit → 自動格式化訊息 → 推送並建立 MR → 自動指派 Reviewer → 發送 Teams 通知。套件含初始化腳本，新成員一鍵部署即可使用，已在 QA 團隊推廣。',
                    features: ['自動格式化 Commit Message，符合團隊規範', '一鍵建立 GitLab MR，自動指派 Reviewer', 'MR 建立後自動發送 Teams 通知', '初始化套件一鍵部署，新成員快速上手']
                },
                { 
                    badge: '知識庫', 
                    title: 'AI 協作最佳實踐文件', 
                    desc: '從實際 AI 協作經驗累積的系統性文件。包含除錯經驗規則（避免重複踩坑）→ Prompt 撰寫模板（提升 AI 理解度）→ 環境設定指南（確保工具正確運作）→ 工作流規範（定義最佳流程）。已在部門內分享，幫助同事快速上手 AI 輔助開發。',
                    features: ['累積 16 條除錯規則，記錄常見問題與解法', '標準化 Prompt 模板，提升 AI 回應品質', '環境設定指南，確保工具正確運作', '部門內分享推廣，協助同事快速上手']
                },
                { 
                    badge: '', 
                    title: 'Bug 標題自動生成器', 
                    desc: '建立 Claude Skill 自動產生標準化 Bug 標題。貼上 Bug 描述 → AI 擷取關鍵資訊（功能模組、問題類型、觸發條件）→ 依團隊規範生成標準化標題。解決命名風格不一致問題，提升 Bug 追蹤的可搜尋性。',
                    features: ['自動擷取功能模組、問題類型、觸發條件', '依團隊規範生成標準化標題格式', '提升 Bug 可搜尋性，方便追蹤與統計']
                },
                { 
                    badge: '團隊工具', 
                    title: 'AI 應用週報 Dashboard', 
                    desc: '自動掃描 JIRA 工單，追蹤團隊 AI 應用情況並產生可視化週報。',
                    features: ['自動掃描 JIRA 工單，分析 AI 應用標籤', '可視化 Dashboard：統計卡片、成員分佈圖、AI 比例圓餅圖', '群組管理：支援多團隊追蹤、成員狀態管理', '歷史週報保存，可查閱過往紀錄']
                }
            ]
        },
        footer: '© 2025 陳建良. All rights reserved.'
    },
    'en': {
        nav: { about: 'About Me', experience: 'Work Experience', projects: 'AI Applications', contact: 'Contact Me' },
        page: { experience: 'Work Experience', projects: 'AI Projects', contact: 'Contact Me' },
        section: {
            education: 'Education',
            skills: 'Skills',
            awards: 'Awards',
            training: 'Training'
        },
        hero: {
            subtitle: 'AI-Powered Developer · QA Automation Engineer @ QNAP',
            description: 'Building on QA automation expertise, actively exploring practical AI applications in workflows. From test case generation to ticket management and documentation, continuously experimenting with AI-assisted solutions. I believe AI is not just a tool but an opportunity to transform how we work—aiming to be an engineer who creates value with AI.'
        },
        edu: {
            tku: 'Tamkang University',
            eeDept: 'Electrical Engineering',
            masterDegree: 'Master',
            bachelorDegree: 'Bachelor',
            masterMajor: 'Electrical Engineering (Intelligent Robot Lab - Robotics Engineering)',
            masterActivities: 'Lab leader coordinating annual research planning, progress management, and task allocation. Led the team in FIRA RoboWorld Cup international robotics competition, developing team coordination and project execution skills.',
            bachelorActivities: 'Joined the Intelligent Robot Lab as a freshman, accumulating 4 years of robotics development and AI application experience. Served as Vice President of the Department Student Association and Class Representative.'
        },
        skill: {
            aiApp: 'AI Applications',
            programming: 'Programming',
            automation: 'Test Automation',
            techDomain: 'Tech Domains',
            skills: [
                'Claude Skills Development', 'GitHub Copilot Collaboration', 'Prompt Engineering', 'AI-Assisted Workflow Design',
                'Python', 'Robot Framework', 'JavaScript / Node.js',
                'Automation Test Architecture', 'CI/CD Integration', 'Linux System',
                'Storage / NAS Systems', 'HA Architecture', 'Deep Learning & Image Recognition'
            ]
        },
        award: {
            tku2017: 'TKU Robot Innovation Competition',
            tku2017Result: '1st Place (2017)',
            sks2016: 'SKS Intelligent Robot Competition',
            sks2016Result: 'Excellence Award (2016)'
        },
        training: [
            'MOEA AI Program (ML, Deep Learning & Image Recognition)',
            'AI Smart Application - Industrial Robot Applications',
            'NTU D-School "Design for Aging" Cross-campus Course'
        ],
        exp: {
            company: 'QNAP Systems, Inc.',
            position: 'QA Automation Engineer',
            period: '2021/11 - Present (4+ years)',
            desc: 'Responsible for quality assurance of QuTS hero and related products, focusing on test automation and AI tool integration.',
            projectsTitle: '📋 Projects',
            automationTitle: '🤖 Test Automation',
            achievementsTitle: '📈 Achievements',
            projectCards: [
                { title: 'Hero HA (High Availability)', desc: 'High availability architecture testing, ensuring system stability and failover mechanisms' },
                { title: 'Storage Manager', desc: 'Storage management testing, including RAID expansion and core functionalities' },
                { title: 'Snapshot Manager', desc: 'Complete snapshot testing: creation, scheduling, restore, delete, and export/import operations' }
            ],
            automationItems: [
                { title: 'Robot Framework Environment', desc: 'Built and maintained RF 7.3 test environment, developed automation test cases' },
                { title: 'Test Case Management', desc: 'AI-assisted test case generation and verification, improving test coverage' }
            ],
            stats: [
                { number: '1400+', label: 'Tickets Handled' },
                { number: '780+', label: 'Bugs Submitted' }
            ],
            prevCompany: 'Guanglue International Corp.',
            prevPosition: 'Operations Manager',
            prevPeriod: '2020/12 - 2021/6 (7 months)',
            prevDesc: 'Cross-domain challenge: Assisted a friend during the early stage of opening a burger restaurant, learning F&B operations from scratch. Managed daily store operations, marketing planning, event execution, and social media. Quickly adapted in an unfamiliar field, developing problem-solving, project planning, and cross-domain learning capabilities.'
        },
        contact: {
            email: 'Email',
            linkedin: 'LinkedIn',
            line: 'Line',
            intro: 'Feel free to contact me for collaboration opportunities or technical discussions',
            linkedinLink: 'View my LinkedIn',
            lineLink: 'Add me',
            lineHint: 'or scan the QR Code below',
            ctaTitle: 'Any questions?',
            ctaDesc: 'Whether it\'s technical discussions, collaboration inquiries, or just networking—feel free to reach out through any of the above!'
        },
        projects: {
            intro: 'Actively exploring AI applications in real work scenarios—from test development and ticket management to team collaboration—each project follows a complete workflow. Currently experimenting with AI in various ideas; this page will be continuously updated.',
            cards: [
                { 
                    badge: 'This Site', 
                    title: 'AI-Assisted Personal Website', 
                    desc: 'Built this website from scratch using GitHub Copilot (Claude). Described requirements in natural language → AI generated base structure → Iterative dialog for colors and interactions → JSON-driven architecture → CLAUDE.md collaboration guidelines. Zero hand-written code, fully developed through AI conversation.',
                    features: ['Full natural language development, zero hand-written code', 'Wood-tone dark theme design with responsive layout', 'JSON-driven architecture, update content without editing HTML', 'CLAUDE.md collaboration guidelines for AI maintenance']
                },
                { 
                    badge: 'Core', 
                    title: 'Robot Framework AI Test Development', 
                    desc: 'Integrated GitHub Copilot into Robot Framework test development. Provided existing architecture to AI → Described test requirements → AI generated compliant test cases → Manual review for logic → Execution verification. Also used for batch refactoring of test files to meet new standards.',
                    features: ['Added 7 HA environment test cases covering Thick/Thin/Dedupe', 'Batch refactored 16 test files, unified code style', 'Fixed shared keyword compatibility issues', 'Reduced test case development from hours to under 30 minutes']
                },
                { 
                    badge: 'Cross-platform', 
                    title: 'Jira Ticket Automation', 
                    desc: 'Built Claude Skills integrated with Jira REST API for complete automation. Natural language commands in Claude → Skill calls JS scripts → Scripts execute API operations → Claude presents readable results. Features include ticket queries, label management, status transitions, and weekly report generation.',
                    features: ['Natural language ticket queries with multiple filters', 'One-click batch add/remove labels for AI task categorization', 'Weekly AI Summary auto-generates weekly reports', 'Automated ticket status transitions, reducing repetitive tasks']
                },
                { 
                    badge: 'Team Tool', 
                    title: 'Git Workflow Automation Suite', 
                    desc: 'AI-assisted PowerShell script suite automating daily Git operations. Commit → Auto-format message → Push and create MR → Auto-assign reviewers → Send Teams notification. Includes setup script for one-click deployment, now adopted by QA team.',
                    features: ['Auto-format commit messages following team standards', 'One-click GitLab MR creation with auto-assigned reviewers', 'Auto Teams notification after MR creation', 'One-click initialization for new team members']
                },
                { 
                    badge: 'Knowledge', 
                    title: 'AI Collaboration Best Practices', 
                    desc: 'Systematic documentation from real AI collaboration experience. Includes debugging rules (avoid repeated mistakes) → Prompt templates (improve AI understanding) → Environment setup guides (ensure tools work correctly) → Workflow standards (define best practices). Shared within department to help colleagues get started.',
                    features: ['Accumulated 16 debugging rules documenting common issues', 'Standardized prompt templates improving AI response quality', 'Environment setup guides ensuring proper tool operation', 'Shared within department to help colleagues onboard']
                },
                { 
                    badge: '', 
                    title: 'Bug Title Generator', 
                    desc: 'Claude Skill for auto-generating standardized bug titles. Paste bug description → AI extracts key info (module, issue type, trigger) → Generate title following team standards. Solves naming inconsistency and improves bug searchability.',
                    features: ['Auto-extracts module, issue type, and trigger conditions', 'Generates standardized title format per team standards', 'Improves bug searchability for tracking and statistics']
                },
                { 
                    badge: 'Team Tool', 
                    title: 'AI Weekly Report Dashboard', 
                    desc: 'Automatically scans JIRA tickets to track team AI application status and generate visual weekly reports.',
                    features: ['Auto-scans JIRA tickets and analyzes AI application labels', 'Visual Dashboard: stat cards, member distribution, AI ratio pie chart', 'Group management: multi-team tracking, member status management', 'Historical reports saved for reviewing past records']
                }
            ]
        },
        footer: '© 2025 Neil Chen. All rights reserved.'
    }
};

/**
 * 套用語言切換
 */
function switchLanguage(lang) {
    const ui = uiStrings[lang];
    if (!ui) return;
    
    // 導航連結
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#about') link.textContent = ui.nav.about;
        else if (href === '#experience') link.textContent = ui.nav.experience;
        else if (href === '#ai-projects') link.textContent = ui.nav.projects;
        else if (href === '#contact') link.textContent = ui.nav.contact;
    });
    
    // 頁面標題 (.page-title)
    document.querySelectorAll('.page-title').forEach(title => {
        const section = title.closest('section');
        if (section?.id === 'experience') title.textContent = ui.page.experience;
        else if (section?.id === 'ai-projects') title.textContent = ui.page.projects;
        else if (section?.id === 'contact') title.textContent = ui.page.contact;
    });
    
    // About 區塊內的 section-title
    const sectionTitles = document.querySelectorAll('#about .section-title');
    sectionTitles.forEach((title, idx) => {
        if (idx === 0) title.textContent = ui.section.education;
        else if (idx === 1) title.textContent = ui.section.skills;
        else if (idx === 2) title.textContent = ui.section.awards;
        else if (idx === 3) title.textContent = ui.section.training;
    });
    
    // Hero
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDesc = document.querySelector('.hero-description');
    if (heroSubtitle) heroSubtitle.textContent = ui.hero.subtitle;
    if (heroDesc) heroDesc.textContent = ui.hero.description;
    
    // 學歷
    const eduCards = document.querySelectorAll('.education-card');
    eduCards.forEach((card, idx) => {
        const h3 = card.querySelector('h3');
        const major = card.querySelector('.edu-major');
        const degree = card.querySelector('.edu-degree');
        const activities = card.querySelector('.edu-activities');
        
        if (h3) h3.textContent = ui.edu.tku;
        if (idx === 0) {
            if (major) major.textContent = ui.edu.masterMajor;
            if (degree) degree.innerHTML = `${ui.edu.masterDegree} <span class="edu-period">2018 - 2020</span>`;
            if (activities) activities.textContent = ui.edu.masterActivities;
        } else {
            if (major) major.textContent = ui.edu.eeDept;
            if (degree) degree.innerHTML = `${ui.edu.bachelorDegree} <span class="edu-period">2014 - 2018</span>`;
            if (activities) activities.textContent = ui.edu.bachelorActivities;
        }
    });
    
    // 技能類別標題
    const skillCategories = document.querySelectorAll('.skill-category h3');
    const skillTitles = [ui.skill.aiApp, ui.skill.programming, ui.skill.automation, ui.skill.techDomain];
    skillCategories.forEach((h3, idx) => {
        if (skillTitles[idx]) h3.textContent = skillTitles[idx];
    });
    
    // 技能列表項目
    const skillItems = document.querySelectorAll('.skill-category li');
    skillItems.forEach((li, idx) => {
        if (ui.skill.skills[idx]) li.textContent = ui.skill.skills[idx];
    });
    
    // 獎項
    const awardCards = document.querySelectorAll('.award-card');
    awardCards.forEach((card, idx) => {
        const h4 = card.querySelector('h4');
        const p = card.querySelector('p');
        if (idx === 0) {
            if (h4) h4.textContent = ui.award.tku2017;
            if (p) p.textContent = ui.award.tku2017Result;
        } else {
            if (h4) h4.textContent = ui.award.sks2016;
            if (p) p.textContent = ui.award.sks2016Result;
        }
    });
    
    // 培訓
    const trainingItems = document.querySelectorAll('.training-item .training-name');
    trainingItems.forEach((item, idx) => {
        if (ui.training[idx]) item.textContent = ui.training[idx];
    });
    
    // 工作經歷
    const companyHeader = document.querySelector('.company-header');
    if (companyHeader) {
        const position = companyHeader.querySelector('.position');
        const period = companyHeader.querySelector('.period');
        if (position) position.textContent = ui.exp.position;
        if (period) period.textContent = ui.exp.period;
    }
    const workDesc = document.querySelector('.work-description p');
    if (workDesc) workDesc.textContent = ui.exp.desc;
    
    // 經歷子標題
    const subsectionTitles = document.querySelectorAll('#experience .subsection-title');
    const expTitles = [ui.exp.projectsTitle, ui.exp.automationTitle, ui.exp.achievementsTitle];
    subsectionTitles.forEach((h3, idx) => {
        if (expTitles[idx]) h3.textContent = expTitles[idx];
    });
    
    // 工作經歷專案卡片
    const expProjectCards = document.querySelectorAll('#experience .project-card');
    expProjectCards.forEach((card, idx) => {
        if (ui.exp.projectCards?.[idx]) {
            const p = card.querySelector('p');
            if (p) p.textContent = ui.exp.projectCards[idx].desc;
        }
    });
    
    // 自動化項目
    const automationItems = document.querySelectorAll('.automation-item');
    automationItems.forEach((item, idx) => {
        if (ui.exp.automationItems?.[idx]) {
            const h4 = item.querySelector('h4');
            const p = item.querySelector('p');
            if (h4) h4.textContent = ui.exp.automationItems[idx].title;
            if (p) p.textContent = ui.exp.automationItems[idx].desc;
        }
    });
    
    // 累計成果
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, idx) => {
        if (ui.exp.stats?.[idx]) {
            const label = card.querySelector('.stat-label');
            if (label) label.textContent = ui.exp.stats[idx].label;
        }
    });
    
    // 前一份工作
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 1) {
        const prevItem = timelineItems[1];
        const prevHeader = prevItem.querySelector('.company-header');
        if (prevHeader) {
            const h2 = prevHeader.querySelector('h2');
            const position = prevHeader.querySelector('.position');
            const period = prevHeader.querySelector('.period');
            if (h2) h2.textContent = ui.exp.prevCompany;
            if (position) position.textContent = ui.exp.prevPosition;
            if (period) period.textContent = ui.exp.prevPeriod;
        }
        const prevDesc = prevItem.querySelector('.work-description p');
        if (prevDesc) prevDesc.textContent = ui.exp.prevDesc;
    }
    
    // 聯絡資訊標籤
    const contactCards = document.querySelectorAll('#contact .contact-card');
    contactCards.forEach(card => {
        const h3 = card.querySelector('h3');
        const icon = card.querySelector('.contact-icon')?.textContent?.trim();
        if (h3) {
            if (icon === '📧') h3.textContent = ui.contact.email;
            else if (icon === '💼') h3.textContent = ui.contact.linkedin;
            else if (icon === '💬') h3.textContent = ui.contact.line;
        }
        // LinkedIn 連結文字
        const linkedinLink = card.querySelector('a[href*="linkedin"]');
        if (linkedinLink && ui.contact.linkedinLink) linkedinLink.textContent = ui.contact.linkedinLink;
        // Line 連結文字
        const lineLink = card.querySelector('.line-link');
        if (lineLink && ui.contact.lineLink) lineLink.textContent = ui.contact.lineLink;
        // Line 提示文字
        const lineHint = card.querySelector('.link-hint');
        if (lineHint && ui.contact.lineHint) lineHint.textContent = ui.contact.lineHint;
    });
    
    // 聯絡頁面 intro
    const contactIntro = document.querySelector('#contact .page-intro');
    if (contactIntro && ui.contact.intro) contactIntro.textContent = ui.contact.intro;
    
    // 聯絡 CTA 區塊
    const ctaTitle = document.querySelector('.contact-cta h2');
    const ctaDesc = document.querySelector('.contact-cta p');
    if (ctaTitle && ui.contact.ctaTitle) ctaTitle.textContent = ui.contact.ctaTitle;
    if (ctaDesc && ui.contact.ctaDesc) ctaDesc.textContent = ui.contact.ctaDesc;
    
    // AI 專案
    const projectIntro = document.querySelector('#ai-projects .page-intro, #projects .page-intro');
    if (projectIntro && ui.projects) projectIntro.textContent = ui.projects.intro;
    
    // 動態渲染專案卡片
    renderProjectCards(lang);
    
    // 頁尾
    const footer = document.querySelector('.footer-text');
    if (footer) footer.textContent = ui.footer;
    
    // HTML lang 屬性
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-TW');
}

/**
 * 初始化語言切換功能
 */
function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    // 設定初始狀態
    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
    
    // 初始套用語言
    switchLanguage(currentLang);
    
    // 點擊切換
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newLang = btn.dataset.lang;
            if (newLang === currentLang) return;
            
            currentLang = newLang;
            localStorage.setItem('lang', newLang);
            
            // 更新按鈕狀態
            langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === newLang));
            
            // 套用語言切換
            switchLanguage(newLang);
        });
    });
}

/**
 * 公開 API
 */
window.PersonalSite = {
    getLang: () => currentLang,
    setLang: (lang) => {
        if (lang !== 'zh-TW' && lang !== 'en') return;
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.querySelectorAll('.lang-btn').forEach(b => 
            b.classList.toggle('active', b.dataset.lang === lang)
        );
        switchLanguage(lang);
    }
};

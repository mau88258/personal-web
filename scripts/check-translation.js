#!/usr/bin/env node
/**
 * 翻譯一致性檢查腳本
 * 比對 content.json (中文) 與 content-en.json (英文) 的 key 結構是否一致
 *
 * 用法：node scripts/check-translation.js
 */

const fs = require('fs');
const path = require('path');

const ZH_PATH = path.join(__dirname, '..', 'data', 'content.json');
const EN_PATH = path.join(__dirname, '..', 'data', 'content-en.json');

function loadJSON(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

/**
 * 遞迴取得所有 key 路徑
 * 陣列元素以 [index] 表示，只比對結構（長度 + 物件 key），不比對值
 */
function getStructure(obj, prefix) {
  const results = [];
  if (Array.isArray(obj)) {
    results.push({ path: prefix, type: 'array', length: obj.length });
    obj.forEach((item, i) => {
      const itemPath = prefix + '[' + i + ']';
      if (item && typeof item === 'object') {
        results.push(...getStructure(item, itemPath));
      } else {
        results.push({ path: itemPath, type: typeof item });
      }
    });
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      const keyPath = prefix ? prefix + '.' + k : k;
      if (v && typeof v === 'object') {
        results.push(...getStructure(v, keyPath));
      } else {
        results.push({ path: keyPath, type: typeof v });
      }
    }
  }
  return results;
}

function checkEmptyValues(obj, prefix, lang) {
  const warnings = [];
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      warnings.push(...checkEmptyValues(item, prefix + '[' + i + ']', lang));
    });
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      const keyPath = prefix ? prefix + '.' + k : k;
      if (typeof v === 'string' && v.trim() === '') {
        warnings.push(keyPath);
      } else if (v && typeof v === 'object') {
        warnings.push(...checkEmptyValues(v, keyPath, lang));
      }
    }
  }
  return warnings;
}

// --- Main ---
const zh = loadJSON(ZH_PATH);
const en = loadJSON(EN_PATH);

const zhStruct = getStructure(zh, '');
const enStruct = getStructure(en, '');

const zhPaths = new Set(zhStruct.map(s => s.path));
const enPaths = new Set(enStruct.map(s => s.path));

let hasError = false;

// 1. 檢查 key 缺失
const zhOnly = [...zhPaths].filter(p => !enPaths.has(p));
const enOnly = [...enPaths].filter(p => !zhPaths.has(p));

if (zhOnly.length > 0) {
  hasError = true;
  console.log('❌ 以下 key 只存在於中文版 (content.json)，英文版缺失：');
  zhOnly.forEach(k => console.log('   - ' + k));
  console.log('');
}

if (enOnly.length > 0) {
  hasError = true;
  console.log('❌ 以下 key 只存在於英文版 (content-en.json)，中文版缺失：');
  enOnly.forEach(k => console.log('   - ' + k));
  console.log('');
}

// 2. 檢查陣列長度不一致
const zhArrays = zhStruct.filter(s => s.type === 'array');
const enArrayMap = new Map(enStruct.filter(s => s.type === 'array').map(s => [s.path, s]));

const lengthMismatch = [];
zhArrays.forEach(za => {
  const ea = enArrayMap.get(za.path);
  if (ea && za.length !== ea.length) {
    lengthMismatch.push({ path: za.path, zh: za.length, en: ea.length });
  }
});

if (lengthMismatch.length > 0) {
  hasError = true;
  console.log('⚠️  以下陣列長度不一致：');
  lengthMismatch.forEach(m => {
    console.log('   - ' + m.path + ': 中文 ' + m.zh + ' 項 vs 英文 ' + m.en + ' 項');
  });
  console.log('');
}

// 3. 檢查空值
const zhEmpty = checkEmptyValues(zh, '', 'zh');
const enEmpty = checkEmptyValues(en, '', 'en');

if (zhEmpty.length > 0) {
  console.log('⚠️  中文版有空字串：');
  zhEmpty.forEach(k => console.log('   - ' + k));
  console.log('');
}

if (enEmpty.length > 0) {
  console.log('⚠️  英文版有空字串：');
  enEmpty.forEach(k => console.log('   - ' + k));
  console.log('');
}

// 結果
if (!hasError && zhEmpty.length === 0 && enEmpty.length === 0) {
  console.log('✅ 翻譯結構檢查通過！中英文 JSON key 完全一致，無空值。');
  console.log('   中文 key 數量: ' + zhPaths.size);
  console.log('   英文 key 數量: ' + enPaths.size);
} else if (!hasError) {
  console.log('✅ 翻譯結構 key 一致（有上述空值警告）');
}

process.exit(hasError ? 1 : 0);

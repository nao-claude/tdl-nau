#!/usr/bin/env node
// TDR公式サイトからチケット価格を取得してticket-prices-static.tsを更新するスクリプト
// GitHub Actionsから月次実行される

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATIC_FILE = join(__dirname, "../src/lib/ticket-prices-static.ts");

async function fetchPricesForMonth(year, month) {
  const yyyymm = `${year}${String(month).padStart(2, "0")}`;
  const url = `https://www.tokyodisneyresort.jp/ticket/index/${yyyymm}/`;
  console.log(`Fetching: ${url}`);

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "ja,en;q=0.9",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!res.ok) {
    console.warn(`  HTTP ${res.status} for ${yyyymm}`);
    return {};
  }

  const html = await res.text();
  const result = {};

  const cellRegex =
    /data-park="(tdl|tds)"[^>]*?data-ymd="(\d{8})"[\s\S]*?<div class="type">(\d*)<\/div>/g;
  let m;
  while ((m = cellRegex.exec(html)) !== null) {
    const park = m[1];
    const ymd = m[2];
    const price = m[3] ? parseInt(m[3]) : null;
    if (!price) continue;
    const dateStr = `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
    if (!result[dateStr]) result[dateStr] = {};
    result[dateStr][park] = price;
  }

  const count = Object.keys(result).length;
  console.log(`  Found ${count} dates`);
  return result;
}

async function main() {
  const today = new Date();
  const months = [];

  // 今月〜3ヶ月先を取得
  for (let i = 0; i <= 3; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth() + 1 });
  }

  // 新しい価格データを収集
  const newPrices = {};
  for (const { year, month } of months) {
    const prices = await fetchPricesForMonth(year, month);
    Object.assign(newPrices, prices);
    await new Promise((r) => setTimeout(r, 1000)); // 1秒インターバル
  }

  if (Object.keys(newPrices).length === 0) {
    console.error("No price data fetched. Aborting.");
    process.exit(1);
  }

  // 既存ファイルから現在のデータを抽出してマージ
  const existing = readFileSync(STATIC_FILE, "utf-8");
  const existingPrices = {};
  const entryRegex = /"(\d{4}-\d{2}-\d{2})": \{ tdl:\s*(\d+), tds:\s*(\d+) \}/g;
  let em;
  while ((em = entryRegex.exec(existing)) !== null) {
    existingPrices[em[1]] = { tdl: parseInt(em[2]), tds: parseInt(em[3]) };
  }

  // 既存データ + 新データをマージ（新データ優先）
  const merged = { ...existingPrices };
  for (const [date, prices] of Object.entries(newPrices)) {
    if (prices.tdl && prices.tds) {
      merged[date] = { tdl: prices.tdl, tds: prices.tds };
    } else if (prices.tdl) {
      merged[date] = { tdl: prices.tdl, tds: merged[date]?.tds ?? prices.tdl };
    } else if (prices.tds) {
      merged[date] = { tdl: merged[date]?.tdl ?? prices.tds, tds: prices.tds };
    }
  }

  // 今月以前の古いデータを削除（当月1日より古い日付）
  const cutoff = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`;
  const filtered = Object.fromEntries(
    Object.entries(merged)
      .filter(([date]) => date >= cutoff)
      .sort(([a], [b]) => a.localeCompare(b))
  );

  // ファイル生成
  const today_str = today.toISOString().slice(0, 10);
  const lines = Object.entries(filtered)
    .map(([date, p]) => `  "${date}": { tdl: ${String(p.tdl).padStart(5)}, tds: ${String(p.tds).padStart(5)} },`)
    .join("\n");

  const output = `// TDR公式サイトから取得したチケット価格データ（静的フォールバック用）
// Vercel環境からTDRサイトへのアクセスがブロックされる場合に使用
// 最終更新: ${today_str}

export const STATIC_TICKET_PRICES: Record<string, { tdl: number; tds: number }> = {
${lines}
};
`;

  writeFileSync(STATIC_FILE, output, "utf-8");
  const dateCount = Object.keys(filtered).length;
  const lastDate = Object.keys(filtered).at(-1);
  console.log(`\nUpdated ${STATIC_FILE}`);
  console.log(`Total: ${dateCount} dates, last: ${lastDate}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

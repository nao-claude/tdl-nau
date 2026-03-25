export type Locale = "ja" | "en";

export const translations = {
  ja: {
    // Header
    siteTitle: "TDLなう",
    siteSubtitle: "東京ディズニーランド・シー リアルタイム待ち時間",

    // Park names
    tdl: "東京ディズニーランド",
    tds: "東京ディズニーシー",
    land: "ランド",
    sea: "シー",

    // Tabs
    tabMap: "エリア別",
    tabRealtime: "ランキング",
    tabCalendar: "混雑予想",

    // TodaySummary
    todayHours: "本日の営業時間",
    landHours: "ランド",
    seaHours: "シー",
    crowdToday: "今日の混雑",
    maxWait: "最長待ち",
    operating: "営業中",
    noWait: "待ちなし",
    minuteUnit: "分",
    attractionUnit: "本",
    share: "シェア",
    evening: "夕方",

    // ParkPanel
    operatingCount: "営業中",
    maxWaitLabel: "最大",
    refresh: "更新",
    lastFetched: "最終取得",
    favoriteHint: "♡ をタップしてお気に入り登録。次回から素早く確認できます。",
    beforeOpen: "開園前です",
    closed: "閉園しました",
    openingTime: "本日の開園時間",
    closingMessage: "本日の営業は終了しました",
    closingTime: "閉園",

    // AreaMap
    lastUpdated: "最終更新",
    favorites: "お気に入り",
    noFavorites: "お気に入りがまだありません",
    addFavoriteHint: "♡ をタップして追加してください",
    closed_attraction: "運休",
    noWaitShort: "待ちなし",
    maxWaitShort: "最大",
    operatingShort: "営業",

    // CrowdCalendar
    crowdForecast: "混雑予想",
    crowdLegend: "混雑度の目安",
    ticketPriceLegend: "1デーパスポート価格（大人）● = 各日の価格",
    ticketPriceNote: "※東京ディズニーリゾート公式サイトより取得",
    waitExplanation: "「分」について：",
    crowdNote: "※曜日・祝日・季節イベントをもとにした予測です",
    hotelSearch: "この日の舞浜・浦安エリアの宿を探す",
    jalanSearch: "じゃらんで探す",
    rakutenSearch: "楽天トラベルで探す",

    // Footer
    unofficial: "非公式サイトです。株式会社オリエンタルランドとは無関係です。",
    privacyPolicy: "プライバシーポリシー",
    poweredBy: "Powered by",

    // Share
    shareText: (parkName: string, grade: string, maxWait: number) =>
      `今日の${parkName}は混雑度${grade}！${maxWait > 0 ? `最長待ち${maxWait}分` : "待ちなし多数"}🏰 #TDLなう @disneynow_tokyo`,
  },

  en: {
    // Header
    siteTitle: "TDL Now",
    siteSubtitle: "Tokyo Disneyland & DisneySea Real-time Wait Times",

    // Park names
    tdl: "Tokyo Disneyland",
    tds: "Tokyo DisneySea",
    land: "Land",
    sea: "Sea",

    // Tabs
    tabMap: "By Area",
    tabRealtime: "Ranking",
    tabCalendar: "Crowd Forecast",

    // TodaySummary
    todayHours: "Today's Hours",
    landHours: "Land",
    seaHours: "Sea",
    crowdToday: "Today's Crowd",
    maxWait: "Max Wait",
    operating: "Open",
    noWait: "No Wait",
    minuteUnit: "min",
    attractionUnit: "",
    share: "Share",
    evening: "Eve",

    // ParkPanel
    operatingCount: "open",
    maxWaitLabel: "max",
    refresh: "Refresh",
    lastFetched: "Updated",
    favoriteHint: "Tap ♡ to add favorites for quick access next time.",
    beforeOpen: "Not yet open",
    closed: "Now closed",
    openingTime: "Today's opening time",
    closingMessage: "Today's operation has ended",
    closingTime: "closed",

    // AreaMap
    lastUpdated: "Last updated",
    favorites: "Favorites",
    noFavorites: "No favorites yet",
    addFavoriteHint: "Tap ♡ to add attractions",
    closed_attraction: "Closed",
    noWaitShort: "No wait",
    maxWaitShort: "max",
    operatingShort: "open",

    // CrowdCalendar
    crowdForecast: "Crowd Forecast",
    crowdLegend: "Crowd Level Guide",
    ticketPriceLegend: "1-Day Passport Price (Adult) ● = Daily Price",
    ticketPriceNote: "※ From Tokyo Disney Resort official site",
    waitExplanation: "About \"min\":",
    crowdNote: "※ Predictions based on day of week, holidays, and seasonal events",
    hotelSearch: "Find hotels near Maihama for this date",
    jalanSearch: "Search on Jalan",
    rakutenSearch: "Search on Rakuten Travel",

    // Footer
    unofficial: "Unofficial site. Not affiliated with Oriental Land Co., Ltd.",
    privacyPolicy: "Privacy Policy",
    poweredBy: "Powered by",

    // Share
    shareText: (parkName: string, grade: string, maxWait: number) =>
      `Today's ${parkName} crowd level: ${grade}! ${maxWait > 0 ? `Max wait ${maxWait} min` : "Many no-wait attractions"} 🏰 #TDLNow @disneynow_tokyo`,
  },
} as const;

export type Translations = (typeof translations)["ja"];

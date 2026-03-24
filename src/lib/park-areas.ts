// パークエリア別アトラクション分類（themeparks.wiki externalId ベース）

export interface AreaDef {
  name: string;
  color: string;
  attractionIds: number[];
}

export const TDL_AREAS: AreaDef[] = [
  {
    name: "ワールドバザール",
    color: "bg-amber-100 border-amber-300",
    attractionIds: [151, 191],
  },
  {
    name: "アドベンチャーランド",
    color: "bg-green-100 border-green-300",
    attractionIds: [152, 153, 155, 156],
  },
  {
    name: "ウエスタンランド",
    color: "bg-orange-100 border-orange-300",
    attractionIds: [154, 157, 158, 159, 160, 161, 162],
  },
  {
    name: "ファンタジーランド",
    color: "bg-pink-100 border-pink-300",
    attractionIds: [163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 197],
  },
  {
    name: "トゥーンタウン",
    color: "bg-yellow-100 border-yellow-300",
    attractionIds: [175, 176, 178, 179, 180, 181, 194],
  },
  {
    name: "トゥモローランド",
    color: "bg-blue-100 border-blue-300",
    attractionIds: [183, 189, 195, 196],
  },
];

export const TDS_AREAS: AreaDef[] = [
  {
    name: "メディテレーニアンハーバー",
    color: "bg-cyan-100 border-cyan-300",
    attractionIds: [227, 230, 244, 245],
  },
  {
    name: "アメリカンウォーターフロント",
    color: "bg-blue-100 border-blue-300",
    attractionIds: [218, 228, 232, 233, 243, 246],
  },
  {
    name: "ポート・ディスカバリー",
    color: "bg-sky-100 border-sky-300",
    attractionIds: [219, 231, 234, 247],
  },
  {
    name: "ロストリバーデルタ",
    color: "bg-amber-100 border-amber-300",
    attractionIds: [222, 229, 242],
  },
  {
    name: "アラビアンコースト",
    color: "bg-yellow-100 border-yellow-300",
    attractionIds: [220, 226, 235, 236],
  },
  {
    name: "マーメイドラグーン",
    color: "bg-teal-100 border-teal-300",
    attractionIds: [202, 221, 237, 238, 239, 240, 241],
  },
  {
    name: "ミステリアスアイランド",
    color: "bg-stone-100 border-stone-300",
    attractionIds: [223, 224],
  },
  {
    name: "ファンタジースプリングス",
    color: "bg-purple-100 border-purple-300",
    attractionIds: [255, 256, 257, 258],
  },
];

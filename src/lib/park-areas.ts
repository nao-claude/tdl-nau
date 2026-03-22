// パークエリア別アトラクション分類

export interface AreaDef {
  name: string;
  color: string;
  attractionIds: number[];
}

export const TDL_AREAS: AreaDef[] = [
  {
    name: "ワールドバザール",
    color: "bg-amber-100 border-amber-300",
    attractionIds: [7985, 8019],
  },
  {
    name: "アドベンチャーランド",
    color: "bg-green-100 border-green-300",
    attractionIds: [7986, 7987, 7989, 7990],
  },
  {
    name: "ウエスタンランド",
    color: "bg-orange-100 border-orange-300",
    attractionIds: [7988, 7991, 7992, 7993, 7994, 7995, 7996],
  },
  {
    name: "ファンタジーランド",
    color: "bg-pink-100 border-pink-300",
    attractionIds: [7997, 7998, 7999, 8000, 8001, 8002, 8003, 8004, 8005, 8006, 8007, 8255],
  },
  {
    name: "トゥーンタウン",
    color: "bg-yellow-100 border-yellow-300",
    attractionIds: [8008, 8009, 8010, 8011, 8012, 8013, 8014, 8020],
  },
  {
    name: "トゥモローランド",
    color: "bg-blue-100 border-blue-300",
    attractionIds: [8015, 8018, 8021, 8254],
  },
];

export const TDS_AREAS: AreaDef[] = [
  {
    name: "メディテレーニアンハーバー",
    color: "bg-cyan-100 border-cyan-300",
    attractionIds: [8031, 8034, 8037, 8048],
  },
  {
    name: "アメリカンウォーターフロント",
    color: "bg-blue-100 border-blue-300",
    attractionIds: [8032, 8036, 8038, 8051],
  },
  {
    name: "ポート・ディスカバリー",
    color: "bg-sky-100 border-sky-300",
    attractionIds: [8035],
  },
  {
    name: "ロストリバーデルタ",
    color: "bg-amber-100 border-amber-300",
    attractionIds: [8027, 8033, 8046],
  },
  {
    name: "アラビアンコースト",
    color: "bg-yellow-100 border-yellow-300",
    attractionIds: [8025, 8030, 8040],
  },
  {
    name: "マーメイドラグーン",
    color: "bg-teal-100 border-teal-300",
    attractionIds: [8022, 8026, 8041, 8042, 8043, 8044, 8045],
  },
  {
    name: "ミステリアスアイランド",
    color: "bg-stone-100 border-stone-300",
    attractionIds: [8028, 8029],
  },
  {
    name: "ファンタジースプリングス",
    color: "bg-purple-100 border-purple-300",
    attractionIds: [13559, 13560, 13561, 13562],
  },
  {
    name: "その他",
    color: "bg-gray-100 border-gray-300",
    attractionIds: [8024, 8039, 8047, 8049, 8050],
  },
];

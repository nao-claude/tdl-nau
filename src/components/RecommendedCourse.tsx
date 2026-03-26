"use client";

import { useEffect, useState } from "react";
import { ParkId, ParkData, Attraction } from "@/types";
import { TodayParkHours } from "@/app/api/park-hours/route";
import { getMonthCalendar, predictCrowd, CROWD_INFO } from "@/lib/crowd-prediction";
import { MapPin, Clock } from "lucide-react";

// ===== 型定義 =====
type TimeSlot = "morning" | "afternoon" | "evening" | "closed";

interface CourseAttraction {
  attraction: Attraction;
  comment: string;
}

interface Course {
  slot: TimeSlot;
  label: string;
  title: string;
  items: CourseAttraction[];
  advice: string;
}

// ===== TDL 人気アトラクションID（待ち時間が高くなりやすい順） =====
const TDL_POPULAR_IDS = [
  197, // 美女と野獣
  174, // プーさんのハニーハント
  196, // ベイマックスのハッピーライド
  164, // ピーター・パン空の旅
  189, // モンスターズ・インク
  183, // スター・ツアーズ
  160, // ビッグサンダー・マウンテン
  162, // スプラッシュ・マウンテン
  171, // ホーンテッドマンション
  167, // ミッキーのフィルハーマジック
];

// ===== TDS 人気アトラクションID =====
const TDS_POPULAR_IDS = [
  219, // ソアリン
  255, // アナとエルサのフローズンジャーニー
  256, // ラプンツェルのランタンフェスティバル
  257, // ピーター・パンのネバーランドアドベンチャー
  243, // タワー・オブ・テラー
  222, // インディ・ジョーンズ
  223, // センター・オブ・ジ・アース
  218, // トイ・ストーリー・マニア！
  242, // レイジングスピリッツ
  247, // ニモ＆フレンズ・シーライダー
];

// ===== 時間帯判定 =====
function getTimeSlot(now: Date, open: string, close: string): TimeSlot {
  const [oh, om] = open.split(":").map(Number);
  const [ch, cm] = close.split(":").map(Number);
  const totalMin = now.getHours() * 60 + now.getMinutes();
  const openMin = oh * 60 + om;
  const closeMin = ch * 60 + cm;

  if (totalMin < openMin || totalMin >= closeMin) return "closed";
  if (totalMin < openMin + 240) return "morning"; // 開園〜+4h
  if (totalMin < openMin + 420) return "afternoon"; // +4h〜+7h
  return "evening";
}

// ===== 待ち時間コメント =====
function waitComment(waitTime: number, slot: TimeSlot, isPopular: boolean): string {
  if (waitTime === 0) return "今すぐ乗れる！";
  if (slot === "morning") {
    if (isPopular && waitTime <= 30) return "今が狙い目！";
    if (isPopular) return "混む前に急ごう！";
    return "開園ダッシュで制覇！";
  }
  if (slot === "afternoon") {
    if (waitTime <= 20) return "空いてる今がチャンス！";
    if (waitTime <= 40) return "比較的空いてます";
    return "少し待つけどおすすめ！";
  }
  // evening
  if (waitTime <= 20) return "閉園前の狙い目！";
  if (waitTime <= 40) return "夕方は少し落ち着いてます";
  return "空き次第すぐ並ぼう！";
}

// ===== コース生成 =====
function buildCourse(
  attractions: Attraction[],
  parkId: ParkId,
  slot: TimeSlot,
  crowdGrade: string
): Course {
  const popularIds = parkId === "tdl" ? TDL_POPULAR_IDS : TDS_POPULAR_IDS;
  const open = attractions.filter((a) => a.is_open);

  let items: CourseAttraction[] = [];

  if (slot === "morning") {
    // 人気アトラクションを優先。待ち時間が短い順に並べる
    const popular = popularIds
      .map((id) => open.find((a) => a.id === id))
      .filter((a): a is Attraction => a !== undefined)
      .sort((a, b) => a.wait_time - b.wait_time)
      .slice(0, 5);

    // 人気アトラクションが足りない場合は一般からも補完
    const remaining = open
      .filter((a) => !popularIds.includes(a.id))
      .sort((a, b) => b.wait_time - a.wait_time);

    const merged = [...popular, ...remaining].slice(0, 5);
    items = merged.map((a) => ({
      attraction: a,
      comment: waitComment(a.wait_time, slot, popularIds.includes(a.id)),
    }));
  } else if (slot === "afternoon") {
    // 待ち時間30分以下を中心に、短い順
    const shortWait = open
      .filter((a) => a.wait_time <= 30 && a.wait_time >= 0)
      .sort((a, b) => a.wait_time - b.wait_time)
      .slice(0, 5);

    // 不足時は全体から補完
    if (shortWait.length < 3) {
      const extra = open
        .filter((a) => !shortWait.includes(a))
        .sort((a, b) => a.wait_time - b.wait_time)
        .slice(0, 5 - shortWait.length);
      shortWait.push(...extra);
    }

    items = shortWait.map((a) => ({
      attraction: a,
      comment: waitComment(a.wait_time, slot, popularIds.includes(a.id)),
    }));
  } else {
    // evening: 待ち時間が短いもの 3〜4本
    const short = open
      .filter((a) => a.wait_time >= 0)
      .sort((a, b) => a.wait_time - b.wait_time)
      .slice(0, 4);

    items = short.map((a) => ({
      attraction: a,
      comment: waitComment(a.wait_time, slot, popularIds.includes(a.id)),
    }));
  }

  // アドバイス
  const adviceMap: Record<string, Record<TimeSlot, string>> = {
    A: {
      morning:   "今日はかなり空いています！人気アトラクションも余裕で楽しめそう。",
      afternoon: "空き日ならでは！人気エリアも午後からゆっくり回れます。",
      evening:   "夕方も空いてます。閉園まで走り抜けよう！",
      closed:    "",
    },
    B: {
      morning:   "比較的空いているので、開園ダッシュで人気アトラクションを攻略しよう！",
      afternoon: "午後もほどよく空いています。待ち時間の少ない今のうちに！",
      evening:   "夕方は待ち時間が落ち着いてきます。コンパクトに楽しもう。",
      closed:    "",
    },
    C: {
      morning:   "普通の混雑。開園直後は比較的空いているのでお早めに！",
      afternoon: "混んできたら待ち時間が短いアトラクションへ切り替えを。",
      evening:   "夕方は少し待ちが緩和されます。効率よく回りましょう。",
      closed:    "",
    },
    D: {
      morning:   "やや混雑。人気アトラクションは開園直後が勝負です！",
      afternoon: "待ち時間が長くなりがち。短いものを中心に回るのが賢い選択。",
      evening:   "閉園に向けて待ちが緩和される場合も。夕方は狙い目！",
      closed:    "",
    },
    E: {
      morning:   "混雑日！開園前に並んで一番乗りを狙おう。",
      afternoon: "かなり待ちが発生中。待ち時間15分以下を中心に組み立てて。",
      evening:   "夕方〜閉園前が今日のチャンスタイム！短いもの優先で。",
      closed:    "",
    },
    F: {
      morning:   "超混雑日！開園ダッシュ必須。ファストパス系も即確保を。",
      afternoon: "長蛇の列が予想されます。焦らず待ち時間の短いものへ。",
      evening:   "夕方に少し落ち着くことも。ラスト1〜2時間が狙い目。",
      closed:    "",
    },
    S: {
      morning:   "最上級の混雑！覚悟を持って挑みましょう。開園直後が唯一のチャンス。",
      afternoon: "ほぼ全アトラクションで長蛇の列。待ち時間短めのものだけ狙って。",
      evening:   "閉園前は比較的マシになることも。残り時間で精鋭アトラクションへ。",
      closed:    "",
    },
  };

  const gradeInfo = (adviceMap[crowdGrade] ?? adviceMap["C"]);
  const advice = gradeInfo[slot] ?? "";

  const slotMeta: Record<Exclude<TimeSlot, "closed">, { label: string; title: string }> = {
    morning:   { label: "午前",   title: "人気を制覇！午前の王道コース" },
    afternoon: { label: "午後",   title: "待ち時間短め！午後のおすすめコース" },
    evening:   { label: "夕方",   title: "閉園前ラストスパート！夕方コンパクトコース" },
  };

  const meta = slotMeta[slot as Exclude<TimeSlot, "closed">];

  return {
    slot,
    label: meta.label,
    title: meta.title,
    items,
    advice,
  };
}

// ===== TDL 固定アトラクションリスト（明日のコース用） =====
const TDL_FIXED_ATTRACTIONS = [
  { id: 197, name: "美女と野獣・魔法のものがたり" },
  { id: 196, name: "ベイマックスのハッピーライド" },
  { id: 174, name: "プーさんのハニーハント" },
  { id: 164, name: "ピーター・パン空の旅" },
  { id: 160, name: "ビッグサンダー・マウンテン" },
  { id: 171, name: "ホーンテッドマンション" },
  { id: 162, name: "スプラッシュ・マウンテン" },
  { id: 189, name: "モンスターズ・インク" },
  { id: 183, name: "スター・ツアーズ" },
  { id: 167, name: "ミッキーのフィルハーマジック" },
];

// ===== TDS 固定アトラクションリスト（明日のコース用） =====
const TDS_FIXED_ATTRACTIONS = [
  { id: 219, name: "ソアリン：ファンタスティック・フライト" },
  { id: 255, name: "アナとエルサのフローズンジャーニー" },
  { id: 256, name: "ラプンツェルのランタンフェスティバル" },
  { id: 257, name: "ピーター・パンのネバーランドアドベンチャー" },
  { id: 243, name: "タワー・オブ・テラー" },
  { id: 222, name: "インディ・ジョーンズ・アドベンチャー" },
  { id: 223, name: "センター・オブ・ジ・アース" },
  { id: 218, name: "トイ・ストーリー・マニア！" },
  { id: 242, name: "レイジングスピリッツ" },
  { id: 247, name: "ニモ＆フレンズ・シーライダー" },
];

interface TomorrowCourseItem {
  name: string;
  section: "morning" | "afternoon";
}

interface TomorrowCourse {
  items: TomorrowCourseItem[];
  advice: string;
}

// ===== 明日のコース生成（固定リストベース） =====
function buildTomorrowCourse(parkId: ParkId, grade: string): TomorrowCourse {
  const list = parkId === "tdl" ? TDL_FIXED_ATTRACTIONS : TDS_FIXED_ATTRACTIONS;

  let morningItems: string[];
  let afternoonItems: string[];
  let advice: string;

  if (grade === "A" || grade === "B") {
    // 空いている日: 人気順に全部回れる
    morningItems = list.slice(0, 4).map((a) => a.name);
    afternoonItems = list.slice(4, 8).map((a) => a.name);
    advice = "明日は比較的空いています。人気アトラクションもじっくり楽しめそう！開園に合わせて到着でOK。";
  } else if (grade === "C" || grade === "D") {
    // 普通〜やや混雑: 午前に人気を、午後に中堅を
    morningItems = list.slice(0, 3).map((a) => a.name);
    afternoonItems = list.slice(5, 8).map((a) => a.name);
    advice = "明日は混雑が予想されます。開園30分前の到着がおすすめです。午前中に人気アトラクションを優先しましょう。";
  } else {
    // E〜S: 朝一番勝負、DPA優先の戦略コース
    morningItems = list.slice(0, 2).map((a) => a.name);
    afternoonItems = list.slice(6, 9).map((a) => a.name);
    advice =
      grade === "S"
        ? "明日は超混雑が予想されます！開園1時間前の到着で朝一番勝負。DPA対象アトラクションは即確保が必須です。"
        : "明日はかなり混雑する見込みです。開園45分前の到着を推奨。午前の2〜3本を押さえたら午後は待ち時間の短いものへ。";
  }

  const items: TomorrowCourseItem[] = [
    ...morningItems.map((name): TomorrowCourseItem => ({ name, section: "morning" })),
    ...afternoonItems.map((name): TomorrowCourseItem => ({ name, section: "afternoon" })),
  ];

  return { items, advice };
}

// ===== 待ち時間バッジ色 =====
function waitBadgeClass(minutes: number): string {
  if (minutes === 0) return "bg-green-100 text-green-700";
  if (minutes <= 20) return "bg-green-100 text-green-700";
  if (minutes <= 40) return "bg-yellow-100 text-yellow-700";
  if (minutes <= 60) return "bg-orange-100 text-orange-700";
  return "bg-red-100 text-red-700";
}

// ===== 時間帯カラー =====
const SLOT_COLORS: Record<Exclude<TimeSlot, "closed">, { header: string; badge: string; dot: string }> = {
  morning:   { header: "from-blue-500 to-sky-400",    badge: "bg-blue-100 text-blue-700",   dot: "bg-blue-400" },
  afternoon: { header: "from-orange-400 to-amber-400", badge: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
  evening:   { header: "from-purple-500 to-violet-400", badge: "bg-purple-100 text-purple-700", dot: "bg-purple-400" },
};

// ===== スケルトン =====
function Skeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-16 bg-gray-200" />
      <div className="p-4 space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 h-4 rounded bg-gray-200" />
            <div className="w-16 h-6 rounded-full bg-gray-200 shrink-0" />
          </div>
        ))}
        <div className="h-12 rounded-xl bg-gray-100 mt-2" />
      </div>
    </div>
  );
}

// ===== メインコンポーネント =====
interface Props {
  parkId: ParkId;
}

const DEFAULT_HOURS: TodayParkHours = {
  tdl: { open: "9:00", close: "21:00" },
  tds: { open: "9:00", close: "21:00" },
};

export function RecommendedCourse({ parkId }: Props) {
  const [data, setData] = useState<ParkData | null>(null);
  const [hours, setHours] = useState<TodayParkHours>(DEFAULT_HOURS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // デフォルト時間で即座に時間帯を判定
  const now = new Date();
  const initialSlot = getTimeSlot(now, DEFAULT_HOURS[parkId].open, DEFAULT_HOURS[parkId].close);

  useEffect(() => {
    // 閉園後・開園前は wait-times 不要 → park-hours だけ取得して即表示
    if (initialSlot === "closed") {
      fetch("/api/park-hours")
        .then((r) => (r.ok ? (r.json() as Promise<TodayParkHours>) : DEFAULT_HOURS))
        .catch(() => DEFAULT_HOURS)
        .then((ph) => setHours(ph))
        .finally(() => setLoading(false));
      return;
    }

    // 開園中は wait-times + park-hours を並列取得
    setLoading(true);
    setError(false);
    Promise.all([
      fetch(`/api/wait-times/${parkId}`).then((r) => {
        if (!r.ok) throw new Error("wait-times error");
        return r.json() as Promise<ParkData>;
      }),
      fetch("/api/park-hours")
        .then((r) => (r.ok ? (r.json() as Promise<TodayParkHours>) : DEFAULT_HOURS))
        .catch(() => DEFAULT_HOURS),
    ])
      .then(([pd, ph]) => {
        setData(pd);
        setHours(ph);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [parkId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) return null;

  const parkHour = hours[parkId];
  if (!parkHour) return null;

  const slot = getTimeSlot(now, parkHour.open, parkHour.close);

  // 開園中でロード中はスケルトン
  if (loading && slot !== "closed") return <Skeleton />;

  if (slot === "closed") {
    // 開園前・閉園後は「明日のおすすめコース予報」を表示
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowGrade = predictCrowd(tomorrow);
    const tomorrowCrowdInfo = CROWD_INFO[tomorrowGrade];
    const tomorrowCourse = buildTomorrowCourse(parkId, tomorrowGrade);

    const tomorrowMorning = tomorrowCourse.items.filter((i) => i.section === "morning");
    const tomorrowAfternoon = tomorrowCourse.items.filter((i) => i.section === "afternoon");

    return (
      <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)" }}>
        {/* ヘッダー */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-base">🗺️</span>
            <span className="text-white font-bold text-sm">明日のおすすめコース予報</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-1">
            <span className="text-white/80 text-xs">混雑予測</span>
            <span className={`text-xs font-extrabold px-1.5 py-0.5 rounded ${tomorrowCrowdInfo.bgColor} ${tomorrowCrowdInfo.color}`}>
              {tomorrowGrade}
            </span>
            <span className="text-white/80 text-xs">{tomorrowCrowdInfo.label}</span>
          </div>
        </div>

        {/* コース本体 */}
        <div className="p-4 space-y-4">
          {/* 午前セクション */}
          <div>
            <p className="text-xs font-bold text-indigo-200 mb-2">【午前】人気アトラクションを早めに押さえよう</p>
            <div className="space-y-2">
              {tomorrowMorning.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-400/60 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-white/90 leading-tight">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 午後セクション */}
          <div>
            <p className="text-xs font-bold text-purple-200 mb-2">【午後】混雑が落ち着いたら</p>
            <div className="space-y-2">
              {tomorrowAfternoon.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-purple-400/60 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {tomorrowMorning.length + index + 1}
                  </div>
                  <p className="text-sm text-white/90 leading-tight">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* アドバイス */}
          <div className="rounded-xl bg-white/10 px-3 py-2.5 flex items-start gap-2">
            <span className="text-sm shrink-0">💡</span>
            <p className="text-xs text-white/80 leading-relaxed">{tomorrowCourse.advice}</p>
          </div>
        </div>
      </div>
    );
  }

  const today = new Date();
  const days = getMonthCalendar(today.getFullYear(), today.getMonth() + 1);
  const todayEntry = days.find((d) => d.date.getDate() === today.getDate());
  const grade = todayEntry?.grade ?? "C";
  const crowdInfo = CROWD_INFO[grade];

  const course = buildCourse(data.attractions, parkId, slot, grade);
  const colors = SLOT_COLORS[slot];

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
      {/* ヘッダー */}
      <div className={`bg-gradient-to-r ${colors.header} px-4 py-3 flex items-center justify-between`}>
        <div>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.badge} mr-2`}>
            {course.label}コース
          </span>
          <span className="text-white font-bold text-sm">{course.title}</span>
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-white/20 text-white`}>
          <span>混雑</span>
          <span className={`font-extrabold ${crowdInfo.color} bg-white px-1.5 rounded text-sm`}>{grade}</span>
        </div>
      </div>

      {/* アトラクションリスト */}
      <div className="p-4 space-y-2.5">
        {course.items.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-2">現在営業中のアトラクションがありません</p>
        ) : (
          course.items.map((item, index) => (
            <div key={item.attraction.id} className="flex items-center gap-3">
              {/* 順番 */}
              <div className={`w-6 h-6 rounded-full ${colors.dot} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                {index + 1}
              </div>

              {/* アトラクション名・コメント */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate leading-tight">
                  {item.attraction.nameJa}
                </p>
                <p className="text-xs text-gray-500 leading-tight">{item.comment}</p>
              </div>

              {/* 待ち時間バッジ */}
              <div className={`flex items-center gap-0.5 px-2 py-1 rounded-full text-xs font-bold shrink-0 ${waitBadgeClass(item.attraction.wait_time)}`}>
                {item.attraction.wait_time === 0 ? (
                  <span>待ちなし</span>
                ) : (
                  <>
                    <Clock className="w-3 h-3" />
                    <span>{item.attraction.wait_time}分</span>
                  </>
                )}
              </div>
            </div>
          ))
        )}

        {/* アドバイス */}
        {course.advice && (
          <div className="mt-3 rounded-xl bg-gray-50 px-3 py-2.5 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">{course.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}

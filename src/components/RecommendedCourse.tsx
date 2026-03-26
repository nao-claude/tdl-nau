"use client";

import { useEffect, useState } from "react";
import { ParkId, ParkData, Attraction } from "@/types";
import { TodayParkHours } from "@/app/api/park-hours/route";
import { getMonthCalendar, CROWD_INFO } from "@/lib/crowd-prediction";
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

export function RecommendedCourse({ parkId }: Props) {
  const [data, setData] = useState<ParkData | null>(null);
  const [hours, setHours] = useState<TodayParkHours>({
    tdl: { open: "9:00", close: "21:00" },
    tds: { open: "9:00", close: "21:00" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    Promise.all([
      fetch(`/api/wait-times/${parkId}`).then((r) => {
        if (!r.ok) throw new Error("wait-times error");
        return r.json() as Promise<ParkData>;
      }),
      fetch("/api/park-hours").then((r) => {
        if (!r.ok) throw new Error("park-hours error");
        return r.json() as Promise<TodayParkHours>;
      }),
    ])
      .then(([pd, ph]) => {
        setData(pd);
        setHours(ph);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [parkId]);

  if (error) return null;
  if (loading) return <Skeleton />;
  if (!data) return null;

  const parkHour = hours[parkId];
  if (!parkHour) return null;

  const now = new Date();
  const slot = getTimeSlot(now, parkHour.open, parkHour.close);

  if (slot === "closed") {
    // 開園前・閉園後はプレースホルダー
    const [oh] = parkHour.open.split(":").map(Number);
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const openMin = oh * 60;
    const isBefore = nowMin < openMin;

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center text-gray-400">
        <p className="text-2xl mb-1">🏰</p>
        <p className="font-semibold text-gray-600 text-sm">
          {isBefore ? "本日の開園に向けて準備中です" : "本日の営業は終了しました"}
        </p>
        <p className="text-xs mt-1">
          {isBefore
            ? `開園 ${parkHour.open} にコースをご案内します`
            : `また明日のご来園をお待ちしています`}
        </p>
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

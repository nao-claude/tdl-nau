"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Hotel, X } from "lucide-react";
import { getMonthCalendar, CROWD_INFO, CrowdGrade } from "@/lib/crowd-prediction";
import { CROWD_INFO_EN } from "@/lib/i18n/crowd-info-en";
import { getHolidayName } from "@/lib/holidays";
import { DayWeather } from "@/app/api/weather/route";
import { DayTicketPrice } from "@/app/api/ticket-prices/route";

function hotelLinks(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  const nextDay  = new Date(Number(y), Number(m) - 1, Number(d) + 1);
  const co_y = String(nextDay.getFullYear());
  const co_m = String(nextDay.getMonth() + 1).padStart(2, "0");
  const co_d = String(nextDay.getDate()).padStart(2, "0");

  const kw = "%95%91%95%6C";
  const jalanUrl =
    `https://www.jalan.net/uw/uwp2011/uww2011init.do` +
    `?keyword=${kw}&distCd=06&rootCd=7701` +
    `&stayYear=${y}&stayMonth=${Number(m)}&stayDay=${Number(d)}` +
    `&adultNum=2&roomNum=1`;

  return {
    jalan: `https://px.a8.net/svt/ejp?a8mat=4AZLSM+5N0U2A+14CS+64RJ5&a8ejpredirect=${encodeURIComponent(jalanUrl)}`,
    rakuten: `https://hb.afl.rakuten.co.jp/hgc/522dc3a1.a8f621bb.522dc3a2.b6743386/?pc=${encodeURIComponent(`https://search.travel.rakuten.co.jp/ds/vacant/searchVacant?f_dai=japan&f_chu=tiba&f_shou=keiyo&f_teikei=rss&f_nen1=${y}&f_tuki1=${Number(m)}&f_hi1=${Number(d)}&f_nen2=${co_y}&f_tuki2=${Number(co_m)}&f_hi2=${Number(co_d)}&f_heya_su=1&f_otona_su=2`)}`,
  };
}

function wmoToEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code <= 3) return "☁️";
  if (code <= 49) return "🌫️";
  if (code <= 57) return "🌦️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "🌨️";
  if (code <= 82) return "🌧️";
  if (code <= 86) return "🌨️";
  return "⛈️";
}

const PRICE_TIERS: { price: number; bg: string; text: string; dot: string }[] = [
  { price:  7900, bg: "bg-sky-100",    text: "text-sky-700",    dot: "#38bdf8" },
  { price:  8400, bg: "bg-green-100",  text: "text-green-700",  dot: "#4ade80" },
  { price:  8900, bg: "bg-yellow-100", text: "text-yellow-700", dot: "#facc15" },
  { price:  9400, bg: "bg-orange-100", text: "text-orange-700", dot: "#fb923c" },
  { price:  9900, bg: "bg-red-100",    text: "text-red-700",    dot: "#f87171" },
  { price: 10900, bg: "bg-purple-100", text: "text-purple-700", dot: "#c084fc" },
];

function priceTier(price: number) {
  return PRICE_TIERS.find((t) => t.price === price)
    ?? { bg: "bg-gray-100", text: "text-gray-600", dot: "transparent" };
}

const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PARK_ATTRACTIONS_EN: Record<string, string> = {
  tdl: "Pooh's Hunny Hunt, Beauty and the Beast, Big Thunder Mountain, Splash Mountain, Monsters Inc.",
  tds: "Soaring, Center of the Earth, Toy Story Mania!, Tower of Terror, Indiana Jones",
};

export function CrowdCalendarEn({ parkId = "tdl" }: { parkId?: string }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [weatherMap, setWeatherMap] = useState<Map<string, DayWeather>>(new Map());
  const [priceMap, setPriceMap] = useState<Map<string, number>>(new Map());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/weather?year=${year}&month=${month}`)
      .then((r) => r.json())
      .then((data: DayWeather[]) => {
        const map = new Map<string, DayWeather>();
        data.forEach((d) => map.set(d.date, d));
        setWeatherMap(map);
      })
      .catch(() => {});
  }, [year, month]);

  useEffect(() => {
    fetch(`/api/ticket-prices?year=${year}&month=${month}`)
      .then((r) => r.json())
      .then((data: DayTicketPrice[]) => {
        const map = new Map<string, number>();
        data.forEach((d) => {
          const price = parkId === "tdl" ? d.tdlPrice : d.tdsPrice;
          if (price) map.set(d.date, price);
        });
        setPriceMap(map);
      })
      .catch(() => {});
  }, [year, month, parkId]);

  const days = getMonthCalendar(year, month);
  const firstDayOfWeek = days[0].date.getDay();

  const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else setMonth(m => m + 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-base font-bold text-gray-800">
          {MONTHS_EN[month - 1]} {year} Crowd Forecast
        </h3>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg">
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS_EN.map((w, i) => (
          <div key={w} className={`text-center text-xs font-medium py-1 ${i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-gray-500"}`}>
            {w}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map(({ date, grade }) => {
          const info = CROWD_INFO[grade];
          const isToday =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
          const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const weekday = date.getDay();
          const holidayName = getHolidayName(date);
          const pad = (n: number) => String(n).padStart(2, "0");
          const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
          const weather = weatherMap.get(dateStr);
          const price = priceMap.get(dateStr) ?? null;
          const tier = price ? priceTier(price) : null;

          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={date.getDate()}
              onClick={() => !isPast && setSelectedDate(isSelected ? null : dateStr)}
              className={`
                relative flex flex-col items-center rounded-lg py-1.5 px-0.5 text-center gap-0.5 w-full
                ${isPast ? "opacity-40 cursor-default" : "cursor-pointer hover:brightness-95 active:scale-95 transition-transform"}
                ${info.bgColor}
                ${isToday ? "ring-2 ring-gray-800 ring-offset-1" : ""}
                ${isSelected ? "ring-2 ring-blue-500 ring-offset-1" : ""}
              `}
            >
              <span className={`font-bold leading-none ${holidayName ? "text-red-600" : weekday === 0 ? "text-red-500" : weekday === 6 ? "text-blue-500" : "text-gray-700"}`} style={{ fontSize: "16px" }}>
                {date.getDate()}
              </span>
              <span className={`text-base font-extrabold leading-none ${info.color}`}>
                {grade}
              </span>
              <span className="leading-none" style={{ fontSize: "13px" }}>
                {weather ? wmoToEmoji(weather.code) : "　"}
              </span>
              <span className="text-gray-600 font-medium leading-none" style={{ fontSize: "11px" }}>
                {weather ? `${weather.maxTemp}°` : "　"}
              </span>
              {tier ? (
                <span className={`font-bold leading-none px-0.5 rounded ${tier.bg} ${tier.text}`} style={{ fontSize: "9px" }}>
                  ¥{(price! / 1000).toFixed(1)}k
                </span>
              ) : (
                <span style={{ fontSize: "9px" }}>&nbsp;</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected date detail panel */}
      {selectedDate && (() => {
        const [sy, sm, sd] = selectedDate.split("-").map(Number);
        const selDate = new Date(sy, sm - 1, sd);
        const selGrade = getMonthCalendar(sy, sm).find(d => d.date.getDate() === sd)?.grade ?? "C";
        const selInfo = CROWD_INFO[selGrade];
        const selInfoEn = CROWD_INFO_EN[selGrade];
        const selWeather = weatherMap.get(selectedDate);
        const selPrice = priceMap.get(selectedDate);
        const selTier = selPrice ? priceTier(selPrice) : null;
        const selHoliday = getHolidayName(selDate);
        const weekLabel = WEEKDAYS_EN[selDate.getDay()];
        const links = hotelLinks(selectedDate);
        const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return (
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold text-gray-800 text-sm">
                  {MONTHS_SHORT[sm - 1]} {sd} ({weekLabel})
                  {selHoliday && <span className="ml-1.5 text-xs text-red-500">{selHoliday}</span>}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`text-lg font-extrabold ${selInfo.color}`}>{selGrade}</span>
                  <span className="text-xs text-gray-500">{selInfoEn.label} ({selInfoEn.avgWait})</span>
                  {selWeather && <span className="text-sm">{wmoToEmoji(selWeather.code)} {selWeather.maxTemp}° / {selWeather.minTemp}°</span>}
                  {selPrice && selTier && (
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${selTier.bg} ${selTier.text}`}>
                      ¥{selPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => setSelectedDate(null)} className="text-gray-400 hover:text-gray-600 shrink-0 ml-2">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Hotel affiliate links */}
            <div className="border-t border-blue-200 pt-2 mt-2">
              <p className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
                <Hotel className="w-3.5 h-3.5" />Find hotels near Maihama for this date
              </p>
              <div className="flex gap-2 flex-wrap">
                <a
                  href={links.jalan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-bold py-2 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                >
                  Search on Jalan
                </a>
                <a
                  href={links.rakuten}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-bold py-2 px-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                >
                  Rakuten Travel
                </a>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-gray-100 space-y-3">
        {/* Crowd levels */}
        <div>
          <p className="text-xs text-gray-500 mb-1.5 font-medium">Crowd Level Guide</p>
          <div className="grid grid-cols-2 gap-1">
            {(Object.keys(CROWD_INFO) as CrowdGrade[]).map((grade) => {
              const info = CROWD_INFO[grade];
              const infoEn = CROWD_INFO_EN[grade];
              return (
                <div key={grade} className="flex items-center gap-1.5 text-xs">
                  <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs ${info.bgColor} ${info.color}`}>
                    {grade}
                  </span>
                  <span className="text-gray-600">{infoEn.label} ({infoEn.avgWait})</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ticket price tiers */}
        <div>
          <p className="text-xs text-gray-500 mb-1.5 font-medium">1-Day Passport Price (Adult) ● = Daily Price</p>
          <div className="flex flex-wrap gap-2">
            {PRICE_TIERS.map((t) => (
              <div key={t.price} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: t.dot }} />
                <span className={`text-xs font-bold ${t.text}`}>¥{t.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">※ From Tokyo Disney Resort official site</p>
        </div>

        {/* Wait time explanation */}
        <div className="bg-gray-50 rounded-lg p-2.5 text-xs text-gray-500 leading-relaxed">
          <span className="font-medium text-gray-600">About &quot;min&quot;: </span>
          Average wait time estimate for popular attractions including {PARK_ATTRACTIONS_EN[parkId]}.
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2">※ Predictions based on day of week, holidays, and seasonal events</p>
    </div>
  );
}

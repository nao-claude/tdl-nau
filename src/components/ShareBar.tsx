"use client";

interface Props {
  url?: string;
  text?: string;
}

export function ShareBar({
  url = "https://disneynow.tokyo",
  text = "ディズニーランド・シーのリアルタイム待ち時間をチェック！",
}: Props) {
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "TDLなう", text, url });
        return;
      } catch {
        // キャンセル時は何もしない
      }
    }
    // フォールバック：Xシェア
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(xUrl, "_blank", "noopener,noreferrer");
  };

  const handleBookmark = () => {
    alert("ブラウザのブックマーク機能（⌘D / Ctrl+D）またはホーム画面に追加してお気に入り登録できます。");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors"
        aria-label="シェア"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        シェア
      </button>
      <button
        onClick={handleBookmark}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-bold hover:border-gray-400 transition-colors"
        aria-label="ブックマーク"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        ブックマーク
      </button>
    </div>
  );
}

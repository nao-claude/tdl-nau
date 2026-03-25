"use client";

import { useRouter } from "next/navigation";

interface Props {
  currentLocale: "ja" | "en";
}

export function LocaleSwitcher({ currentLocale }: Props) {
  const router = useRouter();

  const switchToJa = () => {
    // Set cookie to remember user's choice
    document.cookie = "preferred-locale=ja; path=/; max-age=31536000; SameSite=Lax";
    router.push("/");
  };

  const switchToEn = () => {
    document.cookie = "preferred-locale=en; path=/; max-age=31536000; SameSite=Lax";
    router.push("/en");
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={switchToJa}
        className={`px-2 py-1 rounded transition-colors text-sm ${
          currentLocale === "ja"
            ? "bg-blue-100 text-blue-700 font-medium border border-blue-200"
            : "text-gray-400 hover:text-gray-600 border border-transparent"
        }`}
        aria-label="日本語に切り替え"
      >
        🇯🇵 JP
      </button>
      <span className="text-gray-300 text-xs">|</span>
      <button
        onClick={switchToEn}
        className={`px-2 py-1 rounded transition-colors text-sm ${
          currentLocale === "en"
            ? "bg-blue-100 text-blue-700 font-medium border border-blue-200"
            : "text-gray-400 hover:text-gray-600 border border-transparent"
        }`}
        aria-label="Switch to English"
      >
        🇺🇸 EN
      </button>
    </div>
  );
}

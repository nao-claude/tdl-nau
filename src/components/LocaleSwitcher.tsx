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
        className={`px-2 py-1 rounded transition-colors ${
          currentLocale === "ja"
            ? "bg-gray-900 text-white font-bold"
            : "text-gray-500 hover:text-gray-700"
        }`}
        aria-label="日本語に切り替え"
      >
        🇯🇵 JP
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={switchToEn}
        className={`px-2 py-1 rounded transition-colors ${
          currentLocale === "en"
            ? "bg-gray-900 text-white font-bold"
            : "text-gray-500 hover:text-gray-700"
        }`}
        aria-label="Switch to English"
      >
        🇺🇸 EN
      </button>
    </div>
  );
}

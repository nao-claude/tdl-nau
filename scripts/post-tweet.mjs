#!/usr/bin/env node
// 環境変数 TWEET_TEXT の内容をそのまま投稿する汎用スクリプト
import { TwitterApi } from "twitter-api-v2";

async function main() {
  const { X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET, TWEET_TEXT: text } = process.env;

  if (!X_API_KEY || !X_API_SECRET || !X_ACCESS_TOKEN || !X_ACCESS_TOKEN_SECRET) {
    throw new Error("X API credentials missing");
  }
  if (!text) throw new Error("TWEET_TEXT is empty");

  const client = new TwitterApi({
    appKey: X_API_KEY,
    appSecret: X_API_SECRET,
    accessToken: X_ACCESS_TOKEN,
    accessSecret: X_ACCESS_TOKEN_SECRET,
  });

  console.log("Posting:\n" + text);
  const result = await client.v2.tweet(text);
  console.log("Posted:", result.data.id);
}

main().catch(e => { console.error(e); process.exit(1); });

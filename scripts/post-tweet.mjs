#!/usr/bin/env node
// 環境変数 TWEET_TEXT の内容をそのまま投稿する汎用スクリプト
import crypto from "crypto";

function enc(s) { return encodeURIComponent(String(s)); }

function oauthSign(method, url, params, cSecret, tSecret) {
  const sorted = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${enc(k)}=${enc(v)}`)
    .join("&");
  const base = [method, enc(url), enc(sorted)].join("&");
  const key = `${enc(cSecret)}&${enc(tSecret)}`;
  return crypto.createHmac("sha1", key).update(base).digest("base64");
}

async function main() {
  const { X_API_KEY: ck, X_API_SECRET: cs, X_ACCESS_TOKEN: at, X_ACCESS_TOKEN_SECRET: ats, TWEET_TEXT: text } = process.env;

  if (!ck || !cs || !at || !ats) throw new Error("X API credentials missing");
  if (!text) throw new Error("TWEET_TEXT is empty");

  const url = "https://api.twitter.com/2/tweets";
  const nonce = crypto.randomBytes(16).toString("hex");
  const ts = String(Math.floor(Date.now() / 1000));
  const p = { oauth_consumer_key: ck, oauth_nonce: nonce, oauth_signature_method: "HMAC-SHA1", oauth_timestamp: ts, oauth_token: at, oauth_version: "1.0" };
  p.oauth_signature = oauthSign("POST", url, p, cs, ats);
  const auth = "OAuth " + Object.entries(p).map(([k, v]) => `${enc(k)}="${enc(v)}"`).join(", ");

  console.log("Posting:\n" + text);
  const res = await fetch(url, { method: "POST", headers: { Authorization: auth, "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
  const json = await res.json();
  if (!res.ok) throw new Error(`${res.status} ${JSON.stringify(json)}`);
  console.log("Posted:", json.data?.id);
}

main().catch(e => { console.error(e); process.exit(1); });

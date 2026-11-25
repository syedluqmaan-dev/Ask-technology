/**
 * IndexNow: tells Bing, Yandex, Seznam and Naver that a page changed, so it is recrawled within minutes.
 * (Google does not use IndexNow; it reads the sitemap, which is updated on every publish.)
 */
export async function pingIndexNow(paths: string[]) {
  const key = process.env.INDEXNOW_KEY;
  const base = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!key || !base || process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") return;
  const host = new URL(base).host;
  const urlList = paths.map((p) => new URL(p, base).toString()).slice(0, 100);
  if (!urlList.length) return;
  await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `${base}/indexnow-key.txt`, urlList }),
    signal: AbortSignal.timeout(5000),
  });
}

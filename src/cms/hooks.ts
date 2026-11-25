import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";
import { pingIndexNow } from "@/lib/indexnow";

/**
 * After a publish, refresh the whole website cache in the background (pages are rebuilt on their next visit)
 * and tell Bing and other IndexNow engines which URL changed. No rebuild or redeploy is needed.
 */
async function refresh(paths: string[] = []) {
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
  } catch {
    // Not running inside Next.js (for example the seed script): nothing to refresh.
  }
  if (paths.length) pingIndexNow(paths).catch(() => {});
}

type PathFn = (doc: Record<string, unknown>) => string | null;

export const afterChangeRefresh =
  (pathOf?: PathFn): CollectionAfterChangeHook =>
  async ({ doc, context }) => {
    if (context?.disableRevalidate) return doc;
    const published = !("_status" in doc) || doc._status === "published";
    if (published) await refresh(pathOf ? [pathOf(doc)].filter(Boolean) as string[] : []);
    return doc;
  };

export const afterDeleteRefresh: CollectionAfterDeleteHook = async ({ context }) => {
  if (!context?.disableRevalidate) await refresh();
};

export const globalRefresh =
  (path?: string): GlobalAfterChangeHook =>
  async ({ doc, context }) => {
    if (context?.disableRevalidate) return doc;
    if (!("_status" in doc) || doc._status === "published") await refresh(path ? [path] : []);
    return doc;
  };

"use client";

import { useSyncExternalStore } from "react";

/** Media query as external state. Returns null during SSR / before hydration. */
export function useMediaQuery(query: string): boolean | null {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => null,
  );
}

const noop = () => () => {};
/** Data-saver preference (Network Information API, where available). */
export function useSaveData(): boolean | null {
  return useSyncExternalStore(
    noop,
    () => Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData),
    () => null,
  );
}

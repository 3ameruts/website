"use client";

import { useSyncExternalStore } from "react";

/**
 * Quote list — product ids the visitor wants priced. Persisted per browser.
 * Storage access is wrapped: private windows / blocked storage just fall back
 * to an in-memory list.
 */
const KEY = "jale.quote.v1";
type Item = { id: string; qty: number };

let items: Item[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      items = parsed
        .filter((x) => x && typeof x.id === "string")
        .map((x) => ({ id: x.id, qty: Math.max(1, Math.min(9999, Number(x.qty) || 1)) }));
    }
  } catch {
    items = [];
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable — keep in memory */
  }
}

/** Other tabs changed the list: reload once, notify everyone once. */
function onStorage(e: StorageEvent) {
  if (e.key !== KEY) return;
  loaded = false;
  load();
  listeners.forEach((l) => l());
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

export const quoteStore = {
  subscribe(listener: () => void) {
    load();
    listeners.add(listener);
    if (listeners.size === 1) window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) window.removeEventListener("storage", onStorage);
    };
  },
  get: () => {
    load();
    return items;
  },
  add(id: string) {
    if (items.some((i) => i.id === id)) return;
    items = [...items, { id, qty: 1 }];
    emit();
  },
  remove(id: string) {
    items = items.filter((i) => i.id !== id);
    emit();
  },
  setQty(id: string, qty: number) {
    items = items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(9999, Math.round(qty) || 1)) } : i));
    emit();
  },
  clear() {
    items = [];
    emit();
  },
};

const EMPTY: Item[] = [];
export function useQuoteList() {
  return useSyncExternalStore(quoteStore.subscribe, quoteStore.get, () => EMPTY);
}

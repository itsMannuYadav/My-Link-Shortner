"use client";

import { useCallback, useSyncExternalStore } from "react";

import { appConfig } from "@/lib/config";
import type { RecentLink } from "@/features/links/types";

const STORAGE_KEY = "my-link-recent-links";
const RECENT_LINKS_EVENT = "my-link-recent-links-updated";
const EMPTY_LINKS: RecentLink[] = [];

let cachedRaw: string | null | undefined;
let cachedLinks: RecentLink[] = EMPTY_LINKS;

function invalidateCache() {
  cachedRaw = undefined;
}

function readStoredLinks(): RecentLink[] {
  if (typeof window === "undefined") return EMPTY_LINKS;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw === cachedRaw) {
      return cachedLinks;
    }

    cachedRaw = raw;

    if (!raw) {
      cachedLinks = EMPTY_LINKS;
      return cachedLinks;
    }

    const parsed = JSON.parse(raw) as RecentLink[];
    cachedLinks = Array.isArray(parsed) ? parsed : EMPTY_LINKS;
    return cachedLinks;
  } catch {
    cachedRaw = null;
    cachedLinks = EMPTY_LINKS;
    return cachedLinks;
  }
}

function subscribe(onStoreChange: () => void) {
  const handler = () => {
    invalidateCache();
    onStoreChange();
  };

  window.addEventListener("storage", handler);
  window.addEventListener(RECENT_LINKS_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(RECENT_LINKS_EVENT, handler);
  };
}

function notifySubscribers() {
  invalidateCache();
  window.dispatchEvent(new Event(RECENT_LINKS_EVENT));
}

export function useRecentLinks() {
  const links = useSyncExternalStore(subscribe, readStoredLinks, () => EMPTY_LINKS);

  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const addLink = useCallback((link: RecentLink) => {
    const current = readStoredLinks();
    const filtered = current.filter((item) => item.shortCode !== link.shortCode);
    const next = [link, ...filtered].slice(0, appConfig.recentLinksLimit);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      notifySubscribers();
    } catch {
      // Storage may be unavailable in private mode
    }
  }, []);

  const clearLinks = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      notifySubscribers();
    } catch {
      // ignore
    }
  }, []);

  return { links, addLink, clearLinks, isHydrated };
}

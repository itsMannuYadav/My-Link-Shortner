"use client";

import { useCallback, useSyncExternalStore } from "react";

import { appConfig } from "@/lib/config";
import type { RecentLink } from "@/features/links/types";

const STORAGE_KEY = "my-link-recent-links";
const RECENT_LINKS_EVENT = "my-link-recent-links-updated";

function readStoredLinks(): RecentLink[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RecentLink[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(RECENT_LINKS_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(RECENT_LINKS_EVENT, handler);
  };
}

function notifySubscribers() {
  window.dispatchEvent(new Event(RECENT_LINKS_EVENT));
}

export function useRecentLinks() {
  const links = useSyncExternalStore(
    subscribe,
    readStoredLinks,
    () => [],
  );

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

export const RESERVED_ROUTES = new Set([
  "api",
  "admin",
  "dashboard",
  "login",
  "signup",
  "register",
  "settings",
  "about",
  "pricing",
  "features",
  "help",
  "support",
  "docs",
  "blog",
  "status",
  "privacy",
  "terms",
  "contact",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "_next",
]);

export const ALIAS_REGEX = /^[a-zA-Z0-9_-]+$/;
export const ALIAS_MIN_LENGTH = 3;
export const ALIAS_MAX_LENGTH = 32;

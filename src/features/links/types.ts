export interface ShortenLinkInput {
  url: string;
  alias?: string;
}

export interface ShortenLinkResult {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
}

export interface LinkRecord {
  id: string;
  shortCode: string;
  originalUrl: string;
  createdAt: Date;
}

export interface RecentLink {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
}

export interface ApiErrorResponse {
  error: string;
  code?: string;
}

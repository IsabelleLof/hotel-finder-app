// src/xotelo.ts
export type Sort = "best_value" | "popularity" | "distance";

export interface XoteloListItem {
  name?: string;
  key?: string; // hotel_key (använd i /rates)
  image?: string;
  url?: string;
  review_summary?: { rating?: number; count?: number };
}

export interface XoteloListResponse {
  error?: any;
  result?: { list?: XoteloListItem[] };
  timestamp?: number;
}

export async function xoteloList(params: {
  location_key: string; // ex: g297930
  offset?: string;
  limit?: string;
  sort?: Sort;
}) {
  const url = "/xotelo/list?" + new URLSearchParams({
    offset: "0",
    limit: "30",
    sort: "best_value",
    ...params,
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Xotelo list failed: ${res.status} ${res.statusText}`);
  return (await res.json()) as XoteloListResponse;
}


  

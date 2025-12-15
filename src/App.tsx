import { useEffect, useState } from "react";
import { xoteloList, type XoteloListItem } from "./xotelo";

export default function App() {
  const [results, setResults] = useState<XoteloListItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);

        const data = await xoteloList({
          location_key: "g297930",
          offset: "0",
          limit: "30",
          sort: "best_value",
        });

        const list = data.result?.list ?? [];
        setResults(list);

        console.log("Xotelo /list raw:", data);
        console.table(
          list.slice(0, 10).map((h) => ({
            name: h.name,
            hotel_key: h.key,
            rating: h.review_summary?.rating,
            reviews: h.review_summary?.count,
            image: h.image,
            url: h.url,
          }))
        );
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
        console.error(e);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Xotelo list</h1>
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <ul>
        {results.slice(0, 10).map((h, i) => (
          <li key={`${h.key ?? "no-key"}-${i}`} style={{ marginBottom: 12 }}>
            <strong>{h.name}</strong>
            {h.image && (
              <div>
                <img
                  src={h.image}
                  alt={h.name ?? "Hotel"}
                  style={{ width: 220, height: 140, objectFit: "cover", borderRadius: 8 }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}



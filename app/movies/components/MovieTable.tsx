"use client";

import { useEffect, useState, useCallback } from "react";

const PAGE_SIZE = 20;

type Movie = {
  id: string;
  title: string;
  genres: string[];
  imdb: { rating: number | null; votes: number | null } | null;
};

export default function MovieTable() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();

    params.set("limit", String(PAGE_SIZE));
    params.set("skip", String(page * PAGE_SIZE));

    const res = await fetch(`/api/movies?${params.toString()}`);
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    setMovies(data.movies ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [ page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);



  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Movies</h1>



      <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.75rem" }}>
        {loading ? "Loading..." : `${total.toLocaleString()} movies found`}
      </p>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
              <th style={th}>Title</th>
              <th style={th}>Genres</th>
              <th style={th}>IMDb Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={td}>{movie.title}</td>
                <td style={td}>{movie.genres?.join(", ") || "—"}</td>
                <td style={td}>
                  {movie.imdb?.rating != null ? (
                    <span style={{
                      fontWeight: 600,
                      color: movie.imdb.rating >= 7 ? "#16a34a" : movie.imdb.rating >= 5 ? "#d97706" : "#dc2626",
                    }}>
                      {movie.imdb.rating.toFixed(1)}
                    </span>
                  ) : "—"}
                </td>
              </tr>
            ))}
            {!loading && movies.length === 0 && (
              <tr>
                <td colSpan={4} style={{ ...td, textAlign: "center", color: "#9ca3af", padding: "2rem" }}>
                  No movies match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "1rem" }}>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            style={btnStyle(page === 0)}
          >
            ← Prev
          </button>
          <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            style={btnStyle(page >= totalPages - 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

const th: React.CSSProperties = {
  padding: "10px 14px",
  fontWeight: 600,
  color: "#374151",
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "10px 14px",
  color: "#374151",
  verticalAlign: "top",
};

const btnStyle = (disabled: boolean): React.CSSProperties => ({
  padding: "6px 14px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  background: disabled ? "#f9fafb" : "#fff",
  color: disabled ? "#9ca3af" : "#111827",
  cursor: disabled ? "not-allowed" : "pointer",
  fontSize: "0.875rem",
});

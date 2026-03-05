"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, FileText } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

interface DocEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  body: string;
}

interface SearchResult extends DocEntry {
  score: number;
  excerpt: string;
}

let cachedDocs: DocEntry[] | null = null;

function buildExcerpt(body: string, query: string): string {
  const lower = body.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase().split(" ")[0]);
  const start = Math.max(0, idx - 40);
  const snippet = body.slice(start, start + 120).trim();
  return start > 0 ? `…${snippet}…` : `${snippet}…`;
}

function searchDocs(docs: DocEntry[], query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);

  return docs
    .map((doc) => {
      const titleScore = words.reduce((acc, w) => {
        if (doc.title.toLowerCase().includes(w)) {
          return acc + 10;
        }
        return acc;
      }, 0);
      const descScore = words.reduce((acc, w) => {
        if (doc.description.toLowerCase().includes(w)) {
          return acc + 5;
        }
        return acc;
      }, 0);
      const bodyScore = words.reduce((acc, w) => {
        const count = (doc.body.toLowerCase().match(new RegExp(w, "g")) || []).length;
        return acc + count;
      }, 0);
      const score = titleScore + descScore + bodyScore;
      return { ...doc, score, excerpt: buildExcerpt(doc.body, words[0] ?? q) };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

export function SearchModal() {
  const { t } = useLanguage();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open on Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  // Fetch docs once
  const fetchDocs = useCallback(async () => {
    if (cachedDocs) {
      return cachedDocs;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/search");
      cachedDocs = await res.json();
      return cachedDocs;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search on query change
  useEffect(() => {
    if (!open) {
      return;
    }
    if (!query.trim()) {
       setResults([]); return;
    }
    let cancelled = false;
    (async () => {
      const docs = await fetchDocs();
      if (cancelled || !docs) {
        return;
      }
      setResults(searchDocs(docs, query));
      setSelected(0);
    })();
    return () => { cancelled = true; };
  }, [query, open, fetchDocs]);

  const navigate = (slug: string) => {
    router.push(`/docs/${slug}`);
    setOpen(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault(); setSelected((s) => Math.max(s - 1, 0));
    }
    if (e.key === "Enter" && results[selected]) {
      navigate(results[selected].slug);
    }
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/50 text-muted-foreground text-sm hover:border-primary/50 hover:text-foreground transition-colors min-w-40"
      >
        <Search className="w-3.5 h-3.5 shrink-0" />
        <span className="flex-1 text-left">{t.nav.search}</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono border border-border rounded px-1 py-0.5">
          <span>⌘</span><span>K</span>
        </kbd>
      </button>

      {/* Mobile search icon */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.18 }}
              className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4"
            >
              <div className="rounded-2xl border border-border bg-[#0d0d0d] shadow-2xl overflow-hidden">
                {/* Input row */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  {loading ? (
                    <Loader2 className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />
                  ) : (
                    <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={t.nav.search}
                    className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                  />
                  <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Results */}
                {results.length > 0 && (
                  <ul className="max-h-80 overflow-y-auto py-2">
                    {results.map((r, i) => (
                      <li key={r.slug}>
                        <button
                          onClick={() => navigate(r.slug)}
                          onMouseEnter={() => setSelected(i)}
                          className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                            i === selected ? "bg-primary/10" : "hover:bg-white/4"
                          }`}
                        >
                          <FileText className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-white truncate">{r.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {r.description || r.excerpt}
                            </div>
                          </div>
                          <span className="ml-auto text-[10px] text-muted-foreground capitalize shrink-0">
                            {r.category}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* No results */}
                {results.length === 0 && query.trim() && !loading && (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No results for &quot;{query}&quot;
                  </div>
                )}

                {/* Empty state */}
                {!query && (
                  <div className="px-4 py-6 text-center text-xs text-muted-foreground">
                    Type to search documentation
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

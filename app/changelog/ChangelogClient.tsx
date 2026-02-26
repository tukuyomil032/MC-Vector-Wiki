"use client";

import { ExternalLink, GitCommit, GitBranch, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { type GithubCommit } from "./page";

const PAGE_SIZE = 20;

function formatDate(dateStr: string, lang: "en" | "ja") {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function groupByDate(commits: GithubCommit[]) {
  const groups: Record<string, GithubCommit[]> = {};
  for (const c of commits) {
    const day = c.commit.author.date.slice(0, 10);
    if (!groups[day]) groups[day] = [];
    groups[day].push(c);
  }
  return Object.entries(groups).sort(([a], [b]) => (a < b ? 1 : -1));
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export function ChangelogClient({ commits }: { commits: GithubCommit[] }) {
  const { t, lang } = useLanguage();
  const groups = groupByDate(commits);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleGroups = groups.slice(0, visibleCount);
  const hasMore = visibleCount < groups.length;

  return (
    <div className="max-w-3xl mx-auto py-4">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <GitBranch className="w-6 h-6 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {t.changelog.title}
          </h1>
        </div>
        <p className="text-muted-foreground mb-4">{t.changelog.subtitle}</p>
        <Link
          href="https://github.com/tukuyomil032/MC-Vector/commits/main"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          {t.changelog.viewOnGithub}
        </Link>
      </motion.div>

      {commits.length === 0 ? (
        <p className="text-muted-foreground">{t.changelog.loadError}</p>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >
          {visibleGroups.map(([date, dayCommits]) => (
            <motion.div key={date} variants={item}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-border/50" />
                <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded border border-border/50 bg-muted/30">
                  {formatDate(date, lang)}
                </span>
                <div className="h-px flex-1 bg-border/50" />
              </div>

              <div className="space-y-3">
                {dayCommits.map((commit, i) => {
                  const [title, ...rest] = commit.commit.message.split("\n");
                  const body = rest.filter(Boolean).join("\n").trim();

                  return (
                    <motion.div
                      key={commit.sha}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      className="group flex gap-4 rounded-xl border border-border/40 bg-muted/20 hover:bg-muted/40 hover:border-border/70 transition-all duration-200 p-4"
                    >
                      <div className="mt-0.5 shrink-0">
                        {commit.author ? (
                          <img
                            src={commit.author.avatar_url}
                            alt={commit.author.login}
                            width={32}
                            height={32}
                            className="rounded-full border border-border/50"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-muted border border-border/50 flex items-center justify-center">
                            <GitCommit className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={commit.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2 group-hover:text-primary"
                          >
                            {title}
                          </Link>
                          <span className="shrink-0 font-mono text-[11px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded border border-border/40">
                            {commit.sha.slice(0, 7)}
                          </span>
                        </div>

                        {body && (
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {body}
                          </p>
                        )}

                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>
                            {t.changelog.by}{" "}
                            {commit.author ? (
                              <Link
                                href={commit.author.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary/80 hover:text-primary"
                              >
                                @{commit.author.login}
                              </Link>
                            ) : (
                              <span>{commit.commit.author.name}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {hasMore && (
            <div className="flex justify-center pt-4">
              <motion.button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 text-sm text-muted-foreground hover:text-white transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
                {lang === "ja" ? "さらに読み込む" : "Load more"}
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

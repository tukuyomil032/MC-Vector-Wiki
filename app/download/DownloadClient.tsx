"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, Monitor, Apple, Package } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { GithubRelease, ReleaseAsset } from "./page";

function formatBytes(bytes: number) {
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

function formatDate(dateStr: string, lang: "en" | "ja") {
  return new Date(dateStr).toLocaleDateString(lang === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface Platform {
  label: string;
  sublabel: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  assets: ReleaseAsset[];
}

function classifyAssets(assets: ReleaseAsset[]): Platform[] {
  const dmg = assets.filter((a) => a.name.endsWith(".dmg"));
  const tarGz = assets.filter((a) => a.name.endsWith(".tar.gz") || a.name.endsWith(".app.tar.gz"));
  const winExe = assets.filter((a) => a.name.endsWith(".exe") || a.name.endsWith(".msi"));

  const platforms: Platform[] = [];

  if (dmg.length > 0 || tarGz.length > 0) {
    platforms.push({
      label: "macOS",
      sublabel: dmg.length > 0 ? "Apple Silicon / Intel" : "Universal",
      icon: Apple,
      color: "text-blue-300",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30 hover:border-blue-400/60",
      assets: [...dmg, ...tarGz],
    });
  }

  if (winExe.length > 0) {
    platforms.push({
      label: "Windows",
      sublabel: "x64 Installer",
      icon: Monitor,
      color: "text-cyan-300",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30 hover:border-cyan-400/60",
      assets: winExe,
    });
  }

  return platforms;
}

function getAssetLabel(name: string): string {
  if (name.includes("aarch64") && name.endsWith(".dmg")) {
    return "DMG (Apple Silicon)";
  }
  if (name.includes("x64") && name.endsWith(".dmg")) {
    return "DMG (Intel)";
  }
  if (name.endsWith(".app.tar.gz") || name.endsWith(".tar.gz")) {
    return ".tar.gz (Universal)";
  }
  if (name.endsWith(".exe")) {
    return "Setup (.exe)";
  }
  if (name.endsWith(".msi")) {
    return "Installer (.msi)";
  }
  return name;
}

export function DownloadClient({ release }: { release: GithubRelease | null }) {
  const { lang, t } = useLanguage();

  if (!release) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">{t.download.loadError}</p>
      </div>
    );
  }

  const platforms = classifyAssets(release.assets);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-mono mb-6">
          <Package className="w-3.5 h-3.5" />
          {release.tag_name}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          {t.download.title}
        </h1>
        <p className="text-muted-foreground text-lg mb-2">{t.download.subtitle}</p>
        <p className="text-sm text-muted-foreground">
          {t.download.released}: {formatDate(release.published_at, lang)}
        </p>
      </motion.div>

      {/* Platform cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="grid md:grid-cols-2 gap-6 mb-10"
      >
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <div
              key={platform.label}
              className={`rounded-2xl border p-6 ${platform.bg} ${platform.border} transition-colors`}
            >
              <div className={`flex items-center gap-2 mb-4 ${platform.color}`}>
                <Icon className="w-5 h-5" />
                <span className="text-lg font-semibold text-white">{platform.label}</span>
                <span className="text-xs text-muted-foreground">{platform.sublabel}</span>
              </div>
              <div className="space-y-3">
                {platform.assets.map((asset) => (
                  <a
                    key={asset.browser_download_url}
                    href={asset.browser_download_url}
                    className="flex items-center justify-between w-full rounded-lg bg-background border border-border hover:border-primary/50 px-4 py-3 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium text-white">
                        {getAssetLabel(asset.name)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatBytes(asset.size)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Requirements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-xl border border-border bg-surface p-6 mb-8"
      >
        <h2 className="text-base font-semibold text-white mb-4">{t.download.requirements}</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">{t.download.reqOs}</p>
            <p className="text-foreground font-medium">Windows 10/11, macOS 12+</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">{t.download.reqJava}</p>
            <p className="text-foreground font-medium">Java 17+ ({t.download.javaAuto})</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">{t.download.reqRam}</p>
            <p className="text-foreground font-medium">4 GB+ ({t.download.ramRec} 8 GB+)</p>
          </div>
        </div>
      </motion.div>

      {/* View all releases link */}
      <div className="text-center">
        <a
          href={`https://github.com/tukuyomil032/MC-Vector/releases`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          {t.download.allReleases}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

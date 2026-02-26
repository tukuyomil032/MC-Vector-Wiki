import { DownloadClient } from "./DownloadClient";
import { WikiHeader } from "@/components/WikiHeader";

export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
  content_type: string;
}

export interface GithubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
  assets: ReleaseAsset[];
}

async function getLatestRelease(): Promise<GithubRelease | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/tukuyomil032/MC-Vector/releases/latest",
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 1800 },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function DownloadPage() {
  const release = await getLatestRelease();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <WikiHeader />
      <main className="flex-1">
        <DownloadClient release={release} />
      </main>
    </div>
  );
}

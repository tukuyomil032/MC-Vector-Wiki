import { ExternalLink, GitCommit } from "lucide-react";
import Link from "next/link";
import { ChangelogClient } from "./ChangelogClient";

interface GithubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
}

async function getCommits(): Promise<GithubCommit[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/tukuyomil032/MC-Vector/commits?sha=main&per_page=100",
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 1800 },
      }
    );
    if (!res.ok) {
      return [];
    }
    return res.json();
  } catch {
    return [];
  }
}

export default async function ChangelogPage() {
  const commits = await getCommits();

  return (
    <ChangelogClient commits={commits} />
  );
}

export { type GithubCommit };

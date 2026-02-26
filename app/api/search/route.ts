import { getAllDocs } from "@/lib/mdx";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

function stripMdx(content: string): string {
  return content
    .replace(/<[^>]+>/g, " ")        // JSX/HTML tags
    .replace(/```[\s\S]*?```/g, " ") // code blocks
    .replace(/`[^`]+`/g, " ")        // inline code
    .replace(/^\s*[#>*\-|+]\s+/gm, " ") // headings/lists/tables
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/\s{2,}/g, " ")
    .trim();
}

export async function GET() {
  const docs = getAllDocs();
  const payload = docs.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? "",
    category: doc.category,
    body: stripMdx(doc.content).slice(0, 1000),
  }));
  return NextResponse.json(payload);
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type Doc, type DocMeta } from "@/lib/types";

const DOCS_DIR = path.join(process.cwd(), "docs");

// 再帰的にディレクトリを探索してすべてのMDXファイルを取得する
function getFilesRecursively(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith(".")) continue; // 隠しディレクトリを除外
      files.push(...getFilesRecursively(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      files.push(fullPath);
    }
  }
  return files;
}

export function getAllDocs(): Doc[] {
  if (!fs.existsSync(DOCS_DIR)) {
    return [];
  }

  const filePaths = getFilesRecursively(DOCS_DIR);
  const docs: Doc[] = filePaths.map((filePath) => {
    const relativePath = path.relative(DOCS_DIR, filePath);
    const slug = relativePath.replace(/\.mdx?$/, "");
    const slugArray = slug.split(path.sep);
    const category = slugArray[0];

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug: slug.replace(/\\/g, "/"), // Windowsパス対応
      slugArray,
      category,
      content,
      filePath,
      title: data.title || path.basename(slug),
      description: data.description,
      tags: data.tags || [],
      date: data.date,
      order: data.order,
    };
  });

  // order順、なければタイトル順でソート
  return docs.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return a.title.localeCompare(b.title);
  });
}

export function getDocBySlug(slugArray: string[]): Doc | undefined {
  const allDocs = getAllDocs();
  const targetSlug = slugArray.join("/");
  return allDocs.find((doc) => doc.slug === targetSlug);
}

export function getDocsByCategory(category: string): Doc[] {
  return getAllDocs().filter((doc) => doc.category === category);
}

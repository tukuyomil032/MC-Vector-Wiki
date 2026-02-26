import { notFound } from "next/navigation";
import { getAllDocs, getDocBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import { AnimatedArticle } from "@/components/AnimatedArticle";
import { En, Ja } from "@/components/mdx/Lang";
import { mdxBaseComponents } from "@/components/mdx/MdxComponents";
import { DynamicMermaid } from "@/components/mdx/DynamicMermaid";
import { DocDescription } from "@/components/DocDescription";
import { DocVideo } from "@/components/DocVideo";
import { getDocVideo } from "@/lib/doc-videos";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { remarkMermaid } from "@/lib/remark-mermaid";

// remarkMermaid converts ```mermaid fences → <DynamicMermaid chart="..." />
// at MDAST level, BEFORE rehype-highlight runs (so it never sees mermaid).
const mdxComponents = {
  ...mdxBaseComponents,
  DynamicMermaid,
  En,
  Ja,
};

const mdxOptions = {
  remarkPlugins: [remarkGfm, remarkMermaid],
  rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }] as [typeof rehypeHighlight, object]],
};

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slugArray,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const doc = getDocBySlug(resolvedParams.slug);
  if (!doc) return {};
  return {
    title: `${doc.title} - MC-Vector Wiki`,
    description: doc.description,
  };
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params;
  const doc = getDocBySlug(resolvedParams.slug);

  if (!doc) {
    notFound();
  }

  const videoSrc = getDocVideo(resolvedParams.slug);

  return (
    <AnimatedArticle>
      <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-7 prose-li:my-1 text-foreground min-w-0">
        <div className="space-y-4 mb-10 not-prose border-b border-border pb-8">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl text-white">
            {doc.title}
          </h1>
          <DocDescription slug={doc.slug} fallback={doc.description} />
        </div>
        {videoSrc && <DocVideo src={videoSrc} rate={1.5} />}
        <MDXRemote source={doc.content} components={mdxComponents} options={{ mdxOptions }} />
      </article>
    </AnimatedArticle>
  );
}


"use client";

import React from "react";

// ─── Table components ──────────────────────────────────────────────────────────
const table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
    <table className="w-full text-sm" {...props}>
      {children}
    </table>
  </div>
);

const thead = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="border-b border-border bg-[#111]" {...props}>
    {children}
  </thead>
);

const tbody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="divide-y divide-border" {...props}>
    {children}
  </tbody>
);

const tr = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="hover:bg-white/3 transition-colors" {...props}>
    {children}
  </tr>
);

const th = ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className="px-4 py-3 text-left font-semibold text-white tracking-wide"
    {...props}
  >
    {children}
  </th>
);

const td = ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className="px-4 py-3 text-muted-foreground align-top" {...props}>
    {children}
  </td>
);

// ─── Code block ───────────────────────────────────────────────────────────────
// rehype-highlight outputs <code class="hljs language-*"> inside <pre>
// Mermaid is handled by remarkMermaid plugin before reaching here.
const pre = ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
  <pre
    className="my-6 overflow-x-auto rounded-xl border border-border bg-[#0d0d0d] p-4 text-sm leading-relaxed whitespace-pre"
    {...props}
  >
    {children}
  </pre>
);

const code = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  // Inline code (no className from rehype-highlight)
  if (!className) {
    return (
      <code
        className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-300"
        {...props}
      >
        {children}
      </code>
    );
  }
  // Block code (has className like "hljs language-toml")
  return (
    <code className={`${className} font-mono`} {...props}>
      {children}
    </code>
  );
};

// ─── Block quote ──────────────────────────────────────────────────────────────
const blockquote = ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
  <blockquote
    className="my-6 rounded-r-lg border-l-4 border-primary bg-primary/5 px-5 py-4 text-sm text-muted-foreground italic"
    {...props}
  >
    {children}
  </blockquote>
);

export const mdxBaseComponents = {
  table,
  thead,
  tbody,
  tr,
  th,
  td,
  pre,
  code,
  blockquote,
};

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type Doc } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import { motion } from "framer-motion";

const CATEGORY_KEYS = [
  "getting-started",
  "features",
  "configuration",
  "network-proxy",
  "troubleshooting",
  "developer",
] as const;

type CategoryKey = (typeof CATEGORY_KEYS)[number];

export function WikiSidebar({ docs, className }: { docs: Doc[]; className?: string }) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const groupedDocs = docs.reduce(
    (acc, doc) => {
      const category = doc.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(doc);
      return acc;
    },
    {} as Record<string, Doc[]>
  );

  Object.keys(groupedDocs).forEach((cat) => {
    groupedDocs[cat].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });
  });

  return (
    <aside
      className={cn(
        "w-64 shrink-0 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16 py-8 pr-6 hidden md:block",
        className
      )}
    >
      <div className="mb-8">
        <Link href="/docs" className="text-sm font-medium text-primary hover:underline">
          {t.sidebar.home}
        </Link>
      </div>
      <nav className="space-y-8 text-sm">
        {CATEGORY_KEYS.map((categoryKey, catIndex) => {
          const categoryDocs = groupedDocs[categoryKey];
          if (!categoryDocs || categoryDocs.length === 0) return null;
          const label =
            t.sidebar.categories[categoryKey as CategoryKey] ?? categoryKey.toUpperCase();

          return (
            <motion.div
              key={categoryKey}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: catIndex * 0.06 }}
            >
              <h4 className="font-semibold mb-3 text-xs tracking-wider text-muted-foreground uppercase">
                {label}
              </h4>
              <ul className="space-y-0.5 border-l border-border/50 ml-1">
                {categoryDocs.map((doc) => {
                  const href = `/docs/${doc.slug}`;
                  const isActive = pathname === href;
                  return (
                    <motion.li
                      key={doc.slug}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <Link
                        href={href}
                        className={cn(
                          "block pl-4 py-1.5 transition-colors duration-200 border-l -ml-px rounded-r-sm",
                          isActive
                            ? "sidebar-active-link"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                        )}
                      >
                        {doc.title}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </nav>
    </aside>
  );
}

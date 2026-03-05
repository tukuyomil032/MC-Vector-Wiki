"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type Doc } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const CATEGORY_KEYS = [
  "getting-started",
  "features",
  "configuration",
  "network-proxy",
  "troubleshooting",
  "developer",
] as const;

type CategoryKey = (typeof CATEGORY_KEYS)[number];

export function MobileMenuButton({ docs }: { docs: Doc[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-border hover:bg-muted transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu className="w-4 h-4" />
      </button>
      <MobileSidebar docs={docs} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MobileSidebar({
  docs,
  open,
  onClose,
}: {
  docs: Doc[];
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { t } = useLanguage();

  function resolveDocLabel(doc: Doc) {
    const links = (t.docs.links as Record<string, any>);
    const full = doc.slug;
    if (links[full]?.label) return links[full].label;
    const parts = full.split("/");
    const last = parts[parts.length - 1];
    const category = parts[0];
    const catCamel = category + last.charAt(0).toUpperCase() + last.slice(1);
    if (links[catCamel]?.label) return links[catCamel].label;
    if (links[last]?.label) return links[last].label;
    const camel = last
      .split(/[-_]/)
      .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
      .join("");
    if (links[camel]?.label) return links[camel].label;
    const cleaned = last.replace(/[^A-Za-z0-9]/g, "");
    if (links[cleaned]?.label) return links[cleaned].label;
    return doc.title;
  }

  const groupedDocs = docs.reduce(
    (acc, doc) => {
      const category = doc.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(doc);
      return acc;
    },
    {} as Record<string, Doc[]>
  );

  Object.keys(groupedDocs).forEach((cat) => {
    groupedDocs[cat].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return a.title.localeCompare(b.title);
    });
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-background border-r border-border overflow-y-auto py-6 px-5 md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <span className="font-bold text-lg tracking-widest text-white">MC-VECTOR</span>
                <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                  Wiki
                </span>
              </Link>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Home link */}
            <div className="mb-6">
              <Link
                href="/docs"
                onClick={onClose}
                className="text-sm font-medium text-primary hover:underline"
              >
                {t.sidebar.home}
              </Link>
            </div>

            {/* Categories */}
            <nav className="space-y-6 text-sm">
                {CATEGORY_KEYS.map((categoryKey) => {
                const categoryDocs = groupedDocs[categoryKey];
                if (!categoryDocs || categoryDocs.length === 0) return null;
                const label =
                  t.sidebar.categories[categoryKey as CategoryKey] ??
                  categoryKey.toUpperCase();

                return (
                  <div key={categoryKey}>
                    <h4 className="font-semibold mb-3 text-xs tracking-wider text-muted-foreground uppercase">
                      {label}
                    </h4>
                    <ul className="space-y-0.5 border-l border-border/50 ml-1">
                      {categoryDocs.map((doc) => {
                        const href = `/docs/${doc.slug}`;
                        const isActive = pathname === href;
                        const docLabel = resolveDocLabel(doc);
                        return (
                          <li key={doc.slug}>
                            <Link
                              href={href}
                              onClick={onClose}
                              className={cn(
                                "block pl-4 py-2 transition-colors duration-200 border-l -ml-px text-sm rounded-r-sm",
                                isActive
                                  ? "sidebar-active-link"
                                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                              )}
                            >
                              {docLabel}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

'use client'

import { useLanguage } from '@/components/LanguageProvider'

/**
 * Renders children only when English is the active language.
 * Wrap English-only content inside <En>…</En> in MDX files.
 */
export function En({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage()
  if (lang === 'ja') {
    return null
  }
  return <>{children}</>
}

/**
 * Renders children only when Japanese is the active language.
 * Wrap Japanese-only content inside <Ja>…</Ja> in MDX files.
 */
export function Ja({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage()
  if (lang === 'en') {
    return null
  }
  return <>{children}</>
}

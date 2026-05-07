'use client'

import { translations } from '@/lib/i18n'
import { useLanguage } from './LanguageProvider'

interface DocDescriptionProps {
  slug: string
  fallback?: string
}

export function DocDescription({ slug, fallback }: DocDescriptionProps) {
  const { lang } = useLanguage()
  const desc =
    translations[lang].docs.descriptions[
      slug as keyof typeof translations.en.docs.descriptions
    ] ?? fallback

  if (!desc) {
    return null
  }

  return <p className='text-lg text-muted-foreground leading-relaxed'>{desc}</p>
}

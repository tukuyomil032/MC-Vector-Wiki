'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from './LanguageProvider'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <motion.button
      onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className='relative inline-flex items-center justify-center h-9 w-20 rounded-md border border-border bg-muted/50 hover:bg-muted text-sm font-medium text-muted-foreground hover:text-white transition-colors overflow-hidden'
      aria-label='Toggle language'
    >
      <AnimatePresence mode='wait'>
        <motion.span
          key={lang}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className='absolute flex items-center gap-1.5'
        >
          {lang === 'en' ? (
            <>
              <span>🇺🇸</span>
              <span>EN</span>
            </>
          ) : (
            <>
              <span>🇯🇵</span>
              <span>JP</span>
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

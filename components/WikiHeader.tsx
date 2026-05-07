'use client'

import { motion } from 'framer-motion'
import { Github, History, Download } from 'lucide-react'
import Link from 'next/link'
import type { Doc } from '@/lib/types'
import { useLanguage } from './LanguageProvider'
import { LanguageToggle } from './LanguageToggle'
import { MobileMenuButton } from './MobileSidebar'
import { SearchModal } from './SearchModal'
import { ThemeToggle } from './ThemeToggle'

export function WikiHeader({ docs }: { docs?: Doc[] }) {
  const { t } = useLanguage()

  return (
    <header className='sticky top-0 z-50 w-full bg-background border-b border-border/40'>
      <div className='container flex h-16 items-center px-4 md:px-8 max-w-screen-2xl mx-auto'>
        {/* Mobile hamburger */}
        {docs && docs.length > 0 && (
          <div className='mr-3 md:hidden'>
            <MobileMenuButton docs={docs} />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className='mr-8 flex'
        >
          <Link href='/' className='flex items-center gap-2 group'>
            <span className='font-bold text-xl tracking-widest text-white group-hover:text-primary transition-colors duration-200'>
              MC-VECTOR
            </span>
            <span className='text-xs font-medium px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30'>
              Wiki
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className='flex flex-1 items-center justify-between space-x-2 md:justify-end'
        >
          <nav className='hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground'>
            <NavLink href='/docs'>{t.nav.documentation}</NavLink>
            <NavLink href='/changelog'>
              <History className='w-3.5 h-3.5 opacity-70' />
              {t.nav.changelog}
            </NavLink>
            <NavLink href='/download'>
              <Download className='w-3.5 h-3.5 opacity-70' />
              {t.nav.download}
            </NavLink>
            <NavLink
              href='https://github.com/tukuyomil032/MC-Vector'
              external={true}
            >
              <Github className='w-4 h-4' />
            </NavLink>
          </nav>

          <div className='flex-1 md:w-auto md:flex-none md:ml-6'>
            <SearchModal />
          </div>
          <nav className='flex items-center space-x-2 ml-4'>
            <LanguageToggle />
            <ThemeToggle />
          </nav>
        </motion.div>
      </div>
    </header>
  )
}

function NavLink({
  href,
  children,
  external,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
  return (
    <Link
      href={href}
      {...linkProps}
      className='flex items-center gap-1 transition-colors hover:text-white relative group'
    >
      {children}
      <span className='absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full' />
    </Link>
  )
}

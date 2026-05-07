'use client'

import { motion } from 'framer-motion'
import {
  Rocket,
  Cpu,
  Settings2,
  Network,
  AlertTriangle,
  Code2,
} from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageProvider'

const cards = [
  {
    key: 'gettingStarted' as const,
    icon: Rocket,
    color: 'text-emerald-400',
    border: 'hover:border-emerald-500/50',
    linkKeys: ['installation', 'serverCreation'] as const,
    hrefs: [
      '/docs/getting-started/installation',
      '/docs/getting-started/server-creation',
    ],
  },
  {
    key: 'advancedGuides' as const,
    icon: Cpu,
    color: 'text-blue-400',
    border: 'hover:border-blue-500/50',
    linkKeys: [
      'serverLifecycle',
      'pluginsMods',
      'backupRestore',
      'fileManager',
      'consoleLogs',
    ] as const,
    hrefs: [
      '/docs/features/server-lifecycle',
      '/docs/features/plugins-mods',
      '/docs/features/backup-restore',
      '/docs/features/file-manager',
      '/docs/features/console-logs',
    ],
  },
  {
    key: 'configuration' as const,
    icon: Settings2,
    color: 'text-purple-400',
    border: 'hover:border-purple-500/50',
    linkKeys: [
      'serverProperties',
      'themeCustomization',
      'generalSettings',
    ] as const,
    hrefs: [
      '/docs/configuration/server-properties',
      '/docs/configuration/theme-customization',
      '/docs/configuration/general-settings',
    ],
  },
  {
    key: 'networkProxy' as const,
    icon: Network,
    color: 'text-orange-400',
    border: 'hover:border-orange-500/50',
    linkKeys: ['ngrokTunnel', 'velocitySetup'] as const,
    hrefs: [
      '/docs/network-proxy/ngrok-tunnel',
      '/docs/network-proxy/velocity-setup',
    ],
  },
  {
    key: 'troubleshooting' as const,
    icon: AlertTriangle,
    color: 'text-red-400',
    border: 'hover:border-red-500/50',
    linkKeys: ['commonErrors', 'performance'] as const,
    hrefs: [
      '/docs/troubleshooting/common-errors',
      '/docs/troubleshooting/performance',
    ],
  },
  {
    key: 'developer' as const,
    icon: Code2,
    color: 'text-yellow-400',
    border: 'hover:border-yellow-500/50',
    linkKeys: ['developerSetup', 'architecture'] as const,
    hrefs: ['/docs/developer/setup', '/docs/developer/architecture'],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
}

export default function DocsIndexPage() {
  const { t } = useLanguage()

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='mb-8 mt-8 flex justify-center'>
        <img
          src='/images/mc-vector-banner.png'
          alt='MC-Vector Docs'
          className='w-full max-w-4xl rounded-lg shadow-lg object-cover'
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-16 mt-8'
      >
        <h1 className='text-5xl font-bold tracking-tight text-white mb-4'>
          {t.docs.title}
        </h1>
        <p className='text-xl text-muted-foreground'>{t.docs.subtitle}</p>
      </motion.div>

      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose'
      >
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.key}
              variants={item}
              whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
              className='relative rounded-2xl overflow-hidden flex flex-col'
            >
              {/* Spinning border effect */}
              <div className='card-spinning-bg' />
              {/* Card body (1.5px inset reveals the spinning border; flex-1 fills full card height) */}
              <div className='relative m-[1.5px] rounded-[calc(1rem-1.5px)] bg-surface p-6 flex-1'>
                <div className={`flex items-center gap-2 mb-4 ${card.color}`}>
                  <Icon className='w-5 h-5' />
                  <h3 className='text-lg font-semibold text-white'>
                    {t.docs.cards[card.key]}
                  </h3>
                </div>
                <ul className='space-y-3'>
                  {card.linkKeys.map((lk, i) => {
                    const link = t.docs.links[lk]
                    return (
                      <li key={card.hrefs[i]}>
                        <Link href={card.hrefs[i]} className='block group'>
                          <div className='text-primary font-medium group-hover:underline mb-0.5'>
                            {link.label}
                          </div>
                          <div className='text-sm text-muted-foreground'>
                            {link.sub}
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

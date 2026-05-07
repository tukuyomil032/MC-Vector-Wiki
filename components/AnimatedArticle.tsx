'use client'

import { motion } from 'framer-motion'
import React from 'react'

export function AnimatedArticle({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className='max-w-4xl mx-auto'
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

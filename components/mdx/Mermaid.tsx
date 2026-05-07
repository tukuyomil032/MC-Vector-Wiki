'use client'

import React, { useEffect, useRef, useState } from 'react'

interface MermaidProps {
  chart: string
}

// Module-level singleton — prevents multiple mermaid.initialize() calls from
// interfering when several <Mermaid> components exist on the same page.
let mermaidPromise: Promise<(typeof import('mermaid'))['default']> | null = null

function getMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then(({ default: m }) => {
      m.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        themeVariables: {
          background: '#0d0d0d',
          mainBkg: '#111827',
          primaryColor: '#1f2d23',
          primaryTextColor: '#e5e7eb',
          primaryBorderColor: '#00e599',
          lineColor: '#6b7280',
          secondaryColor: '#1a1a2e',
          tertiaryColor: '#1f2937',
          edgeLabelBackground: '#111827',
          clusterBkg: '#111827',
          titleColor: '#e5e7eb',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          fontSize: '14px',
        },
      })
      return m
    })
  }
  return mermaidPromise
}

let uidCounter = 0

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!chart) {
      return
    }
    let cancelled = false

    getMermaid()
      .then(async (mermaid) => {
        if (cancelled) {
          return
        }
        const uid = `mcv-mermaid-${++uidCounter}`
        const { svg } = await mermaid.render(uid, chart.trim())
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
          const svgEl = containerRef.current.querySelector('svg')
          if (svgEl) {
            svgEl.style.maxWidth = '100%'
            svgEl.style.height = 'auto'
            svgEl.removeAttribute('height')
          }
          setStatus('done')
        }
      })
      .catch((e) => {
        if (!cancelled) {
          console.error('[Mermaid]', e)
          setErrorMsg(String(e))
          setStatus('error')
        }
      })

    return () => {
      cancelled = true
    }
  }, [chart])

  if (status === 'error') {
    return (
      <div className='my-6 rounded-xl border border-red-500/40 bg-red-950/20 p-4 text-sm text-red-400'>
        <strong>Diagram error:</strong> {errorMsg}
      </div>
    )
  }

  return (
    <div className='my-6 rounded-xl border border-border bg-[#0d0d0d] p-4 overflow-x-auto'>
      {status === 'loading' && (
        <div className='flex h-32 items-center justify-center text-sm text-muted-foreground'>
          Rendering diagram…
        </div>
      )}
      <div
        ref={containerRef}
        className={status === 'done' ? 'flex justify-center' : 'hidden'}
      />
    </div>
  )
}

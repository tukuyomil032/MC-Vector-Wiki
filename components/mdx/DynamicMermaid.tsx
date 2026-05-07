'use client'

import dynamic from 'next/dynamic'

// Mermaid must be client-only — dynamic import with ssr:false prevents
// mermaid.js from accessing browser APIs during Next.js server rendering
export const DynamicMermaid = dynamic(
  () =>
    import('@/components/mdx/Mermaid').then((m) => ({ default: m.Mermaid })),
  {
    ssr: false,
    loading: () => (
      <div className='my-6 flex h-32 items-center justify-center rounded-xl border border-border bg-[#0d0d0d] text-sm text-muted-foreground'>
        Loading diagram…
      </div>
    ),
  }
)

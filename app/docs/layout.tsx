import { WikiHeader } from '@/components/WikiHeader'
import { WikiSidebar } from '@/components/WikiSidebar'
import { getAllDocs } from '@/lib/mdx'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const docs = getAllDocs()

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <WikiHeader docs={docs} />
      <div className='container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 mx-auto px-4 md:px-8 max-w-screen-2xl'>
        <WikiSidebar docs={docs} />
        <main className='relative py-8 lg:py-10'>
          <div className='bg-surface border border-border rounded-2xl p-6 md:p-10 shadow-sm min-h-[calc(100vh-10rem)]'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

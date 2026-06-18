import BottomNav from '@/components/BottomNav'
import Sidebar from '@/components/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      {/* Sidebar — desktop only (hidden on mobile via CSS) */}
      <Sidebar />

      {/* Main content */}
      <main className="app-main">
        {children}
      </main>

      {/* Bottom nav — mobile only (hidden on desktop via CSS) */}
      <BottomNav />
    </div>
  )
}

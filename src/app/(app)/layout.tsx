import BottomNav from '@/components/BottomNav'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      {/* Sidebar — desktop only */}
      <Sidebar />

      {/* Coluna principal */}
      <div className="app-main-col">
        {/* TopBar — desktop only */}
        <TopBar />

        {/* Conteúdo */}
        <main className="app-main">
          {children}
        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <BottomNav />
    </div>
  )
}

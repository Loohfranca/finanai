import Link from 'next/link'

const recentTransactions = [
  { id: 1, name: 'Supermercado', category: 'Alimentação', amount: -182.50, icon: '🛒', date: 'Hoje' },
  { id: 2, name: 'Café Central', amount: -32.00, category: 'Alimentação', icon: '☕', date: 'Hoje' },
  { id: 3, name: 'App de Transporte', amount: -28.90, category: 'Transporte', icon: '🚗', date: 'Ontem' },
  { id: 4, name: 'Farmácia', amount: -67.40, category: 'Saúde', icon: '💊', date: 'Ontem' },
  { id: 5, name: 'Comunicação', amount: -49.90, category: 'Assinaturas', icon: '📱', date: '15 jun' },
]

const categoryData = [
  { name: 'Alimentação', spent: 214.50, budget: 600, color: '#0f766e' },
  { name: 'Transporte', spent: 89.80, budget: 200, color: '#006e2f' },
  { name: 'Saúde', spent: 67.40, budget: 150, color: '#7f4025' },
  { name: 'Lazer', spent: 120.00, budget: 300, color: '#6e7977' },
]

export default function DashboardPage() {
  const totalGasto = 2450.00
  const percentChange = -12

  return (
    <div style={{ background: 'var(--color-surface)', minHeight: '100dvh' }}>
      {/* Header */}
      <div style={{
        background: 'var(--color-primary)',
        padding: '40px 24px 80px',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <p className="body-sm" style={{ color: 'var(--color-on-primary-container)', opacity: 0.8 }}>Olá, João! 👋</p>
            <h1 className="headline-md" style={{ color: 'white' }}>Sua saúde financeira</h1>
          </div>
          <Link href="/perfil" style={{
            width: 40, height: 40,
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 18,
          }}>
            J
          </Link>
        </div>

        {/* Saldo card */}
        <div className="card" style={{
          position: 'absolute',
          bottom: -50,
          left: 24,
          right: 24,
          borderRadius: 'var(--radius-xl)',
        }}>
          <p className="label-md text-muted" style={{ marginBottom: 4 }}>Gasto total — Junho 2025</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="amount-display">R$ {totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <span style={{
              background: 'color-mix(in srgb, var(--color-secondary) 12%, transparent)',
              color: 'var(--color-secondary)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              fontSize: 12,
              fontWeight: 600,
            }}>
              ↓ {Math.abs(percentChange)}%
            </span>
            <span className="body-sm text-muted">vs. mês passado · Bom trabalho!</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="page-content" style={{ paddingTop: 72 }}>

        {/* AI Insight */}
        <div style={{
          background: 'color-mix(in srgb, var(--color-primary-container) 8%, var(--color-surface-container-lowest))',
          borderRadius: 'var(--radius-lg)',
          padding: 16,
          display: 'flex',
          gap: 12,
          marginBottom: 24,
          border: '1px solid color-mix(in srgb, var(--color-primary-container) 20%, transparent)',
        }}>
          <div style={{ fontSize: 20 }}>🤖</div>
          <div>
            <p className="label-md" style={{ color: 'var(--color-primary)', marginBottom: 4 }}>INSIGHT DA IA</p>
            <p className="body-sm">Você gastou 12% a menos que no mês passado. Continue assim e você pode economizar R$ 380 até o final do mês.</p>
          </div>
        </div>

        {/* Categorias */}
        <div className="section-header">
          <h2 className="headline-sm">Por Categoria</h2>
          <Link href="/categorias" className="body-sm text-primary" style={{ fontWeight: 500 }}>Ver todas</Link>
        </div>

        <div className="card mb-lg">
          {categoryData.map((cat, i) => (
            <div key={i} style={{ marginBottom: i < categoryData.length - 1 ? 20 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span className="body-sm" style={{ fontWeight: 500 }}>{cat.name}</span>
                <span className="body-sm text-muted">
                  R$ {cat.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / {cat.budget}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(cat.spent / cat.budget) * 100}%`,
                    background: cat.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Transações Recentes */}
        <div className="section-header">
          <h2 className="headline-sm">Transações Recentes</h2>
          <Link href="/gastos" className="body-sm text-primary" style={{ fontWeight: 500 }}>Ver todas</Link>
        </div>

        <div className="card mb-lg">
          {recentTransactions.map((t) => (
            <div key={t.id} className="transaction-item">
              <div className="transaction-icon">
                <span style={{ fontSize: 20 }}>{t.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p className="body-sm" style={{ fontWeight: 500 }}>{t.name}</p>
                <p className="label-md text-muted">{t.category} · {t.date}</p>
              </div>
              <span className="body-sm amount-negative" style={{ fontWeight: 600 }}>
                R$ {Math.abs(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>

        {/* Chat Preview */}
        <div className="section-header">
          <h2 className="headline-sm">Chat Financeiro</h2>
        </div>
        <Link href="/chat" style={{ display: 'block', textDecoration: 'none' }}>
          <div className="card" style={{
            border: '1.5px solid var(--color-outline-variant)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 44, height: 44,
              background: 'var(--color-primary-container)',
              borderRadius: 'var(--radius-full)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 20, flexShrink: 0,
            }}>🤖</div>
            <div>
              <p className="body-sm" style={{ fontWeight: 500 }}>Pergunte sobre seus gastos</p>
              <p className="body-sm text-muted">ou peça dicas de economia...</p>
            </div>
          </div>
        </Link>
      </div>

      {/* FAB */}
      <Link href="/gastos/novo" className="fab" id="fab-add-gasto">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </Link>
    </div>
  )
}

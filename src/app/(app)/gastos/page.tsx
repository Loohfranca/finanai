import Link from 'next/link'

const gastos = [
  { id: 1, name: 'Supermercado', category: 'Alimentação', amount: -182.50, icon: '🛒', date: '18 jun 2025' },
  { id: 2, name: 'Café Central', amount: -32.00, category: 'Alimentação', icon: '☕', date: '18 jun 2025' },
  { id: 3, name: 'App de Transporte', amount: -28.90, category: 'Transporte', icon: '🚗', date: '17 jun 2025' },
  { id: 4, name: 'Farmácia', amount: -67.40, category: 'Saúde', icon: '💊', date: '17 jun 2025' },
  { id: 5, name: 'Comunicação', amount: -49.90, category: 'Assinaturas', icon: '📱', date: '15 jun 2025' },
  { id: 6, name: 'Restaurante', amount: -95.00, category: 'Alimentação', icon: '🍽️', date: '14 jun 2025' },
  { id: 7, name: 'Academia', amount: -89.90, category: 'Saúde', icon: '🏋️', date: '10 jun 2025' },
  { id: 8, name: 'Uber Eats', amount: -45.60, category: 'Alimentação', icon: '🍔', date: '09 jun 2025' },
]

const totalGasto = gastos.reduce((acc, g) => acc + Math.abs(g.amount), 0)

export default function GastosPage() {
  return (
    <div style={{ background: 'var(--color-surface)', minHeight: '100dvh' }}>
      {/* Header */}
      <div className="page-header">
        <h1 className="headline-sm">Meus Gastos</h1>
        <button style={{
          background: 'var(--color-surface-container)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          padding: '6px 12px',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 500,
          fontFamily: 'var(--font-family)',
          color: 'var(--color-on-surface)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
          </svg>
          Filtrar
        </button>
      </div>

      <div className="page-content" style={{ paddingTop: 16 }}>
        {/* Summary */}
        <div className="card mb-lg" style={{ background: 'var(--color-primary)', color: 'white' }}>
          <p style={{ fontSize: 12, fontWeight: 500, opacity: 0.8, marginBottom: 4 }}>Total — Junho 2025</p>
          <p style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>
            R$ {totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>
            {gastos.length} transações registradas
          </p>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {['Todos', 'Alimentação', 'Transporte', 'Saúde', 'Assinaturas'].map((cat, i) => (
            <button key={cat} style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: i === 0 ? 'var(--color-primary-container)' : 'var(--color-surface-container)',
              color: i === 0 ? 'white' : 'var(--color-on-surface)',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'var(--font-family)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de Gastos */}
        <div className="card">
          {gastos.map((g) => (
            <div key={g.id} className="transaction-item">
              <div className="transaction-icon">
                <span style={{ fontSize: 20 }}>{g.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p className="body-sm" style={{ fontWeight: 500 }}>{g.name}</p>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
                  <span className="chip" style={{ fontSize: 11, padding: '2px 8px' }}>{g.category}</span>
                  <span className="label-md text-muted">{g.date}</span>
                </div>
              </div>
              <span className="body-sm amount-negative" style={{ fontWeight: 600 }}>
                - R$ {Math.abs(g.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <Link href="/gastos/novo" className="fab">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </Link>
    </div>
  )
}

const categories = [
  { name: 'Alimentação', icon: '🛒', budget: 600, spent: 214.50, color: '#0f766e', transactions: 5 },
  { name: 'Transporte', icon: '🚗', budget: 200, spent: 89.80, color: '#006e2f', transactions: 3 },
  { name: 'Saúde', icon: '💊', budget: 150, spent: 67.40, color: '#7f4025', transactions: 2 },
  { name: 'Lazer', icon: '🎮', budget: 300, spent: 120.00, color: '#005c55', transactions: 4 },
  { name: 'Assinaturas', icon: '📱', budget: 100, spent: 49.90, color: '#6e7977', transactions: 1 },
  { name: 'Educação', icon: '📚', budget: 200, spent: 0, color: '#3e4947', transactions: 0 },
  { name: 'Casa', icon: '🏠', budget: 400, spent: 0, color: '#111c2d', transactions: 0 },
]

export default function CategoriasPage() {
  const totalBudget = categories.reduce((acc, c) => acc + c.budget, 0)
  const totalSpent = categories.reduce((acc, c) => acc + c.spent, 0)

  return (
    <div style={{ background: 'var(--color-surface)', minHeight: '100dvh' }}>
      {/* Header */}
      <div className="page-header">
        <h1 className="headline-sm">Categorias</h1>
        <button style={{
          background: 'var(--color-primary-container)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          padding: '6px 14px',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'var(--font-family)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Nova
        </button>
      </div>

      <div className="page-content" style={{ paddingTop: 16 }}>
        {/* Resumo */}
        <div className="card mb-lg" style={{ background: 'var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>TOTAL GASTO</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>
                R$ {totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>ORÇAMENTO</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>
                R$ {totalBudget.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)', height: 6 }}>
            <div style={{
              width: `${(totalSpent / totalBudget) * 100}%`,
              height: '100%',
              background: 'var(--color-secondary-container)',
              borderRadius: 'var(--radius-full)',
            }} />
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
            {Math.round((totalSpent / totalBudget) * 100)}% do orçamento utilizado
          </p>
        </div>

        {/* Category cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {categories.map((cat) => {
            const pct = cat.budget > 0 ? (cat.spent / cat.budget) * 100 : 0
            const isOver = pct > 90

            return (
              <div key={cat.name} className="card" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: 'var(--radius-lg)',
                    background: `color-mix(in srgb, ${cat.color} 15%, transparent)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                    flexShrink: 0,
                  }}>
                    {cat.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span className="body-sm" style={{ fontWeight: 600 }}>{cat.name}</span>
                      <span className={`body-sm ${isOver ? 'text-error' : 'text-muted'}`} style={{ fontWeight: 500, fontSize: 13 }}>
                        R$ {cat.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                      <span className="label-md text-muted">{cat.transactions} transações</span>
                      <span className="label-md text-muted">de R$ {cat.budget}</span>
                    </div>
                  </div>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      background: isOver ? 'var(--color-error)' : cat.color,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

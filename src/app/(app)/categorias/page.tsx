const categories = [
  { name: 'Alimentação', icon: '🍽️', transactions: 42, amount: 1450.00, color: '#0f766e' },
  { name: 'Transporte', icon: '🚗', transactions: 15, amount: 680.40, color: '#006e2f' },
  { name: 'Educação', icon: '🎓', transactions: 3, amount: 2200.00, color: '#7f4025' },
  { name: 'Saúde', icon: '💊', transactions: 8, amount: 415.00, color: '#ba1a1a' },
  { name: 'Lazer', icon: '🎉', transactions: 21, amount: 930.15, color: '#005c55' },
]

export default function CategoriasPage() {
  return (
    <div className="page-wrapper">
      {/* Título */}
      <div className="page-title-block" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="headline-lg">Categorias</h1>
          <p className="body-sm text-muted">Gerencie suas classificações de gastos para uma análise precisa da sua saúde financeira.</p>
        </div>
        <button style={{
          background: 'var(--color-primary-container)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          padding: '10px 20px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'var(--font-family)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          whiteSpace: 'nowrap',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Nova Categoria
        </button>
      </div>

      {/* Grid de categorias — 3 colunas */}
      <div className="grid-3 mb-lg">
        {categories.map((cat) => (
          <div key={cat.name} className="card card-hover">
            <div style={{
              width: 44, height: 44,
              borderRadius: 'var(--radius-md)',
              background: `color-mix(in srgb, ${cat.color} 12%, transparent)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
              marginBottom: 14,
            }}>
              {cat.icon}
            </div>
            <h3 className="headline-sm" style={{ marginBottom: 12 }}>{cat.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="chip" style={{ fontSize: 11 }}>
                {cat.transactions} transações
              </span>
              <span className="body-sm" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>
                R$ {cat.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        ))}

        {/* Card adicionar nova */}
        <div className="card card-hover" style={{
          border: '2px dashed var(--color-outline-variant)',
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: 'pointer',
          minHeight: 140,
        }}>
          <div style={{
            width: 40, height: 40,
            borderRadius: '50%',
            background: 'var(--color-surface-container)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-outline)">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </div>
          <p style={{ fontWeight: 600, color: 'var(--color-primary-container)', fontSize: 14 }}>Adicionar Nova</p>
          <p className="body-sm text-muted" style={{ textAlign: 'center', fontSize: 12 }}>Organize seus gastos extras</p>
        </div>
      </div>

      {/* Dica da FinanIA */}
      <div style={{
        background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-primary-container) 8%, transparent), color-mix(in srgb, var(--color-secondary) 6%, transparent))',
        border: '1px solid color-mix(in srgb, var(--color-primary-container) 20%, transparent)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px 28px',
        display: 'flex',
        gap: 20,
        alignItems: 'flex-start',
      }}>
        <div style={{
          width: 48, height: 48,
          background: 'var(--color-primary-container)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, flexShrink: 0,
        }}>✨</div>
        <div style={{ flex: 1 }}>
          <p className="label-md text-primary" style={{ marginBottom: 6 }}>DICA DA FIANIA</p>
          <p className="body-sm" style={{ marginBottom: 16, lineHeight: 1.6 }}>
            Notei que você teve 42 gastos em <strong>Alimentação</strong> este mês. Criar uma subcategoria como
            "Delivery" ou "Supermercado" pode te ajudar a identificar onde economizar mais rápido.
            Deseja que eu sugira uma estrutura?
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              background: 'var(--color-primary-container)', color: 'white',
              border: 'none', borderRadius: 'var(--radius-md)',
              padding: '8px 20px', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', fontFamily: 'var(--font-family)',
            }}>Sim, por favor</button>
            <button style={{
              background: 'transparent', color: 'var(--color-on-surface)',
              border: '1.5px solid var(--color-outline-variant)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 20px', fontWeight: 500, fontSize: 14,
              cursor: 'pointer', fontFamily: 'var(--font-family)',
            }}>Agora não</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const menuItems = [
  { label: 'Conta e Segurança', icon: '🔒', desc: 'E-mail, senha, autenticação' },
  { label: 'Notificações', icon: '🔔', desc: 'Alertas de gastos e metas' },
  { label: 'Orçamentos', icon: '🎯', desc: 'Metas e limites por categoria' },
  { label: 'Exportar dados', icon: '📊', desc: 'Exportar para Excel ou PDF' },
  { label: 'Conectar banco', icon: '🏦', desc: 'Open Banking e integrações' },
  { label: 'Aparência', icon: '🎨', desc: 'Tema e preferências visuais' },
  { label: 'Privacidade', icon: '🛡️', desc: 'Seus dados e privacidade' },
  { label: 'Ajuda e suporte', icon: '💬', desc: 'FAQ, chat e tutoriais' },
]

export default function PerfilPage() {
  return (
    <div style={{ background: 'var(--color-surface)', minHeight: '100dvh' }}>
      {/* Header */}
      <div className="page-header">
        <h1 className="headline-sm">Perfil</h1>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--color-on-surface)">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
      </div>

      <div className="page-content" style={{ paddingTop: 16 }}>
        {/* Profile Card */}
        <div className="card mb-lg" style={{ textAlign: 'center', padding: '28px 24px' }}>
          <div style={{
            width: 72, height: 72,
            background: 'var(--color-primary)',
            borderRadius: 'var(--radius-full)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 28,
            color: 'white',
            fontWeight: 700,
          }}>
            J
          </div>
          <h2 className="headline-sm" style={{ marginBottom: 4 }}>João Silva</h2>
          <p className="body-sm text-muted" style={{ marginBottom: 16 }}>joao.silva@email.com</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            <span className="chip">✨ Plano Free</span>
            <span className="chip chip-success">3 meses ativo</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Gastos', value: '47' },
            { label: 'Categorias', value: '7' },
            { label: 'IA Chats', value: '23' },
          ].map((s) => (
            <div key={s.label} className="card" style={{ textAlign: 'center', padding: '16px 8px' }}>
              <p className="headline-sm" style={{ color: 'var(--color-primary-container)' }}>{s.value}</p>
              <p className="label-md text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {menuItems.map((item, i) => (
            <button key={item.label} style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '14px 20px',
              background: 'none',
              border: 'none',
              borderBottom: i < menuItems.length - 1 ? '1px solid var(--color-outline-variant)' : 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-family)',
              textAlign: 'left',
            }}>
              <span style={{ fontSize: 22, width: 32, textAlign: 'center' }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <p className="body-sm" style={{ fontWeight: 500 }}>{item.label}</p>
                <p className="label-md text-muted">{item.desc}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-outline)">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          ))}
        </div>

        {/* Logout */}
        <div style={{ marginTop: 24 }}>
          <button className="btn-secondary" style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  )
}

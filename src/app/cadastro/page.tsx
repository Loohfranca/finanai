import Link from 'next/link'

export default function CadastroPage() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--color-surface)', padding: '48px 24px 40px' }}>
      <div style={{ marginBottom: 32 }}>
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 24,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Voltar
        </Link>
        <h1 className="headline-lg" style={{ color: 'var(--color-primary)', marginBottom: 8 }}>Criar conta</h1>
        <p className="body-sm text-muted">Comece a controlar suas finanças com IA</p>
      </div>

      <div className="card" style={{ flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div className="input-label">Nome completo</div>
            <input id="fullname" type="text" className="input-field" placeholder="João Silva" />
          </div>
          <div>
            <div className="input-label">E-mail</div>
            <input id="email" type="email" className="input-field" placeholder="seu@email.com" />
          </div>
          <div>
            <div className="input-label">Senha</div>
            <input id="password" type="password" className="input-field" placeholder="Mínimo 8 caracteres" />
          </div>
          <div>
            <div className="input-label">Confirmar senha</div>
            <input id="confirm-password" type="password" className="input-field" placeholder="Repita a senha" />
          </div>

          <Link href="/dashboard" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 8 }}>
            Criar conta grátis
          </Link>

          <p className="body-sm text-muted" style={{ textAlign: 'center', fontSize: 12 }}>
            Ao criar conta, você aceita nossos{' '}
            <span style={{ color: 'var(--color-primary-container)' }}>Termos de Uso</span>
            {' '}e{' '}
            <span style={{ color: 'var(--color-primary-container)' }}>Política de Privacidade</span>
          </p>
        </div>
      </div>
    </div>
  )
}

'use client'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--color-surface)' }}>
      {/* Header Brand */}
      <div style={{ padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64,
          background: 'var(--color-primary-container)',
          borderRadius: 'var(--radius-xl)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="white"/>
          </svg>
        </div>
        <h1 className="headline-lg" style={{ color: 'var(--color-primary)' }}>FinanIA</h1>
        <p className="body-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: 6 }}>
          Assistente Financeiro Inteligente
        </p>
      </div>

      {/* Card de Login */}
      <div style={{ flex: 1, padding: '0 24px 40px' }}>
        <div className="card" style={{ marginBottom: 16 }}>
          <h2 className="headline-sm" style={{ marginBottom: 4 }}>Bem-vindo de volta</h2>
          <p className="body-sm text-muted" style={{ marginBottom: 24 }}>
            Controle suas finanças com o poder da IA
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div className="input-label">E-mail</div>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div className="input-label">Senha</div>
                <Link href="#" style={{ fontSize: 12, color: 'var(--color-primary-container)', fontWeight: 500 }}>
                  Esqueceu a senha?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <Link href="/dashboard" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 8 }}>
              Entrar
            </Link>
          </div>

          <div className="divider" />

          {/* Google login */}
          <button style={{
            width: '100%', padding: '12px 16px',
            border: '1.5px solid var(--color-outline-variant)',
            borderRadius: 'var(--radius-md)',
            background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            cursor: 'pointer', fontFamily: 'var(--font-family)', fontSize: 14, fontWeight: 500,
            color: 'var(--color-on-surface)',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
            </svg>
            Continuar com Google
          </button>
        </div>

        <p className="body-sm" style={{ textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
          Ainda não tem conta?{' '}
          <Link href="/cadastro" style={{ color: 'var(--color-primary-container)', fontWeight: 600 }}>
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}

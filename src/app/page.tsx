import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="login-shell">
      {/* Painel esquerdo — hero */}
      <div className="login-hero">
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
            <div style={{
              width: 36, height: 36,
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="white"/>
              </svg>
            </div>
            <span style={{ color: 'white', fontSize: 18, fontWeight: 700 }}>FinanIA</span>
          </div>

          <h1 style={{ color: 'white', fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
            Controle suas finanças com o poder da IA
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.6 }}>
            Uma abordagem calma e inteligente para gerenciar seu patrimônio, eliminar dívidas e planejar o futuro.
          </p>
        </div>

        {/* Card decorativo */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          padding: '20px 24px',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.3)', borderRadius: 4, marginBottom: 6, width: '70%' }} />
              <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4, width: '50%' }} />
            </div>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 4, marginBottom: 8 }} />
          <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 4, width: '80%' }} />
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="login-form-panel">
        <div style={{ maxWidth: 400, width: '100%' }}>
          <h2 className="headline-lg" style={{ marginBottom: 6 }}>Bem-vindo de volta</h2>
          <p className="body-sm text-muted" style={{ marginBottom: 28 }}>
            Acesse sua conta para gerenciar seu progresso.
          </p>

          {/* Google */}
          <button style={{
            width: '100%', padding: '12px 16px',
            border: '1.5px solid var(--color-outline-variant)',
            borderRadius: 'var(--radius-md)',
            background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            cursor: 'pointer', fontFamily: 'var(--font-family)',
            fontSize: 14, fontWeight: 500, color: 'var(--color-on-surface)',
            marginBottom: 20,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
            </svg>
            Entrar com Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--color-outline-variant)' }} />
            <span className="label-md text-muted">OU E-MAIL</span>
            <div style={{ flex: 1, height: 1, background: 'var(--color-outline-variant)' }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label className="input-label" htmlFor="email">E-mail</label>
            <div style={{ position: 'relative' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-outline)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <input id="email" type="email" className="input-field" placeholder="nome@exemplo.com" style={{ paddingLeft: 40 }} />
            </div>
          </div>

          {/* Senha */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label className="input-label" htmlFor="password">Senha</label>
              <Link href="#" style={{ fontSize: 12, color: 'var(--color-primary-container)', fontWeight: 500 }}>Esqueceu a senha?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-outline)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              <input id="password" type="password" className="input-field" placeholder="••••••••" style={{ paddingLeft: 40 }} />
            </div>
          </div>

          {/* Lembrar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <input type="checkbox" id="remember" style={{ accentColor: 'var(--color-primary-container)', width: 16, height: 16, cursor: 'pointer' }} />
            <label htmlFor="remember" className="body-sm text-muted" style={{ cursor: 'pointer' }}>Lembrar de mim</label>
          </div>

          <Link href="/dashboard" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginBottom: 20 }}>
            Entrar
          </Link>

          <p className="body-sm" style={{ textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
            Não tem uma conta?{' '}
            <Link href="/cadastro" style={{ color: 'var(--color-primary-container)', fontWeight: 600 }}>
              Criar conta agora
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
          <span className="label-md text-muted">© 2025 FinanIA. Todos os direitos reservados.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacidade', 'Termos', 'Ajuda'].map((l) => (
              <Link key={l} href="#" className="label-md text-muted" style={{ fontWeight: 400 }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

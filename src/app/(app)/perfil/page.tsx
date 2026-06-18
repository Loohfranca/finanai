'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('João Silva')
  const [email, setEmail] = useState('joao.silva@exemplo.com.br')

  // Carregar dados salvos
  useEffect(() => {
    const savedName = localStorage.getItem('finboot_user_name')
    const savedEmail = localStorage.getItem('finboot_user_email')
    if (savedName) setName(savedName)
    if (savedEmail) setEmail(savedEmail)
  }, [])

  const handleSaveProfile = () => {
    localStorage.setItem('finboot_user_name', name)
    localStorage.setItem('finboot_user_email', email)
    setIsEditing(false)
    alert('Perfil atualizado com sucesso!')
  }

  return (
    <div className="page-wrapper">
      <div className="page-title-block">
        <h1 className="headline-lg">Configurações</h1>
      </div>

      <div className="perfil-grid" style={{ display: 'grid', gap: '24px' }}>
        {/* Coluna Esquerda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Conta do Usuário */}
          <div>
            <h2 className="headline-sm text-primary" style={{ marginBottom: 16 }}>Conta do Usuário</h2>
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 72, height: 72,
                    borderRadius: '16px',
                    background: 'var(--color-primary-container)',
                    color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, fontWeight: 700,
                  }}>
                    {name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  {isEditing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        className="input-field" 
                        style={{ padding: '4px 8px', fontSize: 14 }}
                        placeholder="Seu nome"
                      />
                      <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        className="input-field" 
                        style={{ padding: '4px 8px', fontSize: 14 }}
                        placeholder="Seu email"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: 'var(--color-on-surface)' }}>{name}</h3>
                      <p className="body-sm text-muted" style={{ marginBottom: 12 }}>{email}</p>
                    </>
                  )}
                  
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <span style={{ background: 'color-mix(in srgb, var(--color-secondary) 20%, transparent)', color: 'var(--color-secondary)', padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>Premium Member</span>
                    <span style={{ background: 'var(--color-surface-container)', color: 'var(--color-on-surface-variant)', padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>ID: 4892 X</span>
                  </div>
                </div>
              </div>
              
              {isEditing ? (
                <button onClick={handleSaveProfile} className="btn-success" style={{ padding: '8px 20px', width: 'auto' }}>
                  Salvar
                </button>
              ) : (
                <button onClick={() => setIsEditing(true)} style={{
                  background: 'transparent', color: 'var(--color-primary-container)', border: '1.5px solid var(--color-primary-container)',
                  borderRadius: 'var(--radius-md)', padding: '8px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-family)',
                }}>Editar Perfil</button>
              )}
            </div>
          </div>

          {/* Configurações Gerais */}
          <div>
            <h2 className="headline-sm text-primary" style={{ marginBottom: 16 }}>Configurações Gerais</h2>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {[
                { icon: '🔔', title: 'Notificações', desc: 'Alertas de gastos, relatórios e IA' },
                { icon: '🛡️', title: 'Privacidade e Segurança', desc: 'Autenticação 2FA, senhas e LGPD' },
                { icon: '🎨', title: 'Aparência', desc: 'Tema claro, escuro e acessibilidade' },
                { icon: '🌐', title: 'Idioma e Região', desc: 'Português (Brasil), Moeda (BRL)' },
              ].map((item, i) => (
                <div key={item.title} className="table-row" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 24px',
                  borderBottom: i === 3 ? 'none' : '1px solid var(--color-outline-variant)',
                  cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'var(--color-surface-container)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                    }}>{item.icon}</div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 2, color: 'var(--color-on-surface)' }}>{item.title}</p>
                      <p className="body-sm text-muted" style={{ fontSize: 13 }}>{item.desc}</p>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-outline)">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Zona de Risco */}
          <div>
            <h2 className="headline-sm text-error" style={{ marginBottom: 16 }}>Zona de Risco</h2>
            <div className="card" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px',
              border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)', background: 'transparent',
            }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: 'var(--color-on-surface)' }}>Excluir Conta Permanentemente</h3>
                <p className="body-sm text-muted" style={{ fontSize: 13 }}>Isso removerá todos os seus dados e histórico financeiro de forma irreversível.</p>
              </div>
              <button style={{
                background: 'transparent', color: 'var(--color-error)', border: '1.5px solid color-mix(in srgb, var(--color-error) 50%, transparent)',
                borderRadius: 'var(--radius-md)', padding: '8px 24px', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-family)',
              }}>Apagar Tudo</button>
            </div>
          </div>
        </div>

        {/* Coluna Direita (Sidebar da Página) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Integrações */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--color-primary-container)' }}>Integrações</h3>
            <p className="body-sm text-muted" style={{ marginBottom: 20 }}>Conecte o FinanIA com suas ferramentas favoritas.</p>
            
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              border: '1px solid var(--color-outline-variant)', borderRadius: '12px', padding: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: '#e3f2fd', color: '#1da1f2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}>✈️</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>Telegram Bot</p>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-outline)', background: 'var(--color-surface-container)', padding: '2px 6px', borderRadius: 4 }}>EM BREVE</span>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-outline)">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>

            <div style={{ background: 'color-mix(in srgb, var(--color-primary-container) 8%, transparent)', borderRadius: '12px', padding: '16px', marginTop: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-primary-container)', marginBottom: 6 }}>✨ Dica do FinanIA</p>
              <p className="body-sm" style={{ color: 'var(--color-primary-container)', opacity: 0.9, lineHeight: 1.5, fontSize: 13 }}>
                Em breve você poderá registrar transações enviando uma simples mensagem de áudio pelo Telegram.
              </p>
            </div>
          </div>

          {/* Precisa de ajuda? */}
          <div className="card" style={{ background: 'var(--color-primary-container)', color: 'white', padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.1 }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, position: 'relative', zIndex: 2 }}>Precisa de ajuda?</h3>
            <p className="body-sm" style={{ opacity: 0.9, marginBottom: 24, lineHeight: 1.5, position: 'relative', zIndex: 2 }}>
              Nossa equipe de especialistas está pronta para ajudar você a dominar suas finanças.
            </p>
            <button style={{ background: 'white', color: 'var(--color-primary-container)', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-family)', position: 'relative', zIndex: 2 }}>
              Falar com Suporte
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

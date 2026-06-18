'use client'
import { useState, useRef, useEffect } from 'react'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: React.ReactNode
}

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'user',
      content: 'Pode me mostrar a tendência dos meus gastos com lazer nos últimos 3 meses?'
    },
    {
      id: 2,
      role: 'assistant',
      content: (
        <>
          <p style={{ marginBottom: 16 }}>
            Com certeza! Seus gastos com lazer apresentaram uma queda gradual. Aqui está a visão detalhada:
          </p>
          
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, background: 'transparent' }}>
            <div style={{ background: 'white', padding: '16px 20px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-on-surface-variant)', letterSpacing: '0.05em', marginBottom: 8 }}>TOTAL ACUMULADO</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-on-surface)' }}>R$ 1.420,00</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-secondary)', fontSize: 13, fontWeight: 600 }}>↓ 8.4%</span>
              </div>
            </div>
            <div style={{ background: 'white', padding: '16px 20px', borderRadius: '12px', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 84 }}>
              {[{ label: 'Jan', h: 40, c: '#e4ebf5' }, { label: 'Fev', h: 30, c: '#e4ebf5' }, { label: 'Mar', h: 20, c: 'var(--color-primary-container)' }].map((b) => (
                <div key={b.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: '100%' }}>
                  <div style={{ width: '80%', height: b.h, background: b.c, borderRadius: 2 }} />
                  <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--color-on-surface-variant)' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 13 }}>
            Isso liberou aproximadamente R$ 340,00 para sua meta de reserva de emergência.
          </p>
        </>
      )
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions = [
    'Resumo mensal 📊',
    'Dicas de economia 💡',
    'Previsão de gastos 📈',
    'Metas de investimento 📝',
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = { id: Date.now(), role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulando resposta da IA (Mock API)
    setTimeout(() => {
      let responseContent = "Entendi! Estou processando as informações dos seus gastos recentes para te dar a melhor resposta."
      
      const lowerInput = userMessage.content?.toString().toLowerCase() || ""
      if (lowerInput.includes('resumo') || lowerInput.includes('mês')) {
        responseContent = "Este mês, você gastou a maior parte em Moradia. Sugiro revisar as assinaturas ativas para ver se podemos encontrar espaço de economia."
      } else if (lowerInput.includes('economia') || lowerInput.includes('dicas')) {
        responseContent = "Uma ótima dica de economia: use a regra 50/30/20. Destine 50% para necessidades, 30% para desejos (onde está seu maior escape atualmente) e 20% para poupança."
      }

      const aiMessage: Message = { id: Date.now() + 1, role: 'assistant', content: responseContent }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="chat-page" style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Mensagens (Scrollable) */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Header / Boas-vindas */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <div style={{
            width: 48, height: 48,
            background: 'var(--color-surface-container)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, marginBottom: 20,
            color: 'var(--color-primary-container)',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a3 3 0 0 1 3 3v2h2v3h-2v1a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3v-1H5v-3h2v-2a3 3 0 0 1 3-3h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 13v2h2v-2H9zm4 0v2h2v-2h-2z"/>
            </svg>
          </div>
          <h1 className="headline-lg" style={{ textAlign: 'center', marginBottom: 12, color: 'var(--color-on-surface)' }}>
            Olá! Como posso ajudar suas finanças hoje?
          </h1>
          <p className="body-md text-muted" style={{ textAlign: 'center', maxWidth: 500 }}>
            Analisei seus gastos recentes e percebi uma economia de 12% em relação ao mês passado.
          </p>
        </div>

        {messages.map((msg) => (
          msg.role === 'user' ? (
            <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                background: '#e4ebf5',
                padding: '14px 20px',
                borderRadius: '20px 20px 4px 20px',
                maxWidth: '80%',
                fontSize: 14,
                color: 'var(--color-on-surface)',
                lineHeight: 1.5,
              }}>
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={msg.id} style={{ display: 'flex', gap: 16 }}>
              <div style={{
                width: 32, height: 32,
                background: 'var(--color-primary-container)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', flexShrink: 0,
                marginTop: 4,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a3 3 0 0 1 3 3v2h2v3h-2v1a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3v-1H5v-3h2v-2a3 3 0 0 1 3-3h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                </svg>
              </div>
              <div style={{
                background: '#f0f4f8',
                padding: '20px',
                borderRadius: '4px 20px 20px 20px',
                maxWidth: '85%',
                fontSize: 14,
                color: 'var(--color-on-surface)',
                lineHeight: 1.6,
              }}>
                {msg.content}
              </div>
            </div>
          )
        ))}

        {isTyping && (
           <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ width: 32, height: 32, background: 'var(--color-primary-container)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, marginTop: 4 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a3 3 0 0 1 3 3v2h2v3h-2v1a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3v-1H5v-3h2v-2a3 3 0 0 1 3-3h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>
            </div>
            <div style={{ background: '#f0f4f8', padding: '16px 20px', borderRadius: '4px 20px 20px 20px', color: 'var(--color-outline)', fontStyle: 'italic', fontSize: 14 }}>
              FinanIA está digitando...
            </div>
          </div>
        )}
        
        {/* Invisible element to ensure scroll reaches bottom */}
        <div ref={messagesEndRef} style={{ height: 20 }} />
      </div>

      {/* Footer / Input Area */}
      <div style={{ paddingBottom: 24, paddingTop: 12 }}>
        
        {/* Suggestion Chips */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16, justifyContent: 'center' }}>
          {suggestions.map((s) => (
            <button key={s} onClick={() => { setInput(s); setTimeout(handleSend, 100); }} style={{
              padding: '8px 16px',
              borderRadius: '99px',
              border: '1.5px solid var(--color-surface-container)',
              background: '#f8fafc',
              fontSize: 13, fontWeight: 500,
              fontFamily: 'var(--font-family)',
              cursor: 'pointer', color: 'var(--color-on-surface-variant)',
            }}>{s}</button>
          ))}
        </div>

        {/* Input Box */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'white',
          borderRadius: '99px',
          padding: '8px 12px 8px 20px',
          border: '1px solid var(--color-outline-variant)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre suas finanças..."
            style={{
              flex: 1, border: 'none', background: 'transparent',
              fontSize: 15, fontFamily: 'var(--font-family)',
              color: 'var(--color-on-surface)', outline: 'none',
            }}
          />
          <button onClick={handleSend} style={{
            width: 40, height: 40,
            background: 'var(--color-primary-container)',
            border: 'none', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            color: 'white',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}>
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>

        {/* Disclaimer */}
        <p style={{
          textAlign: 'center', marginTop: 16, fontSize: 10,
          fontWeight: 600, color: 'var(--color-outline)',
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>
          IA TREINADA PARA FORNECER CONSELHOS BASEADOS EM SEUS DADOS REAIS.
        </p>
      </div>

    </div>
  )
}

'use client'
import { useState } from 'react'

type Message = {
  role: 'user' | 'ai'
  content: string
}

const initialMessages: Message[] = [
  {
    role: 'ai',
    content: 'Olá! Sou sua IA financeira. Posso analisar seus gastos, dar dicas de economia e ajudar você a planejar melhor. Como posso ajudar?',
  },
  {
    role: 'user',
    content: 'Quanto gastei com alimentação esse mês?',
  },
  {
    role: 'ai',
    content: 'Você gastou R$ 214,50 em alimentação em junho — isso representa 36% do seu orçamento de R$ 600 para essa categoria. Ainda dá para usar R$ 385,50. Boa gestão! 🎯',
  },
]

const suggestions = [
  'Onde posso economizar?',
  'Resumo do mês',
  'Maior gasto este mês',
  'Criar meta de economia',
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [
      ...prev,
      { role: 'user', content: input },
      { role: 'ai', content: 'Analisando seus dados financeiros... Em breve conectarei ao Supabase para responder com seus dados reais! 🤖' },
    ])
    setInput('')
  }

  return (
    <div style={{ background: 'var(--color-surface)', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40,
            background: 'var(--color-primary-container)',
            borderRadius: 'var(--radius-full)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>🤖</div>
          <div>
            <h1 className="headline-sm">Chat Financeiro</h1>
            <p className="label-md text-muted">FinanIA · Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        padding: '16px 24px',
        paddingBottom: 160,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        overflowY: 'auto',
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            {msg.role === 'ai' && (
              <div style={{
                width: 28, height: 28,
                background: 'var(--color-primary-container)',
                borderRadius: 'var(--radius-full)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, flexShrink: 0, marginRight: 8, alignSelf: 'flex-end',
              }}>🤖</div>
            )}
            <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div style={{
        padding: '0 16px 12px',
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        position: 'fixed',
        bottom: 140,
        left: 0,
        right: 0,
        maxWidth: 390,
        margin: '0 auto',
        scrollbarWidth: 'none',
      }}>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--color-outline-variant)',
              background: 'var(--color-surface-container-lowest)',
              fontSize: 12,
              fontWeight: 500,
              fontFamily: 'var(--font-family)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              color: 'var(--color-on-surface)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        position: 'fixed',
        bottom: 70,
        left: 0, right: 0,
        maxWidth: 390,
        margin: '0 auto',
        padding: '12px 16px',
        background: 'var(--color-surface-container-lowest)',
        borderTop: '1px solid var(--color-outline-variant)',
        display: 'flex',
        gap: 8,
      }}>
        <input
          id="chat-input"
          type="text"
          className="input-field"
          placeholder="Pergunte sobre seus gastos..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{ flex: 1, padding: '10px 14px' }}
        />
        <button
          onClick={handleSend}
          style={{
            width: 44, height: 44,
            background: 'var(--color-primary-container)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

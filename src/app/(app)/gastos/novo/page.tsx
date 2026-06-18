'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categories = [
  { label: 'Alimentação', icon: '🛒' },
  { label: 'Transporte', icon: '🚗' },
  { label: 'Saúde', icon: '💊' },
  { label: 'Lazer', icon: '🎮' },
  { label: 'Assinaturas', icon: '📱' },
  { label: 'Educação', icon: '📚' },
  { label: 'Casa', icon: '🏠' },
  { label: 'Outros', icon: '📦' },
]

export default function NovoGastoPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('Alimentação')
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  return (
    <div style={{ background: 'var(--color-surface)', minHeight: '100dvh' }}>
      {/* Header */}
      <div className="page-header">
        <button
          onClick={() => router.back()}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, marginLeft: -8 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-on-surface)">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <h1 className="headline-sm">Novo Registro</h1>
        <div style={{ width: 40 }} />
      </div>

      <div className="page-content" style={{ paddingTop: 16 }}>
        {/* Valor */}
        <div className="card mb-lg" style={{ textAlign: 'center', padding: '32px 24px' }}>
          <p className="label-md text-muted" style={{ marginBottom: 12 }}>VALOR DO GASTO</p>
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ fontSize: 24, fontWeight: 600, color: 'var(--color-on-surface-variant)', marginRight: 8 }}>R$</span>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: 40,
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                width: 160,
                textAlign: 'center',
                fontFamily: 'var(--font-family)',
                letterSpacing: '-0.02em',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Descrição */}
        <div style={{ marginBottom: 16 }}>
          <div className="input-label">Descrição</div>
          <input
            id="name"
            type="text"
            className="input-field"
            placeholder="Ex: Supermercado, Uber..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Data */}
        <div style={{ marginBottom: 24 }}>
          <div className="input-label">Data</div>
          <input
            id="date"
            type="date"
            className="input-field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Categorias */}
        <div style={{ marginBottom: 32 }}>
          <p className="input-label" style={{ marginBottom: 12 }}>Categoria</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  padding: '12px 8px',
                  borderRadius: 'var(--radius-lg)',
                  border: selectedCategory === cat.label
                    ? '2px solid var(--color-primary-container)'
                    : '2px solid transparent',
                  background: selectedCategory === cat.label
                    ? 'color-mix(in srgb, var(--color-primary-container) 10%, transparent)'
                    : 'var(--color-surface-container-low)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-family)',
                }}
              >
                <span style={{ fontSize: 22 }}>{cat.icon}</span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: selectedCategory === cat.label ? 'var(--color-primary-container)' : 'var(--color-on-surface-variant)',
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Salvar */}
        <button className="btn-success" onClick={() => router.push('/gastos')}>
          Salvar Gasto
        </button>
      </div>
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const categories = [
  { label: 'Alimentação', icon: '🛒' },
  { label: 'Transporte', icon: '🚗' },
  { label: 'Compras', icon: '🛍️' },
  { label: 'Saúde', icon: '💊' },
  { label: 'Lazer', icon: '🎮' },
  { label: 'Moradia', icon: '🏠' },
  { label: 'Educação', icon: '📚' },
  { label: 'Outros', icon: '📦' },
]

export default function NovoGastoPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('Alimentação')
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recentTransactions, setRecentTransactions] = useState<any[]>([])

  useEffect(() => {
    async function fetchRecent() {
      const { data } = await supabase
        .from('gastos')
        .select('*')
        .order('date', { ascending: false })
        .limit(3)
      if (data) setRecentTransactions(data)
    }
    fetchRecent()
  }, [])

  const handleSave = async () => {
    if (!amount || !name || !date) {
      alert('Preencha todos os campos.')
      return
    }

    setIsSubmitting(true)
    try {
      const numericAmount = parseFloat(amount.replace(',', '.'))
      
      const { error } = await supabase
        .from('gastos')
        .insert([{
          name: name,
          amount: -Math.abs(numericAmount),
          category: selectedCategory,
          date: date
        }])

      if (error) {
        console.error('Erro ao salvar:', error)
        alert('Erro ao salvar gasto.')
      } else {
        router.push('/gastos')
      }
    } catch (err) {
      console.error(err)
      alert('Erro inesperado.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-wrapper">
      <div className="page-title-block" style={{ marginBottom: 32 }}>
        <h1 className="headline-lg">Nova Transação</h1>
        <p className="body-sm text-muted">Registre seus gastos com facilidade e precisão.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
        
        {/* Coluna Esquerda - Formulário */}
        <div className="card" style={{ flex: '1 1 500px', padding: 32 }}>
          
          {/* Valor da Transação */}
          <div style={{ marginBottom: 32 }}>
            <p className="label-md text-muted" style={{ marginBottom: 12 }}>VALOR DA TRANSAÇÃO</p>
            <div style={{
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid var(--color-outline-variant)'
            }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-primary)', marginRight: 8 }}>R$</span>
              <input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: 32,
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                  width: '100%',
                  fontFamily: 'var(--font-family)',
                  letterSpacing: '-0.02em',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Selecione a Categoria */}
          <div style={{ marginBottom: 32 }}>
            <p className="label-md text-muted" style={{ marginBottom: 12 }}>SELECIONE A CATEGORIA</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12 }}>
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '16px 8px',
                    borderRadius: '12px',
                    border: selectedCategory === cat.label
                      ? '1.5px solid var(--color-primary)'
                      : '1.5px solid var(--color-outline-variant)',
                    background: selectedCategory === cat.label
                      ? 'color-mix(in srgb, var(--color-primary) 5%, transparent)'
                      : 'white',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-family)',
                    transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: 24 }}>{cat.icon}</span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: selectedCategory === cat.label ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                    textAlign: 'center',
                  }}>
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Data e Descrição */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
            <div style={{ flex: '1 1 200px' }}>
              <p className="label-md text-muted" style={{ marginBottom: 8 }}>DATA DO GASTO</p>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '12px',
                  border: '1px solid var(--color-outline-variant)', background: '#f8fafc',
                  fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-on-surface)'
                }}
              />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <p className="label-md text-muted" style={{ marginBottom: 8 }}>DESCRIÇÃO (OPCIONAL)</p>
              <input
                id="name"
                type="text"
                placeholder="Ex: Jantar de aniversário"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '12px',
                  border: '1px solid var(--color-outline-variant)', background: '#f8fafc',
                  fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--color-on-surface)'
                }}
              />
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={isSubmitting}
            style={{
              width: '100%', padding: '16px', borderRadius: '12px',
              background: 'var(--color-primary)', color: 'white',
              fontSize: 16, fontWeight: 700, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1, fontFamily: 'var(--font-family)',
              boxShadow: '0 4px 12px rgba(15, 118, 110, 0.2)'
            }}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Gasto'}
          </button>
        </div>

        {/* Coluna Direita - Widgets */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Insight da IA */}
          <div className="card" style={{ background: 'var(--color-primary)', color: 'white', padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>✨</span>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Insight da IA</h3>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 16 }}>
              Percebi que você atingiu <strong>85%</strong> do seu orçamento para <strong>Alimentação</strong> este mês.
            </p>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, marginBottom: 16 }}>
              <div style={{ height: '100%', width: '85%', background: '#a7f3d0', borderRadius: 3 }} />
            </div>
            <p style={{ fontSize: 12, fontStyle: 'italic', opacity: 0.9 }}>
              *Considere reduzir jantares fora nos próximos 7 dias para manter sua meta de economia.
            </p>
          </div>

          {/* Últimos Lançamentos */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-on-surface)' }}>Últimos Lançamentos</h3>
              <Link href="/gastos" style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-primary)' }}>Ver tudo</Link>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {recentTransactions.length === 0 && (
                <p className="body-sm text-muted">Nenhuma transação.</p>
              )}
              {recentTransactions.map((t) => {
                const info = categories.find(c => c.label === t.category) || { icon: '📦' };
                const dt = new Date(t.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
                return (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'var(--color-surface-container)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
                      }}>
                        {info.icon}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)' }}>{t.name}</p>
                        <p style={{ fontSize: 11, color: 'var(--color-outline)' }}>{dt}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: t.amount > 0 ? 'var(--color-secondary)' : 'var(--color-error)' }}>
                        {t.amount > 0 ? '+' : '-'} R$ {Math.abs(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <span style={{
                        fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
                        background: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
                        color: 'var(--color-error)',
                      }}>
                        {t.category}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Banner bottom */}
          <div className="card" style={{
            padding: 24, position: 'relative', overflow: 'hidden', minHeight: 120,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            background: '#132c25', color: 'white'
          }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', opacity: 0.8, marginBottom: 4 }}>MANTENHA A CALMA</p>
            <p style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>Sua paz financeira começa com um registro.</p>
          </div>

        </div>
      </div>
    </div>
  )
}

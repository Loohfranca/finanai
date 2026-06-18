'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const categoryInfo: Record<string, { icon: string, color: string }> = {
  'Alimentação': { icon: '🛒', color: '#0f766e' },
  'Transporte': { icon: '🚗', color: '#006e2f' },
  'Compras': { icon: '🛍️', color: '#7f4025' },
  'Salário': { icon: '💰', color: '#006e2f' },
  'Moradia': { icon: '🏠', color: '#005c55' },
  'Saúde': { icon: '💊', color: '#ba1a1a' },
  'Lazer': { icon: '🎮', color: '#6b21a8' },
  'Assinaturas': { icon: '📱', color: '#be185d' },
  'Educação': { icon: '📚', color: '#1d4ed8' },
  'Casa': { icon: '🏠', color: '#005c55' },
  'Outros': { icon: '📦', color: '#475569' },
}

export default function DashboardPage() {
  const [gastos, setGastos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('João')

  useEffect(() => {
    // Carrega o nome do usuário
    const savedName = localStorage.getItem('finboot_user_name')
    if (savedName) {
      setUserName(savedName.split(' ')[0]) // Pega só o primeiro nome
    }

    async function fetchGastos() {
      const { data, error } = await supabase
        .from('gastos')
        .select('*')
        .order('date', { ascending: false })

      if (!error && data) {
        setGastos(data)
      }
      setLoading(false)
    }

    fetchGastos()
  }, [])

  // Calculations
  const totalMensal = Math.abs(gastos.filter(g => g.amount < 0).reduce((acc, curr) => acc + curr.amount, 0));
  
  // Group by category to show top 3
  const catSums: Record<string, number> = {}
  gastos.filter(g => g.amount < 0).forEach(g => {
    catSums[g.category] = (catSums[g.category] || 0) + Math.abs(g.amount)
  })
  
  const sortedCats = Object.entries(catSums).sort((a, b) => b[1] - a[1]).slice(0, 3)
  const categoryData = sortedCats.map(([name, spent]) => {
    const info = categoryInfo[name] || { color: '#6e7977' }
    return {
      name,
      spent,
      pct: totalMensal > 0 ? Math.round((spent / totalMensal) * 100) : 0,
      color: info.color
    }
  })

  const topCatName = categoryData.length > 0 ? categoryData[0].name : 'N/A'
  
  // Recent transactions
  const recentTransactions = gastos.slice(0, 4).map(g => ({
    id: g.id,
    name: g.name,
    category: g.category,
    amount: g.amount,
    icon: categoryInfo[g.category]?.icon || '📦',
    date: new Date(g.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }))

  return (
    <div className="page-wrapper">
      {/* Título da página */}
      <div className="page-title-block">
        <h1 className="headline-lg">Olá, {userName}!</h1>
        <p className="body-sm text-muted">Aqui está o resumo da sua saúde financeira hoje.</p>
      </div>

      {/* Grid 3 colunas — cards de resumo */}
      <div className="grid-3 mb-lg">
        {/* Card Total Mensal */}
        <div className="card">
          <div className="card-label-row">
            <span className="label-md text-primary" style={{ letterSpacing: '0.08em' }}>TOTAL MENSAL</span>
            <span style={{ fontSize: 20 }}>💳</span>
          </div>
          <p className="amount-display" style={{ marginTop: 12, marginBottom: 8 }}>
            R$ {totalMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          {totalMensal > 0 && <span className="badge-success">↓ 12% vs mês anterior</span>}
          <div className="divider" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-secondary)">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            <span className="body-sm" style={{ color: 'var(--color-secondary)', fontWeight: 500 }}>
              Você está dentro do orçamento previsto.
            </span>
          </div>
        </div>

        {/* Card Por Categoria */}
        <div className="card">
          <div className="card-label-row">
            <span className="label-md text-muted">Principais Categorias</span>
          </div>
          {/* Donut simples */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <div style={{
              width: 100, height: 100,
              borderRadius: '50%',
              background: categoryData.length > 0 ? `conic-gradient(
                ${categoryData[0]?.color} 0% ${categoryData[0]?.pct}%,
                ${categoryData[1]?.color || 'transparent'} ${categoryData[0]?.pct}% ${categoryData[0]?.pct + (categoryData[1]?.pct || 0)}%,
                ${categoryData[2]?.color || 'transparent'} ${categoryData[0]?.pct + (categoryData[1]?.pct || 0)}% 100%
              )` : '#e2e8f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'white',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 9, fontWeight: 500, color: 'var(--color-on-surface-variant)' }}>Top</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-primary)' }}>{topCatName}</span>
              </div>
            </div>
          </div>
          {categoryData.length === 0 ? (
            <p className="body-sm text-muted" style={{ textAlign: 'center' }}>Sem gastos ainda</p>
          ) : categoryData.map((cat) => (
            <div key={cat.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, display: 'inline-block' }} />
                <span className="body-sm">{cat.name}</span>
              </div>
              <span className="body-sm text-muted">{cat.pct}%</span>
            </div>
          ))}
        </div>

        {/* Card Evolução */}
        <div className="card">
          <div className="card-label-row">
            <span className="label-md text-muted">Evolução (3 meses)</span>
            <span className="label-md text-muted" style={{ background: 'var(--color-surface-container)', padding: '2px 8px', borderRadius: 99, fontSize: 10 }}>ÚLTIMOS</span>
          </div>
          {/* Gráfico de barras simples - Fixo por enquanto, atualiza se tiver histórico */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: 24, marginBottom: 16, height: 80, justifyContent: 'center' }}>
            {[
              { mes: 'Mês-2', h: 55 },
              { mes: 'Mês-1', h: 70 },
              { mes: 'Atual', h: totalMensal > 0 ? 40 : 10 },
            ].map((b, i) => (
              <div key={b.mes} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 28,
                  height: b.h,
                  background: i === 2 ? 'var(--color-primary-container)' : 'var(--color-surface-container)',
                  borderRadius: 6,
                  transition: 'height 0.3s',
                }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-on-surface-variant)' }}>{b.mes}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-secondary)">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
            </svg>
            <span className="body-sm" style={{ color: 'var(--color-secondary)', fontWeight: 500 }}>Gastos sob controle</span>
          </div>
        </div>
      </div>

      {/* Grid 2 colunas — Assistente + Insight */}
      <div className="grid-2 mb-lg">
        {/* Assistente FinanIA */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36,
              background: 'var(--color-primary-container)',
              borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>🤖</div>
            <span className="headline-sm">Assistente FinanIA</span>
          </div>
          <div style={{
            background: 'var(--color-surface-container-low)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: 20,
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}>
            <p className="body-sm">
              "João, notei que sua categoria de <strong>{topCatName !== 'N/A' ? topCatName : 'Geral'}</strong> tem sido o foco
              dos seus gastos. Gostaria de ver algumas dicas para economizar nela?"
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/chat" className="btn-primary" style={{ flex: 1, textAlign: 'center', padding: '10px 16px', fontSize: 14 }}>
              Sim, me mostre dicas
            </Link>
            <button style={{
              flex: 1, padding: '10px 16px', fontSize: 14, fontWeight: 500,
              background: 'transparent', border: '1.5px solid var(--color-outline-variant)',
              borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'var(--font-family)',
            }}>Agora não</button>
          </div>
        </div>

        {/* Insights IA */}
        <div className="card" style={{ background: 'linear-gradient(135deg, var(--color-surface-container-low) 0%, var(--color-surface-container) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 12 }}>
          <span style={{ fontSize: 40 }}>📈</span>
          <h3 className="headline-sm">Insights IA</h3>
          <p className="body-sm text-muted">Análise preditiva em tempo real baseada no seu perfil.</p>
          <Link href="/chat" className="btn-primary" style={{ padding: '8px 20px', fontSize: 13, width: 'auto' }}>
            Ver análise
          </Link>
        </div>
      </div>

      {/* Transações recentes */}
      <div className="section-header">
        <h2 className="headline-sm">Transações Recentes</h2>
        <Link href="/gastos" className="body-sm text-primary" style={{ fontWeight: 500 }}>Ver todas</Link>
      </div>
      <div className="card">
        {loading && <p className="body-sm text-muted text-center" style={{ padding: 16 }}>Carregando...</p>}
        {!loading && recentTransactions.length === 0 && (
          <p className="body-sm text-muted" style={{ padding: 16, textAlign: 'center' }}>Nenhuma transação ainda.</p>
        )}
        {recentTransactions.map((t) => (
          <div key={t.id} className="transaction-item">
            <div className="transaction-icon" style={{ background: 'var(--color-surface-container)' }}><span style={{ fontSize: 20 }}>{t.icon}</span></div>
            <div style={{ flex: 1 }}>
              <p className="body-sm" style={{ fontWeight: 500 }}>{t.name}</p>
              <p className="label-md text-muted">{t.category} · {t.date}</p>
            </div>
            <span className="body-sm amount-negative" style={{ fontWeight: 600, color: t.amount > 0 ? 'var(--color-secondary)' : 'var(--color-error)' }}>
              {t.amount > 0 ? '+' : '-'} R$ {Math.abs(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

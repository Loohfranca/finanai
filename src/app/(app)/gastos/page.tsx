'use client'
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

export default function GastosPage() {
  const [gastos, setGastos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

  return (
    <div className="page-wrapper">
      {/* Breadcrumb + Título */}
      <div className="page-title-block">
        <p className="label-md text-muted" style={{ marginBottom: 4 }}>FinanIA &rsaquo; Meus Gastos</p>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="headline-lg">Meus Gastos</h1>
            <p className="body-sm text-muted">Gerencie seu histórico financeiro com clareza e controle.</p>
          </div>
          {/* Filtros de período */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {['Este mês', 'Mês passado'].map((label, i) => (
              <button key={label} style={{
                padding: '7px 16px',
                borderRadius: 'var(--radius-md)',
                border: i === 0 ? 'none' : '1.5px solid var(--color-outline-variant)',
                background: i === 0 ? 'var(--color-on-surface)' : 'transparent',
                color: i === 0 ? 'white' : 'var(--color-on-surface)',
                fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: 'var(--font-family)',
              }}>{label}</button>
            ))}
            <button style={{
              padding: '7px 14px', borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-outline-variant)',
              background: 'transparent', color: 'var(--color-on-surface)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              fontFamily: 'var(--font-family)', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
              </svg>
              Personalizado
            </button>
          </div>
        </div>
      </div>

      {/* 3 Cards de resumo */}
      <div className="grid-3 mb-lg">
        <div className="card">
          <p className="label-md text-muted" style={{ marginBottom: 8 }}>TOTAL GASTOS</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <p className="amount-display" style={{ fontSize: 26 }}>
              R$ {Math.abs(gastos.filter(g => g.amount < 0).reduce((acc, curr) => acc + curr.amount, 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            {gastos.length > 0 && <span style={{ color: '#ef4444', fontSize: 13, fontWeight: 600 }}>↑12%</span>}
          </div>
        </div>

        <div className="card" style={{ background: 'var(--color-primary)' }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 8, letterSpacing: '0.08em' }}>SALDO EM CONTA</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <p style={{ fontSize: 26, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
              R$ {(gastos.reduce((acc, curr) => acc + curr.amount, 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white', fontSize: 10, fontWeight: 600,
              padding: '2px 8px', borderRadius: 99,
            }}>ESTÁVEL</span>
          </div>
        </div>

        <div className="card">
          <p className="label-md text-muted" style={{ marginBottom: 8 }}>ECONOMIA POTENCIAL</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <p className="amount-display" style={{ fontSize: 26, color: 'var(--color-secondary)' }}>R$ 0,00</p>
            <span style={{ color: 'var(--color-primary-container)', fontSize: 12, fontWeight: 600 }}>✨ Dica IA</span>
          </div>
        </div>
      </div>

      {/* Tabela de transações */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Header da tabela */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: '1px solid var(--color-outline-variant)',
        }}>
          <h2 className="headline-sm">Histórico Recente</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Filtrar', 'Exportar'].map((label, i) => (
              <button key={label} style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-outline-variant)',
                background: 'transparent',
                fontSize: 13, fontWeight: 500,
                cursor: 'pointer', fontFamily: 'var(--font-family)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  {i === 0
                    ? <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                    : <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                  }
                </svg>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cabeçalho das colunas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '130px 1fr 1fr auto',
          padding: '10px 24px',
          borderBottom: '1px solid var(--color-outline-variant)',
          background: 'var(--color-surface-container-low)',
        }}>
          {['Data', 'Categoria', 'Descrição', 'Valor'].map((col) => (
            <span key={col} className="label-md text-muted">{col}</span>
          ))}
        </div>

        {/* Linhas */}
        {loading && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
            Carregando gastos...
          </div>
        )}
        {!loading && gastos.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
            Nenhum gasto registrado ainda.
          </div>
        )}
        {gastos.map((g) => {
          const info = categoryInfo[g.category] || { icon: '📦', color: '#475569' };
          
          // Formatação simples da data
          const dateObj = new Date(g.date);
          const formattedDate = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

          const handleDelete = async (e: React.MouseEvent) => {
            e.stopPropagation();
            if (!confirm('Tem certeza que deseja excluir este registro?')) return;
            
            const { error } = await supabase.from('gastos').delete().eq('id', g.id);
            if (!error) {
              setGastos(gastos.filter(item => item.id !== g.id));
            } else {
              alert('Erro ao excluir registro.');
            }
          };

          return (
            <div key={g.id} style={{
              display: 'grid',
              gridTemplateColumns: '130px 1fr 1fr auto',
              padding: '14px 24px',
              borderBottom: '1px solid var(--color-outline-variant)',
              alignItems: 'center',
              transition: 'background 0.1s',
            }}
              className="table-row"
            >
              <span className="body-sm text-muted">{formattedDate}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: `color-mix(in srgb, ${info.color} 15%, transparent)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, flexShrink: 0,
                }}>{info.icon}</div>
                <span className="body-sm" style={{ fontWeight: 500 }}>{g.category}</span>
              </div>
              <span className="body-sm text-muted">{g.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span className="body-sm" style={{
                  fontWeight: 600,
                  color: g.amount > 0 ? 'var(--color-secondary)' : 'var(--color-error)',
                }}>
                  {g.amount > 0 ? '+' : '-'} R$ {Math.abs(g.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <button onClick={handleDelete} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-outline)', padding: 4 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

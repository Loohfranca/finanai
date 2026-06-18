import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FinanIA - Assistente Financeiro Inteligente',
  description: 'Controle suas finanças com o poder da IA. Acompanhe gastos, categorize despesas e obtenha insights personalizados.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  )
}

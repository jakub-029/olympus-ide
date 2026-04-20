import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Kbd({ children }: Props) {
  return (
    <span
      style={{
        background: 'var(--slate)',
        border: '1px solid var(--smoke)',
        borderBottomWidth: 2,
        color: 'var(--fg-1)',
        padding: '1px 6px',
        borderRadius: 3,
        font: '500 11px/1.3 var(--font-mono)'
      }}
    >
      {children}
    </span>
  )
}

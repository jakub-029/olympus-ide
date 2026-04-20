import { useState } from 'react'
import { Icon } from '../primitives/Icon'
import { Kbd } from '../primitives/Kbd'
import { PALETTE_ITEMS } from '@/data'
import type { CommandId } from '@/types'

interface Props {
  onClose: () => void
  onRun: (id: CommandId) => void
}

export function CommandPalette({ onClose, onRun }: Props) {
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const filtered = PALETTE_ITEMS.filter((x) => x.label.toLowerCase().includes(q.toLowerCase()))

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--backdrop)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 92,
        zIndex: 100
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 520,
          alignSelf: 'flex-start',
          background: 'var(--surface-float)',
          border: '1px solid var(--fog)',
          borderRadius: 6,
          boxShadow: 'var(--shadow-2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 14px',
            borderBottom: '1px solid var(--fog)'
          }}
        >
          <Icon name="search" size={14} color="var(--fg-3)" />
          <input
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setI(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              if (e.key === 'ArrowDown') setI((x) => Math.min(filtered.length - 1, x + 1))
              if (e.key === 'ArrowUp') setI((x) => Math.max(0, x - 1))
              if (e.key === 'Enter' && filtered[i]) {
                onRun(filtered[i].id as CommandId)
                onClose()
              }
            }}
            placeholder="Type a command"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--fg-1)',
              fontFamily: 'var(--font-ui)',
              fontSize: 14
            }}
          />
          <Kbd>esc</Kbd>
        </div>
        <div style={{ maxHeight: 340, overflow: 'auto', padding: 4 }}>
          {filtered.length === 0 && (
            <div style={{ padding: '18px 14px', color: 'var(--fg-3)', fontSize: 13 }}>No matches.</div>
          )}
          {filtered.map((x, idx) => (
            <div
              key={x.id}
              onClick={() => {
                onRun(x.id as CommandId)
                onClose()
              }}
              onMouseEnter={() => setI(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 3,
                cursor: 'pointer',
                background: idx === i ? 'var(--slate)' : 'transparent',
                color: 'var(--fg-1)',
                fontSize: 13,
                fontFamily: 'var(--font-ui)'
              }}
            >
              <Icon name={x.icon} size={14} color="var(--fg-2)" />
              <span style={{ flex: 1 }}>{x.label}</span>
              <div style={{ display: 'flex', gap: 3 }}>
                {x.keys.map((k, j) => (
                  <Kbd key={j}>{k}</Kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

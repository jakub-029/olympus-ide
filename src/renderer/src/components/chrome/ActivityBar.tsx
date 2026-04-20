import { useState } from 'react'
import { Icon } from '../primitives/Icon'
import type { IconName, PanelId } from '@/types'

interface Item {
  id: PanelId
  icon: IconName
  label: string
}

const ITEMS: Item[] = [
  { id: 'files', icon: 'folder', label: 'Files' },
  { id: 'search', icon: 'search', label: 'Search' },
  { id: 'git', icon: 'git', label: 'Source control' },
  { id: 'debug', icon: 'bug', label: 'Run & debug' },
  { id: 'preview', icon: 'globe', label: 'Preview' }
]

interface Props {
  active: PanelId
  onSelect: (id: PanelId) => void
}

export function ActivityBar({ active, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div
      style={{
        width: 48,
        background: 'var(--surface-app)',
        borderRight: '1px solid var(--fog)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px 0',
        gap: 4,
        flexShrink: 0
      }}
    >
      {ITEMS.map((it) => {
        const isActive = active === it.id
        const isHovered = hovered === it.id
        return (
          <button
            key={it.id}
            onClick={() => onSelect(it.id)}
            onMouseEnter={() => setHovered(it.id)}
            onMouseLeave={() => setHovered(null)}
            title={it.label}
            style={{
              width: 36,
              height: 36,
              background: 'transparent',
              border: 'none',
              borderRadius: 3,
              cursor: 'pointer',
              color: isActive || isHovered ? 'var(--fg-1)' : 'var(--fg-3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'color 120ms var(--ease-out)'
            }}
          >
            <Icon name={it.icon} size={20} />
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  bottom: 4,
                  width: 2,
                  background: 'var(--brass-base)',
                  borderRadius: '0 2px 2px 0'
                }}
              />
            )}
          </button>
        )
      })}
      <div style={{ flex: 1 }} />
      <button
        title="Settings"
        onMouseEnter={() => setHovered('settings')}
        onMouseLeave={() => setHovered(null)}
        style={{
          width: 36,
          height: 36,
          background: 'transparent',
          border: 'none',
          borderRadius: 3,
          cursor: 'pointer',
          color: hovered === 'settings' ? 'var(--fg-1)' : 'var(--fg-3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 120ms var(--ease-out)'
        }}
      >
        <Icon name="settings" size={20} />
      </button>
    </div>
  )
}

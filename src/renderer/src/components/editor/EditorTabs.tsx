import type { OpenFile } from '@/types'

interface Props {
  openFiles: OpenFile[]
  activePath: string | null
  onSelect: (path: string) => void
  onClose: (path: string) => void
}

export function EditorTabs({ openFiles, activePath, onSelect, onClose }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        background: 'var(--surface-app)',
        borderBottom: '1px solid var(--fog)',
        flexShrink: 0,
        overflowX: 'auto'
      }}
    >
      {openFiles.map((f) => {
        const active = f.path === activePath
        return (
          <div
            key={f.path}
            onClick={() => onSelect(f.path)}
            style={{
              padding: '8px 12px 7px 14px',
              background: active ? 'var(--graphite)' : 'transparent',
              color: active ? 'var(--fg-1)' : 'var(--fg-2)',
              borderRight: '1px solid var(--fog)',
              borderBottom: active ? '2px solid var(--brass-base)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontFamily: 'var(--font-ui)',
              fontWeight: active ? 500 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.background = 'var(--slate)'
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.background = 'transparent'
            }}
          >
            <span style={{ width: 10, height: 10, background: f.color, borderRadius: 1.5 }} />
            <span>{f.name}</span>
            <span
              onClick={(e) => {
                e.stopPropagation()
                onClose(f.path)
              }}
              style={{
                marginLeft: 2,
                color: f.dirty ? 'var(--brass-base)' : 'var(--fg-3)',
                fontSize: 12,
                width: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {f.dirty ? '●' : '×'}
            </span>
          </div>
        )
      })}
    </div>
  )
}

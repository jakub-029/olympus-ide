import { Icon } from '../primitives/Icon'
import logoMark from '@/assets/logo-mark.svg'

interface Props {
  url: string
}

export function BrowserPreview({ url }: Props) {
  return (
    <div
      style={{
        flex: 1,
        background: 'var(--graphite)',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid var(--fog)'
      }}
    >
      <div
        style={{
          height: 32,
          background: 'var(--surface-app)',
          borderBottom: '1px solid var(--fog)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '0 10px',
          flexShrink: 0
        }}
      >
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--fg-3)',
            cursor: 'pointer',
            padding: 3
          }}
        >
          <Icon name="chevron-right" size={13} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--fg-3)',
            cursor: 'pointer',
            padding: 3
          }}
        >
          <Icon name="chevron-right" size={13} />
        </button>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--fg-3)',
            cursor: 'pointer',
            padding: 3
          }}
        >
          <Icon name="reload" size={13} />
        </button>
        <div
          style={{
            flex: 1,
            background: 'var(--graphite)',
            border: '1px solid var(--fog)',
            borderRadius: 3,
            padding: '3px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--fg-2)'
          }}
        >
          {url}
        </div>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--fg-3)',
            cursor: 'pointer',
            padding: 3
          }}
        >
          <Icon name="split" size={13} />
        </button>
      </div>
      <div
        style={{
          flex: 1,
          background: '#0f1319',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--fg-2)',
          padding: 24,
          overflow: 'auto'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 360 }}>
          <img src={logoMark} width={64} height={64} alt="" style={{ marginBottom: 18 }} />
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              color: 'var(--fg-1)',
              fontWeight: 500,
              marginBottom: 8
            }}
          >
            Hello, Olympus.
          </div>
          <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>
            Your dev server is running. Edit <code style={{ color: 'var(--brass-base)' }}>src/App.tsx</code> and save.
          </div>
        </div>
      </div>
    </div>
  )
}

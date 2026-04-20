import { useState } from 'react'
import { Icon } from '../primitives/Icon'

type Line =
  | { kind: 'prompt'; host: string; path: string; cmd: string }
  | { kind: 'out'; text: string; color?: string }

interface Props {
  onClose: () => void
}

const INITIAL_LINES: Line[] = [
  { kind: 'prompt', host: 'olympus-core', path: '~/src', cmd: 'npm run dev' },
  { kind: 'out', text: '> olympus-core@0.1.0 dev' },
  { kind: 'out', text: '> vite --port 5173' },
  { kind: 'out', text: '' },
  { kind: 'out', text: '  VITE v5.2.0  ready in 284 ms', color: 'var(--success)' },
  { kind: 'out', text: '' },
  { kind: 'out', text: '  ➜  Local:   http://localhost:5173/' },
  { kind: 'out', text: '  ➜  Network: use --host to expose' },
  { kind: 'prompt', host: 'olympus-core', path: '~/src', cmd: '' }
]

const TABS = ['Problems', 'Output', 'Terminal', 'Ports']

export function Terminal({ onClose }: Props) {
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES)
  const [input, setInput] = useState('')

  const run = (cmd: string) => {
    if (cmd === 'clear') {
      setLines([{ kind: 'prompt', host: 'olympus-core', path: '~/src', cmd: '' }])
      return
    }

    const out: Line[] = [{ kind: 'prompt', host: 'olympus-core', path: '~/src', cmd }]

    if (cmd === 'ls') {
      out.push({ kind: 'out', text: 'src/  package.json  README.md  tsconfig.json' })
    } else if (cmd === 'pwd') {
      out.push({ kind: 'out', text: '/Users/jakub/olympus-core' })
    } else if (cmd.startsWith('echo ')) {
      out.push({ kind: 'out', text: cmd.slice(5) })
    } else if (cmd === 'git status') {
      out.push({ kind: 'out', text: 'On branch main' })
      out.push({ kind: 'out', text: 'Changes not staged for commit:' })
      out.push({ kind: 'out', text: '  modified:   src/core/summit.ts', color: 'var(--warn)' })
      out.push({ kind: 'out', text: '  modified:   src/core/peak.ts', color: 'var(--warn)' })
    } else if (cmd) {
      out.push({ kind: 'out', text: `zsh: command not found: ${cmd}`, color: 'var(--danger)' })
    }

    out.push({ kind: 'prompt', host: 'olympus-core', path: '~/src', cmd: '' })
    setLines((prev) => [...prev.slice(0, -1), ...out])
  }

  return (
    <div
      style={{
        background: 'var(--surface-app)',
        display: 'flex',
        flexDirection: 'column',
        height: 220,
        borderTop: '1px solid var(--fog)',
        flexShrink: 0
      }}
    >
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--fog)',
          background: 'var(--graphite)',
          paddingLeft: 8,
          alignItems: 'stretch',
          height: 30,
          flexShrink: 0
        }}
      >
        {TABS.map((t, i) => (
          <div
            key={t}
            style={{
              padding: '6px 12px',
              fontSize: 11,
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              color: i === 2 ? 'var(--fg-1)' : 'var(--fg-3)',
              borderBottom: i === 2 ? '2px solid var(--brass-base)' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {t}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--fg-3)',
            cursor: 'pointer',
            padding: '0 10px'
          }}
        >
          <Icon name="x" size={14} />
        </button>
      </div>
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '8px 12px',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          lineHeight: 1.55
        }}
      >
        {lines.map((l, i) =>
          l.kind === 'prompt' ? (
            <div key={i} style={{ color: 'var(--fg-1)', display: 'flex', gap: 6 }}>
              <span style={{ color: 'var(--success)' }}>{l.host}</span>
              <span style={{ color: 'var(--fg-3)' }}>{l.path}</span>
              <span style={{ color: 'var(--brass-base)' }}>$</span>
              {i === lines.length - 1 ? (
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      run(input)
                      setInput('')
                    }
                  }}
                  autoFocus
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--fg-1)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12
                  }}
                />
              ) : (
                <span>{l.cmd}</span>
              )}
            </div>
          ) : (
            <div key={i} style={{ color: l.color ?? 'var(--fg-2)', whiteSpace: 'pre' }}>
              {l.text}
            </div>
          )
        )}
      </div>
    </div>
  )
}

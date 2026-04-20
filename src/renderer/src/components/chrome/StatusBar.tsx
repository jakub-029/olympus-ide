import { Icon } from '../primitives/Icon'

interface Props {
  branch?: string
  problems?: number
  line?: number
  col?: number
  lang?: string
}

export function StatusBar({ branch = 'main', problems = 0, line = 1, col = 1, lang = 'TypeScript' }: Props) {
  return (
    <div
      style={{
        height: 22,
        background: 'var(--surface-app)',
        borderTop: '1px solid var(--fog)',
        display: 'flex',
        alignItems: 'center',
        fontSize: 11,
        fontFamily: 'var(--font-ui)',
        color: 'var(--fg-2)',
        flexShrink: 0
      }}
    >
      <div
        style={{
          padding: '0 10px',
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          borderRight: '1px solid var(--fog)'
        }}
      >
        <Icon name="git" size={11} /> {branch}
      </div>
      <div style={{ padding: '0 10px', borderRight: '1px solid var(--fog)' }}>↓ 0 ↑ 2</div>
      <div
        style={{
          padding: '0 10px',
          borderRight: '1px solid var(--fog)',
          color: problems ? 'var(--danger)' : 'var(--fg-2)',
          display: 'flex',
          gap: 6,
          alignItems: 'center'
        }}
      >
        <Icon name="alert-circle" size={11} /> {problems} problems
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ padding: '0 10px', borderLeft: '1px solid var(--fog)' }}>{lang}</div>
      <div style={{ padding: '0 10px', borderLeft: '1px solid var(--fog)' }}>UTF-8</div>
      <div style={{ padding: '0 10px', borderLeft: '1px solid var(--fog)' }}>
        Ln {line}, Col {col}
      </div>
    </div>
  )
}

import logoMark from '@/assets/logo-mark.svg'

interface Props {
  title?: string
}

export function Titlebar({ title = 'olympus-core' }: Props) {
  return (
    <div
      className="titlebar-drag"
      style={{
        height: 32,
        background: 'var(--graphite)',
        borderBottom: '1px solid var(--fog)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px 0 80px',
        gap: 10,
        flexShrink: 0
      }}
    >
      <div
        style={{
          flex: 1,
          textAlign: 'center',
          color: 'var(--fg-2)',
          fontSize: 12,
          fontFamily: 'var(--font-ui)'
        }}
      >
        {title}
      </div>
      <img src={logoMark} alt="Olympus" style={{ height: 18, opacity: 0.7 }} />
    </div>
  )
}

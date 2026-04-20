interface Props {
  lines: string[]
  activeLine?: number
}

export function Code({ lines, activeLine = 7 }: Props) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        background: 'var(--surface-app)',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        lineHeight: 1.55,
        overflow: 'auto'
      }}
    >
      <div
        style={{
          padding: '12px 10px',
          color: 'var(--fg-3)',
          textAlign: 'right',
          minWidth: 48,
          userSelect: 'none',
          fontSize: 12
        }}
      >
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div style={{ padding: '12px 0 60px 0', flex: 1, color: 'var(--fg-1)' }}>
        {lines.map((ln, i) => {
          const isActive = i === activeLine
          return (
            <div
              key={i}
              style={{
                minHeight: '1.55em',
                background: isActive ? 'rgba(199,154,75,0.06)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--brass-base)' : '2px solid transparent',
                paddingLeft: 10
              }}
              dangerouslySetInnerHTML={{ __html: ln }}
            />
          )
        })}
      </div>
      <div
        style={{
          width: 44,
          background: 'var(--graphite)',
          borderLeft: '1px solid var(--fog)',
          padding: '6px 4px',
          flexShrink: 0
        }}
      >
        {lines.map((_, i) => (
          <div
            key={i}
            style={{
              height: 3,
              margin: '1px 0',
              background: i === activeLine ? 'var(--brass-base)' : 'var(--smoke)',
              opacity: i === activeLine ? 1 : 0.4,
              width: `${30 + ((i * 17) % 50)}%`
            }}
          />
        ))}
      </div>
    </div>
  )
}

import { Kbd } from '../primitives/Kbd'
import contour from '@/assets/contour-lines.svg'

export function EmptyEditor() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface-app)',
        flexDirection: 'column',
        gap: 12
      }}
    >
      <img src={contour} alt="" style={{ width: 300, opacity: 0.5 }} />
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          color: 'var(--fg-2)',
          fontWeight: 500
        }}
      >
        No open files.
      </div>
      <div
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 12,
          color: 'var(--fg-3)',
          display: 'flex',
          gap: 8,
          alignItems: 'center'
        }}
      >
        Press <Kbd>⌘</Kbd>
        <Kbd>P</Kbd> to open a file.
      </div>
    </div>
  )
}

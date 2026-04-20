import { useEffect, useRef } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import { Icon } from '../primitives/Icon'

interface Props {
  onClose: () => void
}

const TABS = ['Problems', 'Output', 'Terminal', 'Ports']

// Olympus palette — xterm ANSI colors mapped to Thunder theme.
const XTERM_THEME = {
  background: '#0B0E13',
  foreground: '#E8E6DF',
  cursor: '#C79A4B',
  cursorAccent: '#0B0E13',
  selectionBackground: 'rgba(199,154,75,0.25)',
  black: '#0B0E13',
  red: '#C56B5C',
  green: '#7FA07F',
  yellow: '#D4A656',
  blue: '#6A8FB5',
  magenta: '#BFA78A',
  cyan: '#8AA8C7',
  white: '#E8E6DF',
  brightBlack: '#5D6472',
  brightRed: '#D8806E',
  brightGreen: '#97BB97',
  brightYellow: '#E6BD6D',
  brightBlue: '#8AA8C7',
  brightMagenta: '#D4BDA2',
  brightCyan: '#A8BFDA',
  brightWhite: '#F2F0EA'
}

export function Terminal({ onClose }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const termRef = useRef<XTerm | null>(null)
  const fitRef = useRef<FitAddon | null>(null)
  const ptyIdRef = useRef<string | null>(null)

  useEffect(() => {
    if (!hostRef.current) return

    const term = new XTerm({
      fontFamily: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace',
      fontSize: 12,
      lineHeight: 1.4,
      cursorBlink: true,
      cursorStyle: 'block',
      allowProposedApi: true,
      theme: XTERM_THEME,
      scrollback: 5000
    })

    const fit = new FitAddon()
    term.loadAddon(fit)
    term.open(hostRef.current)
    fit.fit()

    termRef.current = term
    fitRef.current = fit

    let disposeData: (() => void) | null = null
    let disposeExit: (() => void) | null = null
    let cancelled = false

    const cols = term.cols
    const rows = term.rows

    window.olympus.terminal
      .spawn({ cols, rows })
      .then(({ id }) => {
        if (cancelled) {
          window.olympus.terminal.kill(id)
          return
        }
        ptyIdRef.current = id
        disposeData = window.olympus.terminal.onData(id, (data) => term.write(data))
        disposeExit = window.olympus.terminal.onExit(id, () => {
          term.writeln('\r\n\x1b[2m[process exited]\x1b[0m')
        })
        term.onData((data) => window.olympus.terminal.write(id, data))
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err)
        term.writeln(`\x1b[31mFailed to spawn shell: ${msg}\x1b[0m`)
      })

    const ro = new ResizeObserver(() => {
      if (!fitRef.current || !termRef.current || !ptyIdRef.current) return
      try {
        fitRef.current.fit()
        window.olympus.terminal.resize(ptyIdRef.current, termRef.current.cols, termRef.current.rows)
      } catch {
        /* the host may be detaching */
      }
    })
    ro.observe(hostRef.current)

    const onFocus = () => term.focus()
    hostRef.current.addEventListener('click', onFocus)

    return () => {
      cancelled = true
      ro.disconnect()
      hostRef.current?.removeEventListener('click', onFocus)
      disposeData?.()
      disposeExit?.()
      if (ptyIdRef.current) window.olympus.terminal.kill(ptyIdRef.current)
      term.dispose()
      termRef.current = null
      fitRef.current = null
      ptyIdRef.current = null
    }
  }, [])

  return (
    <div
      style={{
        background: 'var(--surface-app)',
        display: 'flex',
        flexDirection: 'column',
        height: 260,
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
          aria-label="Close terminal"
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
      <div ref={hostRef} className="olympus-terminal" style={{ flex: 1, padding: '6px 8px', overflow: 'hidden' }} />
    </div>
  )
}

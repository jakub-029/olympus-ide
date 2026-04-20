import { useEffect, useState } from 'react'
import { Titlebar } from './components/chrome/Titlebar'
import { ActivityBar } from './components/chrome/ActivityBar'
import { StatusBar } from './components/chrome/StatusBar'
import { Sidebar } from './components/sidebar/Sidebar'
import { EditorTabs } from './components/editor/EditorTabs'
import { Code } from './components/editor/Code'
import { EmptyEditor } from './components/editor/EmptyEditor'
import { Terminal } from './components/panels/Terminal'
import { BrowserPreview } from './components/panels/BrowserPreview'
import { CommandPalette } from './components/palette/CommandPalette'
import { Button } from './components/primitives/Button'
import { TREE, FILE_CONTENT, DEFAULT_COLOR } from './data'
import type { CommandId, OpenFile, PanelId, Theme } from './types'

const INITIAL_OPEN: OpenFile[] = [
  { path: '/src/core/summit.ts', name: 'summit.ts', color: '#C79A4B', dirty: true }
]

export function App() {
  const [theme, setTheme] = useState<Theme>('thunder')
  const [activePanel, setActivePanel] = useState<PanelId>('files')
  const [openFiles, setOpenFiles] = useState<OpenFile[]>(INITIAL_OPEN)
  const [activePath, setActivePath] = useState<string | null>('/src/core/summit.ts')
  const [showTerminal, setShowTerminal] = useState(true)
  const [showPreview, setShowPreview] = useState(true)
  const [showPalette, setShowPalette] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (mod && (e.key === 'k' || e.key === 'p')) {
        e.preventDefault()
        setShowPalette(true)
      }
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        setShowTerminal((t) => !t)
      }
      if (e.key === 'Escape') setShowPalette(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const openFile = (path: string, name: string) => {
    setOpenFiles((prev) => {
      if (prev.some((f) => f.path === path)) return prev
      const entry = FILE_CONTENT[path]
      return [
        ...prev,
        {
          path,
          name: entry?.name ?? name,
          color: entry?.color ?? DEFAULT_COLOR,
          dirty: entry?.dirty ?? false
        }
      ]
    })
    setActivePath(path)
  }

  const closeFile = (path: string) => {
    setOpenFiles((prev) => {
      const next = prev.filter((f) => f.path !== path)
      if (activePath === path) {
        setActivePath(next.length ? next[next.length - 1].path : null)
      }
      return next
    })
  }

  const runCommand = (id: CommandId) => {
    switch (id) {
      case 'view.terminal':
        setShowTerminal((t) => !t)
        break
      case 'view.preview':
        setShowPreview((p) => !p)
        break
      case 'theme.toggle':
        setTheme((t) => (t === 'thunder' ? 'marble' : 'thunder'))
        break
      case 'file.new': {
        const n = openFiles.length + 1
        const p = `/src/untitled-${n}.ts`
        setOpenFiles((prev) => [
          ...prev,
          { path: p, name: `untitled-${n}.ts`, color: DEFAULT_COLOR, dirty: true }
        ])
        setActivePath(p)
        break
      }
      default:
        break
    }
  }

  const active = activePath ? openFiles.find((f) => f.path === activePath) ?? null : null
  const activeContent = activePath ? FILE_CONTENT[activePath] ?? null : null

  return (
    <>
      <Titlebar title={`olympus-core${active ? ' — ' + active.name : ''}`} />
      <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative' }}>
        <ActivityBar active={activePanel} onSelect={setActivePanel} />
        <Sidebar active={activePanel} tree={TREE} activePath={activePath} onSelectFile={openFile} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0
              }}
            >
              <EditorTabs
                openFiles={openFiles}
                activePath={activePath}
                onSelect={setActivePath}
                onClose={closeFile}
              />
              <div
                style={{
                  height: 34,
                  background: 'var(--graphite)',
                  borderBottom: '1px solid var(--fog)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  gap: 8,
                  flexShrink: 0
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--fg-3)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  src &nbsp;›&nbsp; core &nbsp;›&nbsp;{' '}
                  <span style={{ color: 'var(--fg-1)' }}>{active?.name ?? '—'}</span>
                </span>
                <div style={{ flex: 1 }} />
                <Button variant="ghost" size="sm" icon="split" />
                <Button variant="primary" size="sm" icon="play">
                  Run
                </Button>
              </div>
              {active && activeContent ? <Code lines={activeContent.lines} /> : <EmptyEditor />}
              {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
            </div>
            {showPreview && (
              <div style={{ width: 380, display: 'flex', flexShrink: 0 }}>
                <BrowserPreview url="http://localhost:5173" />
              </div>
            )}
          </div>
        </div>

        {showPalette && <CommandPalette onClose={() => setShowPalette(false)} onRun={runCommand} />}
      </div>
      <StatusBar problems={0} line={11} col={42} lang={activeContent?.lang ?? 'Plain text'} />
    </>
  )
}

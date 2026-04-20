import { useState } from 'react'
import { Icon } from '../primitives/Icon'
import { TreeNode } from './TreeNode'
import type { PanelId, TreeNodeData } from '@/types'

interface Props {
  active: PanelId
  tree: TreeNodeData[]
  activePath: string | null
  onSelectFile: (path: string, name: string) => void
}

const TITLES: Record<PanelId, string> = {
  files: 'Explorer',
  search: 'Search',
  git: 'Source control',
  debug: 'Run & debug',
  preview: 'Preview'
}

export function Sidebar({ active, tree, activePath, onSelectFile }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(['/src', '/src/core']))

  const toggleExpand = (p: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(p)) next.delete(p)
      else next.add(p)
      return next
    })
  }

  return (
    <div
      style={{
        width: 260,
        background: 'var(--graphite)',
        borderRight: '1px solid var(--fog)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}
    >
      <div
        style={{
          padding: '10px 16px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--fg-3)',
            fontFamily: 'var(--font-ui)'
          }}
        >
          {TITLES[active]}
        </span>
        {active === 'files' && (
          <div style={{ display: 'flex', gap: 2 }}>
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--fg-3)',
                cursor: 'pointer',
                padding: 3,
                display: 'flex'
              }}
            >
              <Icon name="plus" size={13} />
            </button>
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--fg-3)',
                cursor: 'pointer',
                padding: 3,
                display: 'flex'
              }}
            >
              <Icon name="reload" size={13} />
            </button>
          </div>
        )}
      </div>

      {active === 'files' && (
        <>
          <div
            style={{
              padding: '0 12px 6px',
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              fontSize: 11,
              color: 'var(--fg-2)',
              fontWeight: 600
            }}
          >
            <Icon name="chevron-down" size={10} /> OLYMPUS-CORE
          </div>
          <div style={{ overflowY: 'auto', paddingBottom: 8 }}>
            {tree.map((n, i) => (
              <TreeNode
                key={i}
                node={n}
                activePath={activePath}
                onSelect={onSelectFile}
                expanded={expanded}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>
        </>
      )}

      {active === 'search' && (
        <div style={{ padding: '0 12px' }}>
          <input
            placeholder="Search"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: 'var(--surface-app)',
              border: '1px solid var(--fog)',
              color: 'var(--fg-1)',
              padding: '6px 9px',
              borderRadius: 3,
              font: '400 12px/1.3 var(--font-ui)',
              outline: 'none',
              marginBottom: 8
            }}
          />
          <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>Type to search files</div>
        </div>
      )}

      {active === 'git' && (
        <div style={{ padding: '0 16px', fontSize: 12, color: 'var(--fg-2)' }}>
          <div style={{ marginBottom: 10, display: 'flex', gap: 6, alignItems: 'center' }}>
            <Icon name="git" size={13} color="var(--success)" />
            <span style={{ color: 'var(--fg-1)' }}>main</span>
            <span
              style={{
                color: 'var(--fg-3)',
                marginLeft: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: 11
              }}
            >
              ↑ 2
            </span>
          </div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--fg-3)',
              marginBottom: 6
            }}
          >
            Changes · 3
          </div>
          {(
            [
              ['summit.ts', 'M', 'var(--warn)'],
              ['peak.ts', 'M', 'var(--warn)'],
              ['README.md', 'A', 'var(--success)']
            ] as const
          ).map(([n, s, c]) => (
            <div
              key={n}
              style={{
                display: 'flex',
                gap: 8,
                padding: '3px 0',
                fontFamily: 'var(--font-ui)',
                fontSize: 12
              }}
            >
              <span style={{ color: c, fontFamily: 'var(--font-mono)', width: 12 }}>{s}</span>
              <span style={{ color: 'var(--fg-1)' }}>{n}</span>
            </div>
          ))}
        </div>
      )}

      {active === 'debug' && (
        <div style={{ padding: '0 16px', fontSize: 12, color: 'var(--fg-2)' }}>
          <div style={{ marginBottom: 10 }}>No launch configurations.</div>
          <button
            style={{
              background: 'transparent',
              border: '1px solid var(--smoke)',
              color: 'var(--fg-1)',
              padding: '5px 10px',
              borderRadius: 3,
              fontSize: 12,
              cursor: 'pointer'
            }}
          >
            Create launch.json
          </button>
        </div>
      )}

      {active === 'preview' && (
        <div style={{ padding: '0 16px', fontSize: 12, color: 'var(--fg-2)' }}>
          <input
            defaultValue="http://localhost:5173"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: 'var(--surface-app)',
              border: '1px solid var(--fog)',
              color: 'var(--fg-1)',
              padding: '6px 9px',
              borderRadius: 3,
              font: '400 12px/1.3 var(--font-mono)',
              outline: 'none',
              marginBottom: 8
            }}
            readOnly
          />
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span
              style={{
                width: 8,
                height: 8,
                background: 'var(--success)',
                borderRadius: '50%'
              }}
            />
            <span style={{ fontSize: 11, color: 'var(--fg-2)' }}>Running · dev server</span>
          </div>
        </div>
      )}
    </div>
  )
}

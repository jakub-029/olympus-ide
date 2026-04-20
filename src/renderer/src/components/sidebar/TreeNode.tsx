import { Icon } from '../primitives/Icon'
import type { TreeNodeData } from '@/types'

interface Props {
  node: TreeNodeData
  depth?: number
  activePath: string | null
  onSelect: (path: string, name: string) => void
  expanded: Set<string>
  toggleExpand: (path: string) => void
  path?: string
}

function hasChildren(node: TreeNodeData): node is TreeNodeData & { children: TreeNodeData[] } {
  return 'children' in node && Array.isArray(node.children)
}

export function TreeNode({ node, depth = 0, activePath, onSelect, expanded, toggleExpand, path = '' }: Props) {
  const full = path + '/' + node.name
  const isDir = hasChildren(node)
  const isOpen = expanded.has(full)
  const active = activePath === full
  const paddingLeft = active ? 10 + depth * 14 : 12 + depth * 14

  return (
    <>
      <div
        onClick={() => (isDir ? toggleExpand(full) : onSelect(full, node.name))}
        style={{
          padding: `3px 12px`,
          paddingLeft,
          display: 'flex',
          gap: 4,
          alignItems: 'center',
          fontSize: 12,
          fontFamily: 'var(--font-ui)',
          color: active ? 'var(--fg-1)' : isDir ? 'var(--fg-1)' : 'var(--fg-2)',
          background: active ? 'var(--slate)' : 'transparent',
          borderLeft: active ? '2px solid var(--brass-base)' : '2px solid transparent',
          cursor: 'pointer',
          userSelect: 'none',
          fontWeight: isDir ? 500 : 400
        }}
        onMouseEnter={(e) => {
          if (!active) e.currentTarget.style.background = 'var(--slate)'
        }}
        onMouseLeave={(e) => {
          if (!active) e.currentTarget.style.background = 'transparent'
        }}
      >
        {isDir ? (
          <Icon name={isOpen ? 'chevron-down' : 'chevron-right'} size={10} color="var(--fg-3)" />
        ) : (
          <span style={{ width: 10 }} />
        )}
        {isDir ? (
          <Icon name={isOpen ? 'folder-open' : 'folder'} size={13} color="var(--fg-3)" />
        ) : (
          <span
            style={{
              width: 10,
              height: 10,
              background: node.color ?? 'var(--fg-3)',
              borderRadius: 1.5,
              display: 'inline-block'
            }}
          />
        )}
        <span>{node.name}</span>
        {node.dirty && <span style={{ color: 'var(--brass-base)', fontSize: 10, marginLeft: 'auto' }}>●</span>}
      </div>
      {isDir &&
        isOpen &&
        node.children.map((c, i) => (
          <TreeNode
            key={i}
            node={c}
            depth={depth + 1}
            activePath={activePath}
            onSelect={onSelect}
            expanded={expanded}
            toggleExpand={toggleExpand}
            path={full}
          />
        ))}
    </>
  )
}

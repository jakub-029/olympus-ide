export type Theme = 'thunder' | 'marble'

export type PanelId = 'files' | 'search' | 'git' | 'debug' | 'preview'

export interface TreeLeaf {
  name: string
  color?: string
  dirty?: boolean
}

export interface TreeBranch extends TreeLeaf {
  children: TreeNodeData[]
}

export type TreeNodeData = TreeLeaf | TreeBranch

export interface OpenFile {
  path: string
  name: string
  color: string
  dirty: boolean
}

export interface FileEntry {
  name: string
  color: string
  dirty: boolean
  lang: string
  lines: string[]
}

export interface PaletteItem {
  id: string
  label: string
  keys: string[]
  icon: IconName
}

export type IconName =
  | 'menu'
  | 'plus'
  | 'check'
  | 'x'
  | 'search'
  | 'file'
  | 'folder'
  | 'folder-open'
  | 'chevron-right'
  | 'chevron-down'
  | 'play'
  | 'stop'
  | 'terminal'
  | 'git'
  | 'bug'
  | 'settings'
  | 'globe'
  | 'split'
  | 'copy'
  | 'sparkles'
  | 'circle'
  | 'reload'
  | 'eye'
  | 'alert-circle'
  | 'dot'

export type CommandId =
  | 'file.new'
  | 'file.open'
  | 'file.save'
  | 'view.terminal'
  | 'view.preview'
  | 'git.commit'
  | 'theme.toggle'
  | 'run.start'

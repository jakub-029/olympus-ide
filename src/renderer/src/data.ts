import type { FileEntry, PaletteItem, TreeNodeData } from './types'

const COLOR = {
  ts: '#8AA8C7',
  code: '#C79A4B',
  config: '#7FA07F',
  html: '#C56B5C',
  md: '#9BA0AB',
  asset: '#7FA07F'
} as const

export const TREE: TreeNodeData[] = [
  {
    name: 'src',
    children: [
      {
        name: 'components',
        children: [
          { name: 'App.tsx', color: COLOR.ts, dirty: true },
          { name: 'Nav.tsx', color: COLOR.ts }
        ]
      },
      {
        name: 'core',
        children: [
          { name: 'summit.ts', color: COLOR.code, dirty: true },
          { name: 'peak.ts', color: COLOR.ts },
          { name: 'index.ts', color: COLOR.ts }
        ]
      },
      {
        name: 'utils',
        children: [
          { name: 'math.ts', color: COLOR.ts },
          { name: 'format.ts', color: COLOR.ts }
        ]
      },
      { name: 'App.tsx', color: COLOR.ts },
      { name: 'main.ts', color: COLOR.ts }
    ]
  },
  {
    name: 'public',
    children: [
      { name: 'index.html', color: COLOR.html },
      { name: 'favicon.svg', color: COLOR.asset }
    ]
  },
  { name: 'package.json', color: COLOR.config },
  { name: 'tsconfig.json', color: COLOR.config },
  { name: 'README.md', color: COLOR.md }
]

const SUMMIT_LINES: string[] = [
  `<span style="color:var(--syntax-comment)">// Olympus — summit.ts</span>`,
  `<span style="color:var(--syntax-comment)">// Core altitude primitives.</span>`,
  ``,
  `<span style="color:var(--syntax-keyword)">import</span> { <span style="color:var(--syntax-variable)">Peak</span> } <span style="color:var(--syntax-keyword)">from</span> <span style="color:var(--syntax-string)">&quot;./peak&quot;</span>;`,
  ``,
  `<span style="color:var(--syntax-keyword)">export interface</span> <span style="color:var(--syntax-type)">Summit</span> {`,
  `&nbsp;&nbsp;<span style="color:var(--syntax-variable)">name</span>: <span style="color:var(--syntax-type)">string</span>;`,
  `&nbsp;&nbsp;<span style="color:var(--syntax-variable)">altitude</span>: <span style="color:var(--syntax-type)">number</span>;`,
  `}`,
  ``,
  `<span style="color:var(--syntax-keyword)">export function</span> <span style="color:var(--syntax-function)">ascend</span>(<span style="color:var(--syntax-variable)">name</span>: <span style="color:var(--syntax-type)">string</span>, <span style="color:var(--syntax-variable)">altitude</span>: <span style="color:var(--syntax-type)">number</span> = <span style="color:var(--syntax-number)">2917</span>): <span style="color:var(--syntax-type)">Peak</span> {`,
  `&nbsp;&nbsp;<span style="color:var(--syntax-keyword)">if</span> (altitude &lt; <span style="color:var(--syntax-number)">0</span>) {`,
  `&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--syntax-keyword)">throw new</span> <span style="color:var(--syntax-function)">Error</span>(<span style="color:var(--syntax-string)">\`\${name}: below sea level\`</span>);`,
  `&nbsp;&nbsp;}`,
  `&nbsp;&nbsp;<span style="color:var(--syntax-keyword)">return new</span> <span style="color:var(--syntax-type)">Peak</span>({ <span style="color:var(--syntax-variable)">name</span>, <span style="color:var(--syntax-variable)">altitude</span> });`,
  `}`,
  ``,
  `<span style="color:var(--syntax-keyword)">export const</span> <span style="color:var(--syntax-variable)">OLYMPUS</span> = <span style="color:var(--syntax-function)">ascend</span>(<span style="color:var(--syntax-string)">&quot;Mytikas&quot;</span>, <span style="color:var(--syntax-number)">2917</span>);`
]

const README_LINES: string[] = [
  `<span style="color:var(--syntax-keyword)"># Olympus Core</span>`,
  ``,
  `<span style="color:var(--fg-1)">A small library for mountain metadata.</span>`,
  ``,
  `<span style="color:var(--syntax-keyword)">## Install</span>`,
  ``,
  `<span style="color:var(--syntax-string)">\`\`\`</span>`,
  `<span style="color:var(--fg-1)">npm install olympus-core</span>`,
  `<span style="color:var(--syntax-string)">\`\`\`</span>`
]

export const FILE_CONTENT: Record<string, FileEntry> = {
  '/src/core/summit.ts': { lines: SUMMIT_LINES, name: 'summit.ts', color: COLOR.code, dirty: true, lang: 'TypeScript' },
  '/README.md': { lines: README_LINES, name: 'README.md', color: COLOR.md, dirty: false, lang: 'Markdown' }
}

export const DEFAULT_COLOR = COLOR.ts

export const PALETTE_ITEMS: PaletteItem[] = [
  { id: 'file.new', label: 'File: New file', keys: ['⌘', 'N'], icon: 'plus' },
  { id: 'file.open', label: 'File: Open folder…', keys: ['⌘', 'O'], icon: 'folder' },
  { id: 'file.save', label: 'File: Save', keys: ['⌘', 'S'], icon: 'file' },
  { id: 'view.terminal', label: 'View: Toggle terminal', keys: ['⌃', '`'], icon: 'terminal' },
  { id: 'view.preview', label: 'View: Toggle browser preview', keys: [], icon: 'globe' },
  { id: 'git.commit', label: 'Git: Commit', keys: [], icon: 'git' },
  { id: 'theme.toggle', label: 'Theme: Toggle Thunder / Marble', keys: [], icon: 'sparkles' },
  { id: 'run.start', label: 'Run: Start', keys: ['F5'], icon: 'play' }
]

/// <reference types="vite/client" />

declare module '*.svg' {
  const src: string
  export default src
}

interface TerminalApi {
  spawn: (opts?: {
    shell?: string
    cwd?: string
    cols?: number
    rows?: number
    env?: Record<string, string>
  }) => Promise<{ id: string }>
  write: (id: string, data: string) => void
  resize: (id: string, cols: number, rows: number) => void
  kill: (id: string) => void
  onData: (id: string, cb: (data: string) => void) => () => void
  onExit: (id: string, cb: (payload: { exitCode: number; signal: number | null }) => void) => () => void
}

interface Window {
  olympus: {
    platform: NodeJS.Platform
    version: string
    terminal: TerminalApi
  }
}

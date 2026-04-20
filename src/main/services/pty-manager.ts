import { spawn, type IPty } from 'node-pty'
import { homedir } from 'node:os'
import type { WebContents } from 'electron'

export interface SpawnOptions {
  shell?: string
  cwd?: string
  cols?: number
  rows?: number
  env?: Record<string, string>
}

interface Session {
  id: string
  pty: IPty
  webContents: WebContents
}

const sessions = new Map<string, Session>()
let nextId = 0

function defaultShell(): string {
  if (process.platform === 'win32') return 'powershell.exe'
  return process.env.SHELL ?? '/bin/zsh'
}

export function spawnPty(webContents: WebContents, opts: SpawnOptions = {}): { id: string } {
  const id = `pty-${++nextId}`
  const shell = opts.shell ?? defaultShell()
  const pty = spawn(shell, [], {
    name: 'xterm-256color',
    cols: opts.cols ?? 80,
    rows: opts.rows ?? 24,
    cwd: opts.cwd ?? homedir(),
    env: { ...(process.env as Record<string, string>), ...(opts.env ?? {}), TERM: 'xterm-256color' }
  })

  const session: Session = { id, pty, webContents }
  sessions.set(id, session)

  pty.onData((data) => {
    if (!webContents.isDestroyed()) webContents.send(`terminal:data:${id}`, data)
  })

  pty.onExit(({ exitCode, signal }) => {
    if (!webContents.isDestroyed()) {
      webContents.send(`terminal:exit:${id}`, { exitCode, signal: signal ?? null })
    }
    sessions.delete(id)
  })

  webContents.once('destroyed', () => killPty(id))

  return { id }
}

export function writePty(id: string, data: string): void {
  sessions.get(id)?.pty.write(data)
}

export function resizePty(id: string, cols: number, rows: number): void {
  const s = sessions.get(id)
  if (!s) return
  if (cols > 0 && rows > 0) s.pty.resize(cols, rows)
}

export function killPty(id: string): void {
  const s = sessions.get(id)
  if (!s) return
  try {
    s.pty.kill()
  } catch {
    /* already gone */
  }
  sessions.delete(id)
}

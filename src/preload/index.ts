import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron'

export interface SpawnOptions {
  shell?: string
  cwd?: string
  cols?: number
  rows?: number
  env?: Record<string, string>
}

export interface ExitPayload {
  exitCode: number
  signal: number | null
}

const terminal = {
  spawn: (opts: SpawnOptions = {}): Promise<{ id: string }> => ipcRenderer.invoke('terminal:spawn', opts),
  write: (id: string, data: string): void => ipcRenderer.send('terminal:write', id, data),
  resize: (id: string, cols: number, rows: number): void =>
    ipcRenderer.send('terminal:resize', id, cols, rows),
  kill: (id: string): void => ipcRenderer.send('terminal:kill', id),
  onData: (id: string, cb: (data: string) => void): (() => void) => {
    const ch = `terminal:data:${id}`
    const handler = (_e: IpcRendererEvent, data: string) => cb(data)
    ipcRenderer.on(ch, handler)
    return () => ipcRenderer.off(ch, handler)
  },
  onExit: (id: string, cb: (payload: ExitPayload) => void): (() => void) => {
    const ch = `terminal:exit:${id}`
    const handler = (_e: IpcRendererEvent, payload: ExitPayload) => cb(payload)
    ipcRenderer.on(ch, handler)
    return () => ipcRenderer.off(ch, handler)
  }
}

contextBridge.exposeInMainWorld('olympus', {
  platform: process.platform,
  version: process.versions.electron,
  terminal
})

export type OlympusApi = {
  platform: NodeJS.Platform
  version: string
  terminal: typeof terminal
}

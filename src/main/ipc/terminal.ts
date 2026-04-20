import { ipcMain } from 'electron'
import { killPty, resizePty, spawnPty, writePty, type SpawnOptions } from '../services/pty-manager'

export function registerTerminalIpc(): void {
  ipcMain.handle('terminal:spawn', (event, opts: SpawnOptions = {}) => {
    return spawnPty(event.sender, opts)
  })

  ipcMain.on('terminal:write', (_event, id: string, data: string) => {
    writePty(id, data)
  })

  ipcMain.on('terminal:resize', (_event, id: string, cols: number, rows: number) => {
    resizePty(id, cols, rows)
  })

  ipcMain.on('terminal:kill', (_event, id: string) => {
    killPty(id)
  })
}

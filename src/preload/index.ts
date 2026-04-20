import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('olympus', {
  platform: process.platform,
  version: process.versions.electron
})

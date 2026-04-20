/// <reference types="vite/client" />

declare module '*.svg' {
  const src: string
  export default src
}

interface Window {
  olympus: {
    platform: NodeJS.Platform
    version: string
  }
}

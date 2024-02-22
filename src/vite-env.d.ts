/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string
    readonly VITE_SERVER_HUB_PATH: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
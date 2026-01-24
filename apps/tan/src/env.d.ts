interface ImportMetaEnv {
  readonly VITE_HONO_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string;
    }
  }
}

export {};

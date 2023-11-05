/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_WEB_APIGW_URL: string;
  readonly VITE_GRAPHQL_URL: string;
  readonly VITE_IDENTITY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

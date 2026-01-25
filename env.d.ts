/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module '*.yaml' {
  const content: Record<string, any>
  export default content
}

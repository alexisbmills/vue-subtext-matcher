export interface MatchResult {
  indices: number[]
  count: number
}

export interface FormData {
  text: string
  subtext: string
}

export interface ValidationErrors {
  text?: string
  subtext?: string
}

export interface RouteMetadata {
  showHelpButton?: boolean
}

declare module 'vue-router' {
  interface RouteMeta extends RouteMetadata {}
}
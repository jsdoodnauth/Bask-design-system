declare module "jsvectormap" {
  export interface VectorMapMarker {
    name?: string
    coords: [number, number]
    style?: Record<string, unknown>
  }

  export interface VectorMapSeries {
    regions?: Array<{
      attribute?: string
      values: Record<string, number>
      scale?: string[]
      normalizeFunction?: "linear" | "polynomial"
      legend?: Record<string, unknown>
    }>
    markers?: Array<{
      attribute?: string
      values: Record<number, number>
      scale?: string[]
      normalizeFunction?: "linear" | "polynomial"
    }>
  }

  export interface VectorMapOptions {
    selector: HTMLElement | string
    map: string
    backgroundColor?: string
    zoomOnScroll?: boolean
    zoomButtons?: boolean
    showTooltip?: boolean
    draggable?: boolean
    regionStyle?: {
      initial?: Record<string, string | number>
      hover?: Record<string, string | number>
      selected?: Record<string, string | number>
      selectedHover?: Record<string, string | number>
    }
    markerStyle?: {
      initial?: Record<string, string | number>
      hover?: Record<string, string | number>
      selected?: Record<string, string | number>
    }
    markers?: VectorMapMarker[]
    markersSelectable?: boolean
    series?: VectorMapSeries
    labels?: Record<string, unknown>
    onRegionTooltipShow?: (event: Event, tooltip: { text: (s: string) => void }, code: string) => void
    onMarkerTooltipShow?: (event: Event, tooltip: { text: (s: string) => void }, index: number) => void
    onRegionClick?: (event: Event, code: string) => void
    onMarkerClick?: (event: Event, index: number) => void
  }

  export default class VectorMap {
    constructor(options: VectorMapOptions)
    destroy(): void
    setBackgroundColor(color: string): void
    reset(): void
    updateSize(): void
    setSelectedRegions(codes: string[] | Record<string, boolean>): void
    setSelectedMarkers(indices: number[] | Record<number, boolean>): void
    series: VectorMapSeries
  }
}

declare module "jsvectormap/dist/maps/world-merc" {
  const _: void
  export default _
}

declare module "jsvectormap/dist/maps/world" {
  const _: void
  export default _
}

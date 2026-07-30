import type { ZodType } from "zod"

// --- colors.js ---
export declare const modes: Record<
  string,
  { text: string; bg: string; empty: string }
>

export declare const colorCombos: Record<
  string,
  {
    light: string
    dark: string
    highlight: { light: string; dark: string }
  }
>

// --- svg-builder.js ---
export interface BuildSvgOptions {
  mode: string
  dotColor: string
  dotCount: number
  highlighted: number
  dotSize: number
  text: string
  position: "top" | "middle" | "bottom"
  gridPosition: "top" | "middle" | "bottom"
}

export declare function buildSvg(options: BuildSvgOptions): string

// --- date-calculator.js ---
export declare function getDotCounts(
  startDate: string | Date,
  endDate: string | Date
): { dotCount: number; highlightedDotCount: number }

// --- schema.js ---
export interface GoalConfig {
  mode: string
  dotColor: string
  dotSize: number
  startDate: Date
  endDate: Date
  text: string
  position: "top" | "middle" | "bottom"
  gridPosition: "top" | "middle" | "bottom"
}

export declare const goalQuerySchema: ZodType<GoalConfig>

import type { ZodType } from "zod"

// --- constants.js ---
export declare const DOT_SIZE: { min: number; max: number; default: number }

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
  gridPosition: "top" | "middle" | "bottom"
  layout?: 1 | 2
}

export declare function buildSvg(options: BuildSvgOptions): string

// --- date-calculator.js ---
export declare function getDotCounts(
  startDate: string | Date | null,
  endDate: string | Date | null,
): { dotCount: number; highlightedDotCount: number }

// --- schema.js ---
export interface GoalConfig {
  mode: string
  dotColor: string
  dotSize: number
  startDate: Date
  endDate: Date
  text: string
  gridPosition: "top" | "middle" | "bottom"
  layout?: 1 | 2
}

export declare const goalQuerySchema: ZodType<GoalConfig>

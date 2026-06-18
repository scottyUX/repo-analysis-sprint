import type { AstMetrics } from "./repo-analysis.types";

const AST_METRICS_FIELDS = [
  "cyclomaticComplexity",
  "maxNestingDepth",
  "functionCount",
  "classCount",
  "duplicatedBlockCount",
] as const satisfies readonly (keyof AstMetrics)[];

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function parseAstMetrics(raw: unknown): AstMetrics {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("astMetrics must be a non-null object");
  }

  const candidate = raw as Record<keyof AstMetrics, unknown>;
  const parsed = {} as AstMetrics;

  for (const field of AST_METRICS_FIELDS) {
    const value = candidate[field];
    if (!isFiniteNumber(value)) {
      throw new Error(`astMetrics.${field} must be a finite number`);
    }
    parsed[field] = value;
  }

  return parsed;
}

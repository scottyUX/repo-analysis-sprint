import { mockRepositoryDetails } from "./repo-analysis.mock";
import { parseAstMetrics } from "./repo-analysis.parse";
import type { RepositoryAnalysisDetails, RiskLevel } from "./repo-analysis.types";

interface FetchRepoDetailsOptions {
  shouldFail?: boolean;
  delayMs?: number;
}

export function fetchRepoDetails({
  shouldFail = false,
  delayMs = 650,
}: FetchRepoDetailsOptions = {}): Promise<RepositoryAnalysisDetails> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Simulated network failure"));
        return;
      }

      resolve({
        ...mockRepositoryDetails,
        astMetrics: parseAstMetrics(mockRepositoryDetails.astMetrics),
      });
    }, delayMs);
  });
}

export function calculateRiskLevel(
  cyclomaticComplexity: number,
  maxNestingDepth: number,
): RiskLevel {
  if (cyclomaticComplexity > 10 || maxNestingDepth > 4) {
    return "High";
  }
  if (cyclomaticComplexity > 5 || maxNestingDepth > 2) {
    return "Medium";
  }
  return "Low";
}

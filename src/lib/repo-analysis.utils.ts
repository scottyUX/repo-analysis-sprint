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
  // TODO Intern 3: replace this placeholder with threshold-based risk logic.
  void cyclomaticComplexity;
  void maxNestingDepth;

  return "Low";
}

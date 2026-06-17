import type { RepositoryAnalysisDetails } from "./repo-analysis.types";

export const mockRepositoryDetails: RepositoryAnalysisDetails = {
  repositoryName: "metrics-service",
  owner: "Repo Metrics Guild",
  primaryLanguage: "TypeScript",
  lastAnalyzedAt: "2026-06-17T16:00:00.000Z",
  astMetrics: {
    cyclomaticComplexity: 12,
    maxNestingDepth: 4,
    functionCount: 38,
    classCount: 5,
    duplicatedBlockCount: 7,
  },
  aiSmells: [
    "High churn module lacks tests",
    "Nested conditional can be simplified",
    "Duplicate validation logic detected",
  ],
};

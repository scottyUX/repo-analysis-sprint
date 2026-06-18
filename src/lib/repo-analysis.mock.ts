import type { AiSmell, AstMetrics, RepositoryAnalysisDetails } from "./repo-analysis.types";

const mockAstMetrics = {
  cyclomaticComplexity: 12,
  maxNestingDepth: 4,
  functionCount: 38,
  classCount: 5,
  duplicatedBlockCount: 7,
} satisfies AstMetrics;

const mockAiSmells = [
  "High churn module lacks tests",
  "Nested conditional can be simplified",
  "Duplicate validation logic detected",
] satisfies AiSmell[];

export const mockRepositoryDetails = {
  repositoryName: "metrics-service",
  owner: "Repo Metrics Guild",
  primaryLanguage: "TypeScript",
  lastAnalyzedAt: "2026-06-17T16:00:00.000Z",
  astMetrics: mockAstMetrics,
  aiSmells: mockAiSmells,
} satisfies RepositoryAnalysisDetails;

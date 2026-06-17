export type RiskLevel = "Low" | "Medium" | "High";

export interface RepositoryAnalysisDetails {
  repositoryName: string;
  owner: string;
  primaryLanguage: string;
  lastAnalyzedAt: string;
  astMetrics: Record<string, number>;
  aiSmells: string[];
}

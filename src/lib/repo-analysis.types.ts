export type RiskLevel = "Low" | "Medium" | "High";

export interface AstMetrics {
  cyclomaticComplexity: number;
  maxNestingDepth: number;
  functionCount: number;
  classCount: number;
  duplicatedBlockCount: number;
}

// TODO: expand when API supports structured smells
export type AiSmell = string;

export interface RepositoryAnalysisDetails {
  repositoryName: string;
  owner: string;
  primaryLanguage: string;
  lastAnalyzedAt: string;
  astMetrics: AstMetrics;
  aiSmells: AiSmell[];
}

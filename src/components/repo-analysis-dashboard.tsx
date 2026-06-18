"use client";

import { useState, type CSSProperties, type ReactNode } from "react";import type {
  AiSmell,
  RepositoryAnalysisDetails,
  RiskLevel,
} from "@/lib/repo-analysis.types";
import {
  calculateRiskLevel,
  fetchRepoDetails,
} from "@/lib/repo-analysis.utils";

/**
 * Maps a computed risk level to tile-only CSS classes for color-coded status styling.
 */
function getRiskLevelTileClassName(riskLevel: RiskLevel): string {
  const classByLevel: Record<RiskLevel, string> = {
    Low: "risk-level-tile risk-level-low",
    Medium: "risk-level-tile risk-level-medium",
    High: "risk-level-tile risk-level-high",
  };

  return classByLevel[riskLevel];
}

/**
 * Produces a stable React list key for an AI smell badge.
 * Index is included so duplicate smell labels do not collide.
 */
function getAiSmellBadgeKey(smell: string, index: number): string {
  return `ai-smell-${index}-${smell}`;
}

/**
 * Renders AI smell strings as red warning badges for the analysis card.
 * When the list is empty, shows a muted fallback message so the panel stays cohesive.
 */
function renderAiSmellBadges(smells: AiSmell[]): ReactNode {
  if (smells.length === 0) {
    return <p className="empty-state">No AI smells detected.</p>;
  }

  return smells.map((smell, index) => (
    <span
      key={getAiSmellBadgeKey(smell, index)}
      className="warning-badge"
    >
      {smell}
    </span>
  ));
}

/** Primary blue emphasis for risk-driver metric tiles (Complexity, Nesting Depth). */
const primaryMetricTileStyle: CSSProperties = {
  border: "1px solid var(--primary)",
  background: "#eef2ff",
};

const primaryMetricLabelStyle: CSSProperties = {
  color: "var(--primary)",
  fontWeight: 700,
};

const primaryMetricValueStyle: CSSProperties = {
  fontSize: "1.35rem",
  fontWeight: 800,
};

export function RepoAnalysisDashboard() {
  const [repoDetails, setRepoDetails] =
    useState<RepositoryAnalysisDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [simulateFailure, setSimulateFailure] = useState(false);

  async function handleFetchDetails() {
    setIsLoading(true);
    setErrorMessage(null);
    setRepoDetails(null);

    try {
      const details = await fetchRepoDetails({ shouldFail: simulateFailure });
      setRepoDetails(details);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Simulated network failure",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const riskLevel = repoDetails
    ? calculateRiskLevel(
        repoDetails.astMetrics.cyclomaticComplexity,
        repoDetails.astMetrics.maxNestingDepth,
      )
    : null;

  return (
    <main className="dashboard-shell">
      <section className="hero-panel">
        <p className="eyebrow">Agile Mini-Sprint</p>
        <h1>Repository Analysis Card</h1>
        <p>
          Use Cursor to plan, implement, verify, review, and PR one focused
          slice of this repository metrics feature.
        </p>
      </section>

      <section className="analysis-card" aria-live="polite">
        <div className="card-header">
          <div>
            <p className="eyebrow">Repo Metrics</p>
            <h2>{repoDetails?.repositoryName ?? "Awaiting analysis"}</h2>
          </div>
          <div className="fetch-controls">
            <label className="simulate-failure-toggle">
              <input
                checked={simulateFailure}
                disabled={isLoading}
                onChange={(event) => setSimulateFailure(event.target.checked)}
                type="checkbox"
              />
              Simulate connection failure
            </label>
            <button disabled={isLoading} onClick={handleFetchDetails}>
              {isLoading ? "Analyzing..." : "Fetch Repo Details"}
            </button>
          </div>
        </div>

        {errorMessage ? (
          <div className="warning-card" role="alert">
            <strong>Connection Failed</strong>
            <span>{errorMessage}</span>
          </div>
        ) : null}

        {repoDetails ? (
          <div className="metrics-grid">
            <div>
              <span className="metric-label">Owner</span>
              <strong>{repoDetails.owner}</strong>
            </div>
            <div>
              <span className="metric-label">Language</span>
              <strong>{repoDetails.primaryLanguage}</strong>
            </div>
            <div
              style={primaryMetricTileStyle}
              aria-label={`Complexity: ${repoDetails.astMetrics.cyclomaticComplexity}`}
            >
              <span className="metric-label" style={primaryMetricLabelStyle}>
                Complexity
              </span>
              <strong style={primaryMetricValueStyle}>
                {repoDetails.astMetrics.cyclomaticComplexity}
              </strong>
            </div>
            <div
              style={primaryMetricTileStyle}
              aria-label={`Nesting Depth: ${repoDetails.astMetrics.maxNestingDepth}`}
            >
              <span className="metric-label" style={primaryMetricLabelStyle}>
                Nesting Depth
              </span>
              <strong style={primaryMetricValueStyle}>
                {repoDetails.astMetrics.maxNestingDepth}
              </strong>
            </div>
            <div className={getRiskLevelTileClassName(riskLevel)}>
              <span className="metric-label">Risk Level</span>
              <strong className="risk-level-value">{riskLevel}</strong>
            </div>
          </div>
        ) : isLoading ? (
          <p className="empty-state">Loading metrics...</p>
        ) : (
          <p className="empty-state">
            Click the button to load nested mock repository metrics.
          </p>
        )}

        {repoDetails ? (
          <div className="smells-panel">
            <h3>AI Smells</h3>
            <div className="badge-row">
              {renderAiSmellBadges(repoDetails.aiSmells)}
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}

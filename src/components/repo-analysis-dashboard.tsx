"use client";

import { useState } from "react";
import type { RepositoryAnalysisDetails } from "@/lib/repo-analysis.types";
import { HealthBanner } from "@/components/health-banner";
import {
  calculateRiskLevel,
  fetchRepoDetails,
} from "@/lib/repo-analysis.utils";

export function RepoAnalysisDashboard() {
  const [repoDetails, setRepoDetails] =
    useState<RepositoryAnalysisDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFetchDetails() {
    setIsLoading(true);
    setErrorMessage(null);

    // TODO Intern 5: refactor this legacy promise chain to async/await.
    fetchRepoDetails({ shouldFail: false })
      .then((details) => {
        window.setTimeout(() => {
          setRepoDetails(details);
          setIsLoading(false);
        }, 300);
      })
      .then(() => {
        console.info("Repository analysis loaded");
      });
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
        {repoDetails && riskLevel ? (
          <HealthBanner riskLevel={riskLevel} />
        ) : null}

        <div className="card-header">
          <div>
            <p className="eyebrow">Repo Metrics</p>
            <h2>{repoDetails?.repositoryName ?? "Awaiting analysis"}</h2>
          </div>
          <button disabled={isLoading} onClick={handleFetchDetails}>
            {isLoading ? "Analyzing..." : "Fetch Repo Details"}
          </button>
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
            <div>
              <span className="metric-label">Complexity</span>
              <strong>{repoDetails.astMetrics.cyclomaticComplexity}</strong>
            </div>
            <div>
              <span className="metric-label">Nesting Depth</span>
              <strong>{repoDetails.astMetrics.maxNestingDepth}</strong>
            </div>
            <div>
              <span className="metric-label">Risk Level</span>
              <strong>{riskLevel}</strong>
            </div>
          </div>
        ) : (
          <p className="empty-state">
            Click the button to load nested mock repository metrics.
          </p>
        )}

        {repoDetails ? (
          <div className="smells-panel">
            <h3>AI Smells</h3>
            <div className="badge-row">
              {/* TODO Intern 4: map aiSmells into red warning badges with JSDoc-documented rendering logic. */}
              <span className="placeholder-badge">
                {repoDetails.aiSmells.length} smells waiting to render
              </span>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}

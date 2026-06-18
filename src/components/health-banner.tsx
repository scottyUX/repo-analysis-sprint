import type { RiskLevel } from "@/lib/repo-analysis.types";

interface HealthBannerProps {
  riskLevel: RiskLevel;
}

const HEALTH_MESSAGES: Record<
  RiskLevel,
  { title: string; message: string; className: string }
> = {
  Low: {
    title: "Repository Health: Good",
    message: "This repository is in good shape with no major risk indicators.",
    className: "health-banner health-banner--low",
  },
  Medium: {
    title: "Repository Health: Needs Attention",
    message: "Some metrics suggest this repository may need review soon.",
    className: "health-banner health-banner--medium",
  },
  High: {
    title: "Repository Health: Warning",
    message: "Critical risk indicators detected. Prioritize remediation.",
    className: "health-banner health-banner--high",
  },
};

export function HealthBanner({ riskLevel }: HealthBannerProps) {
  const { title, message, className } = HEALTH_MESSAGES[riskLevel];

  return (
    <div className={className} role="status">
      <div className="health-banner__header">
        <strong>{title}</strong>
        <span className="health-banner__severity">{riskLevel}</span>
      </div>
      <span>{message}</span>
    </div>
  );
}

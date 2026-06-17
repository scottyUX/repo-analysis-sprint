import { describe, expect, it } from "vitest";
import { calculateRiskLevel } from "./repo-analysis.utils";

describe("calculateRiskLevel", () => {
  it("starts with a low-risk placeholder", () => {
    expect(calculateRiskLevel(1, 1)).toBe("Low");
  });

  it.todo("returns Medium for moderate complexity or nesting");
  it.todo("returns High for severe complexity or nesting");
});

import { describe, expect, it } from "vitest";
import { calculateRiskLevel } from "./repo-analysis.utils";

describe("calculateRiskLevel", () => {
  it("starts with a low-risk placeholder", () => {
    expect(calculateRiskLevel(1, 1)).toBe("Low");
  });

  it("returns Medium for moderate complexity or nesting", () => {
    expect(calculateRiskLevel(6, 1)).toBe("Medium");
    expect(calculateRiskLevel(1, 3)).toBe("Medium");
    expect(calculateRiskLevel(10, 4)).toBe("Medium");
  });

  it("returns High for severe complexity or nesting", () => {
    expect(calculateRiskLevel(11, 1)).toBe("High");
    expect(calculateRiskLevel(1, 5)).toBe("High");
    expect(calculateRiskLevel(15, 6)).toBe("High");
  });
});

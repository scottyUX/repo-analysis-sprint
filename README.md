# Repository Analysis Sprint

This is a 30-minute Cursor workshop repo for practicing a complete agile loop:
plan, implement, verify, review, and open a pull request.

## Scenario

The dashboard needs a `RepositoryAnalysisDashboard` that can fetch nested mock
repository metrics, calculate risk, handle network failures, and render AI smell
warnings.

The app already contains a runnable starter implementation, but several pieces
are intentionally incomplete. Each intern owns one focused task and must use the
assigned Cursor rule in `.cursor/rules/`.

## Getting Started

Install dependencies and run the app:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

Run these before opening a PR:

```bash
npm run lint
npm test
```

## Student Assignments

### Intern 1: Types

Use `.cursor/rules/intern-1-types.mdc`.

Define strict TypeScript interfaces for the repository analysis data. Focus on
`src/lib/repo-analysis.types.ts`, `src/lib/repo-analysis.mock.ts`, and any call
sites that need updated types.

### Intern 2: Errors

Use `.cursor/rules/intern-2-errors.mdc`.

Make the fetch path resilient. Simulated network failures should set error state
and show the `Connection Failed` warning card instead of crashing or leaving the
UI stuck.

### Intern 3: Tests

Use `.cursor/rules/intern-3-tests.mdc`.

Implement `calculateRiskLevel()` in `src/lib/repo-analysis.utils.ts` and replace
the placeholder tests in `src/lib/repo-analysis.utils.test.ts` with coverage for
`Low`, `Medium`, and `High`.

Suggested thresholds:

```ts
if (cyclomaticComplexity >= 15 || maxNestingDepth >= 5) return "High";
if (cyclomaticComplexity >= 8 || maxNestingDepth >= 3) return "Medium";
return "Low";
```

### Intern 4: Docs and UI

Use `.cursor/rules/intern-4-docs-ui.mdc`.

Render every `aiSmells` item as a red warning badge in
`src/components/repo-analysis-dashboard.tsx`. Add professional JSDoc around any
helper that makes the rendering logic clearer.

### Intern 5: Async

Use `.cursor/rules/intern-5-async.mdc`.

Refactor the fetch button execution path in
`src/components/repo-analysis-dashboard.tsx` from the legacy `.then()` chain into
clear `async`/`await` syntax with reliable loading state behavior.

## Branch and PR Workflow

1. Assign yourself one GitHub issue.
2. Create a branch from `main`, for example `intern-3-risk-tests`.
3. Ask Cursor to plan the task before editing.
4. Implement only your assigned slice.
5. Run `npm run lint` and `npm test`.
6. Open a PR linked to your issue.
7. Review one teammate's PR.

## PR Template

Use this shape for your PR description:

```md
## Summary
- What changed?
- Which issue does this close?

## Verification
- [ ] npm run lint
- [ ] npm test
- [ ] Manual UI check, if applicable

## Risk or Question
- Note one thing reviewers should pay attention to.
```

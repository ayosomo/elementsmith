# Contributing to ElementSmith

Thank you for considering a contribution. ElementSmith values focused changes, accessible behaviour and clear reasoning over raw feature count.

## Before starting

1. Search existing issues to avoid duplicate work.
2. Open a feature request before making a large architectural change.
3. Keep each pull request focused on one problem.
4. Review the [project plan](./PROJECT_PLAN.md) and [architecture](./docs/ARCHITECTURE.md).

## Local setup

```bash
git clone https://github.com/ayosomo/elementsmith.git
cd elementsmith
pnpm install --frozen-lockfile
pnpm run dev
```

## Development standards

- Use semantic HTML before adding ARIA.
- Preserve visible focus and complete keyboard operation.
- Keep component APIs small, consistent and attribute-driven.
- Use CSS custom properties for shared visual decisions.
- Avoid framework dependencies unless an architectural proposal justifies them.
- Add or update tests when behaviour changes.
- Update documentation when a public API or interaction contract changes.

## Quality gate

Run the complete check before committing:

```bash
pnpm run quality
```

This command runs static analysis, automated tests and the production build. Pull requests must also pass the GitHub Actions workflow.

## Commit guidance

Use an imperative, outcome-focused subject:

```text
Add keyboard wrapping to dropdown options
Document button loading-state contract
Fix focus restoration after modal dismissal
```

## Pull requests

A good pull request:

- explains the user or engineering problem;
- describes the chosen approach and trade-offs;
- includes verification steps;
- calls out accessibility impact;
- includes screenshots only when visual comparison is useful;
- avoids unrelated formatting or refactoring.

## Reporting conduct or security concerns

Follow the [Code of Conduct](./CODE_OF_CONDUCT.md). Report vulnerabilities using [SECURITY.md](./SECURITY.md), not a public issue.

# Rules for AI coding agents

This file is read by Claude Code (and similar agents) before every task.
It is the design system's contract in plain language: if an agent follows it,
its output looks and behaves like the rest of the product.

## Product

Job Tracker — a dashboard for tracking vacancies: fit score, status, blockers.
Users scan dense data quickly, so clarity beats decoration.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4. No other UI libraries without asking.

## Design system — non-negotiable

- **Tokens only.** Colors, radii and row height come from `src/styles/tokens.css`
  through Tailwind utilities (`bg-surface`, `text-muted`, `border-subtle`, `bg-accent`…).
  Never hard-code hex values or arbitrary colors in components.
- **Both themes.** Every change must work in light and dark. Check both before finishing.
- **Reuse before creating.** Use `Button`, `StatusBadge`, `FitScore`, `EmptyState`,
  `ErrorState`, `TableSkeleton` before writing new elements.
- **Density.** Table rows are `var(--row-height)` (40px). Numbers use `.tabular`.

## Every screen and component ships with all its states

Default · hover · focus · loading · empty · no results · error · long text.
If a state is missing from the spec, ask instead of skipping it.

## Accessibility

- Status is never shown by color alone — always an icon or label too.
- Every interactive element is reachable and usable with the keyboard; focus is visible.
- Inputs have labels (visible or `sr-only`). Icons are `aria-hidden` unless they carry meaning.
- Text contrast is at least 4.5:1 in both themes.

## Copy

Short, plain English. Buttons are verbs ("Add vacancy", "Try again").
Error messages say what happened and what to do next.

## Workflow

1. Read the spec in `docs/specs/` for the task, if there is one.
2. Work in a branch named `feature/<short-name>`.
3. Before finishing, run `npm run build` — it must pass with no TypeScript errors.
4. Summarise what you changed and anything you were unsure about.
   Do not claim something works if you have not run it.

## Don't

- Don't add dependencies without asking.
- Don't change tokens to make one component look right — raise it instead.
- Don't delete or rewrite demo data unless the task says so.

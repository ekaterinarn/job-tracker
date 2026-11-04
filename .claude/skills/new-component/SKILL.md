---
name: new-component
description: Use when creating a new UI component in this repo. Builds it on design tokens, with all states, accessibility and both themes.
---

# New component

Follow these steps every time you add a component to `src/components/`.

1. **Check for reuse.** Look through `src/components/`. If an existing component
   can be extended with a prop, do that instead of creating a new one.
2. **List the states first.** Before writing code, write the list of states in your reply:
   default, hover, focus, disabled, loading, empty, error, long content — keep only the ones that apply.
3. **Build on tokens.** Use only token-based Tailwind utilities
   (`bg-surface`, `text-muted`, `border-subtle`, `bg-accent`, `text-danger`…).
   No hex values, no arbitrary colors.
4. **Accessibility.**
   - Use the right element (`button` for actions, `a` for navigation, `label` for inputs).
   - Keyboard: reachable with Tab, works with Enter/Space, Esc closes overlays.
   - Never convey meaning with color alone.
5. **Type the props.** Export a typed props interface; keep props minimal and named
   after what they mean, not how they look (`status`, not `color`).
6. **Check both themes** by toggling the theme in the running app.
7. **Run `npm run build`** and fix every TypeScript error.
8. **Report back:** the states you covered, anything you skipped and why,
   and any token that seemed missing.

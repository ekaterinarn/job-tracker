# How I work with AI agents

I design, write the spec and review. The agent writes most of the code.
I stay responsible for the result: if it doesn't solve the user's problem,
it doesn't ship, no matter who typed it.

## The loop

```
Problem → Spec → Agent builds → I review → Fix or ship
   ↑                                         │
   └──────────── learnings update rules ─────┘
```

1. **Frame the problem.** Who is the user, what are they trying to do,
   how will we know it worked. One short paragraph.
2. **Write the spec** in `docs/specs/`. The spec is the main product of my work:
   states, edge cases, acceptance criteria and what *not* to do.
   A good spec gets built right the first time.
3. **Give the agent context, not just a prompt.** `CLAUDE.md` holds the
   design-system rules; skills in `.claude/skills/` hold repeatable procedures
   (for example, how to build a new component). The agent reads them on every task.
4. **Agent builds in a branch** and runs the build.
5. **I review like a user, then like a designer.**
   - Walk the scenario myself: where would I hesitate or get stuck?
   - Check every state from the spec: loading, empty, error, long text.
   - Both themes, keyboard only, contrast.
   - Read the diff: hard-coded colors, duplicated components, invented features.
6. **Fix or ship.** Small issues I fix with the agent in the same branch.
   Then a pull request, a final look, merge — Vercel deploys automatically.
7. **Update the rules.** If the agent made the same mistake twice,
   the rule goes into `CLAUDE.md`, so it doesn't happen a third time.

## Where AI helps, and where it makes things up

| Helps a lot | Needs a careful eye |
| --- | --- |
| Scaffolding components from a clear spec | Inventing data, labels or features nobody asked for |
| Covering every state once they're listed | Skipping states that aren't in the spec |
| Refactoring and renaming across files | Hard-coding colors instead of using tokens |
| Explaining unfamiliar code | Saying "done" without running the build |
| Generating realistic demo data | Accessibility: looks fine, fails with a keyboard |

## Tools

- **Claude Code** — building and refactoring in the repo, working from `CLAUDE.md` and skills.
- **Figma / Figma Make** — exploring layouts and tokens before code.
- **Claude, Gemini** — research, competitor audits, interface copy.
- **Midjourney, Nano Banana, Recraft** — visual exploration and illustrations.

## Example

The spec for the next feature, an "Add vacancy" form, is in
[`docs/specs/add-vacancy.md`](specs/add-vacancy.md). It's written to be
handed to an agent as is.

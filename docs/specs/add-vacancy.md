# Spec: Add vacancy

Status: ready for build · Owner: Ekaterina Romanova

## Problem

Today vacancies come only from demo data. To use the tracker for real,
I need to add a vacancy in under a minute, usually right after reading it on a job board.

**Success:** a new vacancy can be added with only the required fields in under 30 seconds,
and it appears in the table immediately.

## Entry point

- Primary button **"Add vacancy"** in the page header, right of the title.
- In the empty state ("No vacancies yet"), the same action as the main button.

## UI

A side panel (same pattern as the vacancy details panel), not a modal,
so the table stays visible.

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| Role | text | yes | 2–80 characters |
| Company | text | yes | 1–60 characters |
| Industry | text | no | free text |
| Format | select | yes | Remote / Hybrid / Office, default Remote |
| Location | text | no | |
| Salary | text | no | free text, e.g. "from $4,000" |
| Fit | number | yes | 0–100, integer, default 50 |
| Status | select | yes | default New |
| Source | text | no | |
| Blockers | multi-line | no | one blocker per line |
| Notes | multi-line | no | up to 500 characters, live counter |

Required fields are grouped at the top. Optional ones sit under a
"More details" toggle, collapsed by default.

## Behaviour

- **Save:** validates, adds the vacancy at the top of the list with today's date,
  closes the panel, highlights the new row for 2 seconds, and announces
  "Vacancy added" to screen readers.
- **Cancel / Esc / click outside:** if the form has changes, ask
  "Discard this vacancy?" with "Discard" and "Keep editing". If not, just close.
- **Persistence:** new vacancies are saved to `localStorage` and survive a reload.
- **Focus:** opens with focus in "Role"; on close, focus returns to "Add vacancy".

## States

| State | What the user sees |
| --- | --- |
| Pristine | Save is enabled; validation runs on submit, not on load |
| Field error | Red border + message under the field; focus moves to the first invalid field |
| Saving | Save shows a spinner and is disabled (even though saving is local, keep the state for a future API) |
| Storage unavailable | Vacancy is added for this session; inline note: "Couldn't save on this device. It will disappear after reload." |
| Long values | Role and company truncate in the table with a tooltip; full text in the panel |

## Error copy

- Role empty: "Add the role title."
- Company empty: "Add the company name."
- Fit out of range: "Fit is a number from 0 to 100."
- Notes too long: "Keep notes under 500 characters."

## Acceptance criteria

- [ ] A vacancy with only required fields can be saved with the keyboard alone.
- [ ] Each validation rule shows its own message and blocks saving.
- [ ] The new vacancy appears first, with today's date, and persists after reload.
- [ ] Discard confirmation appears only when there are unsaved changes.
- [ ] Works in light and dark themes and at 375px width.
- [ ] `npm run build` passes.

## Out of scope

Editing and deleting vacancies, importing from a link, duplicate detection.

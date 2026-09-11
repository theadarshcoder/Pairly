# Phase 6: Cleanup — Legacy Alias Removal Plan (Issue 29)

## Task: Delete all `--color-*` legacy aliases from `tokens.css`

After all components have been migrated to the new token names (`--bg`, `--surface-1`,
`--fg`, `--accent`, etc.), remove the legacy compatibility aliases from `tokens.css`.

### Pre-requisites

1. **Visual regression pass**: Manually verify every screen (presenter, audience, dashboard)
   with the legacy aliases removed. No automated visual regression exists yet.

2. **Grep audit**: Run `grep -rn "var(--color-" apps/web/src/` and ensure zero matches
   outside of `tokens.css` itself.

3. **Grep audit 2**: Run `grep -rn "var(--space-" apps/web/src/` and ensure all are
   migrated to `var(--sp-*`.

4. **Grep audit 3**: Run `grep -rn "var(--radius-" apps/web/src/` and ensure all are
   migrated to `var(--r-*`.

### Aliases to Remove

```css
/* All of these: */
--color-brand-primary
--color-brand-secondary
--color-brand-accent
--color-bg-base
--color-bg-surface
--color-bg-elevated
--color-bg-overlay
--color-text-primary
--color-text-secondary
--color-text-tertiary
--color-border-subtle
--color-border-default
--color-border-strong
--color-success
--color-warning
--color-error
--color-info
--space-*
--radius-*
--shadow-*
--transition-*
--weight-*
--text-*
--font-sans-legacy
--z-base
--z-dropdown
--z-sticky
```

### Timeline

This cleanup happens **after** all Phase 1–5 feature work is complete and tested.
It is a final pass, not a mid-build task.

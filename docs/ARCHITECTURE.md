# Architecture

## Overview

ElementSmith is a single-page component showcase built on browser-native technologies. The architecture intentionally avoids a UI framework so the project can demonstrate direct knowledge of the DOM, events, semantics, custom elements and CSS.

```text
index.html
   │
   ├── semantic documentation and component specimens
   │
   ├── src/styles.css
   │      └── tokens → layout → components → states → responsive rules
   │
   └── src/main.js
          ├── <es-button> custom element
          ├── playground state synchronisation
          ├── accessible interaction patterns
          └── theme, filtering, search and notifications
```

## Architectural principles

### Browser capabilities first

Native elements are preferred when they already provide the required semantics. The modal uses `<dialog>`, loading progress uses `<progress>`, and disclosure or navigation controls preserve native buttons and links.

### Attributes form the component API

The `<es-button>` element responds to a compact attribute contract:

```html
<es-button variant="primary" size="medium" icon>
  Create project
</es-button>
```

Observed attributes trigger a deterministic render. The playground uses the same public attributes shown in generated code, avoiding a separate demo-only implementation.

### State has one direction

Playground form controls are the source of truth:

```text
Form input → normalised state → custom-element attributes → rendered preview
                         └──────→ generated markup
```

This keeps the preview and generated example synchronised without a framework state library.

### Accessibility is part of the contract

Keyboard handling and focus behaviour sit beside click handling. Components are not considered complete when they work with a pointer but fail through a keyboard or assistive technology.

### CSS owns visual variation

JavaScript sets semantic state through attributes and classes. CSS tokens and attribute selectors own appearance, responsive layout and motion preferences.

## Design tokens

Global custom properties in `src/styles.css` define colour, surface, border and shadow values. Dark mode replaces token values at the document level, allowing component rules to remain unchanged.

## Interaction patterns

- **Tabs:** roving `tabindex`, `aria-selected`, left/right navigation
- **Dropdown:** listbox semantics, active option focus, arrow navigation and focus return
- **Modal:** native focus containment, Escape dismissal and explicit trigger restoration
- **Toast:** polite live-region announcement with timed and manual dismissal
- **Theme:** locally persisted preference with updated accessible labels

## Build and delivery

Vite compiles static assets into `dist/client`. A small Worker entry point handles static assets and single-page navigation fallback for compatible hosting environments.

GitHub Actions executes the same `pnpm run quality` command used locally, reducing differences between developer and CI verification.

## Deliberate trade-offs

- Source-level tests are fast and dependency-light but do not replace browser interaction tests.
- Light-DOM rendering keeps styling inspectable but provides less encapsulation than Shadow DOM.
- The current page demonstrates several patterns inline; future phases will extract the strongest patterns into standalone custom elements.

These trade-offs are tracked in [the project plan](../PROJECT_PLAN.md).

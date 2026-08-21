# ElementSmith Project Plan

## Project status

**Current release:** `0.1.0` — portfolio foundation  
**Project type:** Independent frontend-development portfolio project  
**Primary objective:** Demonstrate accessible component architecture using browser-native technologies

## Product vision

ElementSmith will become a small, coherent interface system where developers can inspect components, manipulate their public properties, understand their accessibility contract and copy implementation-ready markup.

The project prioritises depth over component count. A smaller collection of well-documented, reusable and keyboard-complete elements is more valuable than a large catalogue with inconsistent behaviour.

## Success criteria

- Recruiters can understand the engineering decisions within five minutes.
- Every interactive pattern has documented keyboard behaviour.
- Components expose small and predictable public APIs.
- Every change passes linting, tests and a production build.
- Layout and interaction remain usable from mobile through desktop sizes.
- The repository explains not only what was built, but why it was built that way.

## Scope

### Included

- Browser-native reusable UI elements
- Component documentation and live property controls
- Design tokens, themes, variants, sizes and states
- Keyboard, focus and screen-reader considerations
- Automated quality gates and contributor guidance

### Not currently included

- A framework adapter for React, Vue or Svelte
- A package published to npm
- Server-side persistence or authentication
- A complete production design system with dozens of components
- Support for legacy browsers without native custom-element capabilities

## Delivery phases

### Phase 1 — Foundation (`0.1.0`) ✅

- Establish the ElementSmith identity and visual system
- Build the responsive documentation shell
- Create a representative component catalogue
- Implement an interactive button playground
- Add modal, dropdown, tabs, switch and toast behaviours
- Support dark mode and reduced motion
- Add repository documentation, linting, tests and CI

### Phase 2 — Component contracts (`0.2.0`)

- Extract dropdown, tabs, switch and toast into native custom elements
- Document attributes, events, slots and accessibility expectations
- Add error, loading, empty and disabled states to each component
- Introduce a shared token reference page
- Add unit tests for attribute changes and emitted events

### Phase 3 — Verification (`0.3.0`)

- Add browser-based interaction tests
- Run automated accessibility checks in CI
- Validate keyboard journeys at mobile and desktop breakpoints
- Establish bundle-size and performance budgets
- Add visual-regression coverage for core variants

### Phase 4 — Portfolio release (`1.0.0`)

- Publish a stable hosted demonstration
- Complete component API documentation
- Add release notes and versioned examples
- Record a short architecture walkthrough
- Complete cross-browser verification

## Prioritised backlog

| Priority | Item | Intended outcome |
| --- | --- | --- |
| P0 | Extract interactive specimens into custom elements | Prove reusable component contracts |
| P0 | Add browser-level keyboard tests | Verify behaviour rather than implementation details |
| P1 | Publish hosted demonstration | Give recruiters a zero-setup evaluation path |
| P1 | Document design tokens | Make visual consistency inspectable |
| P1 | Add automated accessibility scanning | Catch regressions earlier |
| P2 | Add component API tables | Improve adoption and review speed |
| P2 | Add CSS custom-property theming API | Support controlled consumer customisation |
| P3 | Explore an npm package | Test distribution only after APIs stabilise |

## Quality gates

A change is ready to merge only when:

1. `pnpm run quality` succeeds locally.
2. New interaction behaviour includes a test or a documented manual check.
3. Keyboard and focus behaviour remain predictable.
4. Public attributes and events are documented.
5. The change works at narrow and wide layouts.
6. Generated code remains valid and copy-ready.
7. No framework dependency is introduced without an architectural decision.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Visual polish hides weak component boundaries | Review public APIs before adding variants |
| Accessibility regresses as interactions grow | Maintain a keyboard matrix and add automated checks |
| The catalogue expands faster than documentation | Require a component contract before implementation |
| Vanilla code becomes tightly coupled | Extract state and rendering behind custom-element boundaries |
| Portfolio scope becomes unfocused | Evaluate work against the success criteria and prioritised backlog |

## Definition of done

A component is complete when its purpose, anatomy, public API, states, keyboard interactions, focus behaviour, responsive behaviour and example markup are documented and verified.

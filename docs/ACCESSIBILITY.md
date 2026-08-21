# Accessibility Test Matrix

This document records the expected interaction contract for ElementSmith. It combines automated source checks with focused manual verification.

## Global checks

| Area | Expected result | Verification |
| --- | --- | --- |
| Page language | Document declares British English | Automated |
| Landmarks | Header, navigation, main, sections and footer are discoverable | Manual + automated |
| Skip link | First keyboard action reveals a link to main content | Manual |
| Focus | Interactive controls show a visible focus indicator | Manual |
| Motion | Reduced-motion preference suppresses non-essential animation | CSS review |
| Zoom | Content remains usable at 200% browser zoom | Manual |

## Keyboard interactions

### Dropdown

| Key | Expected result |
| --- | --- |
| `Enter` or `Space` | Opens the listbox from its trigger |
| `ArrowDown` | Moves focus to the next option and wraps |
| `ArrowUp` | Moves focus to the previous option and wraps |
| `Enter` | Selects the focused option and closes the listbox |
| `Escape` | Closes the listbox and restores trigger focus |

### Tabs

| Key | Expected result |
| --- | --- |
| `Tab` | Enters the tab list at the selected tab |
| `ArrowRight` | Selects and focuses the next tab |
| `ArrowLeft` | Selects and focuses the previous tab |

### Modal

| Action | Expected result |
| --- | --- |
| Open | Focus moves into the dialog |
| `Tab` / `Shift+Tab` | Focus remains within the open dialog |
| `Escape` | Dialog closes |
| Close | Focus returns to the element that opened the dialog |

### Toast

| Action | Expected result |
| --- | --- |
| Trigger notification | Status message is announced politely |
| Dismiss | Notification is removed without moving focus |

## Manual release checklist

- [ ] Complete the page using only a keyboard.
- [ ] Confirm focus is never hidden behind sticky navigation.
- [ ] Check light and dark themes at normal and high zoom.
- [ ] Check the mobile layout at 320 CSS pixels wide.
- [ ] Confirm loading and disabled states remain distinguishable without colour alone.
- [ ] Verify announcements with at least one screen reader.
- [ ] Confirm generated markup reflects every playground control.

## Known limitations

Automated accessibility scanning and browser-level interaction tests are planned for the verification phase. Until then, the manual checklist is required before a release.

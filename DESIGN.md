# Design Brief — BiggPocket DSA Loan Tracking System

## Tone & Purpose
Premium fintech platform for DSA loan tracking. Orange-driven conversion focus with blue stability accents. Professional, clean, mobile-first. Operational clarity through high contrast and intentional visual hierarchy.

## Color Palette (OKLCH)

| Token | Light | Purpose |
| --- | --- | --- |
| **Primary (Orange)** | 0.64 0.2 56 | CTAs, progress, accents, primary interactions |
| **Secondary (Blue)** | 0.53 0.17 273 | Status badges, secondary actions, metrics |
| **Success (Green)** | 0.72 0.2 142 | Completed stages, approvals, checkmarks |
| **Background** | 0.98 0.003 250 | Page base, neutral surface |
| **Card** | 1.0 0 0 | Content containers, elevated surface |
| **Foreground** | 0.13 0.02 265 | Body text, high contrast |
| **Border** | 0.91 0.005 250 | Card edges, dividers, subtle separation |
| **Destructive** | 0.55 0.22 25 | Delete, cancel, rejection states |
| **Sidebar (Navy)** | 0.08 0.05 265 | Header, primary chrome, dark anchor |

## Typography

| Role | Font | Scale | Weight |
| --- | --- | --- | --- |
| **Display** | Space Grotesk | 32px, 28px, 24px | 700 |
| **Body** | Inter | 16px, 14px, 12px | 400, 600 |
| **Mono** | System monospace | 14px | 400 |

## Structural Zones

| Zone | Treatment | Details |
| --- | --- | --- |
| **Header** | `bg-sidebar` + `text-white` | Dark navy sticky top, BiggPocket logo, 1px bottom border |
| **Main Content** | `bg-background` | Light, full height, mobile-first responsive |
| **Card Sections** | `bg-card` + `border-border` | 1px border, 8px rounded, `shadow-card` |
| **Progress Tracker** | Vertical (mobile) → Horizontal (desktop) | Green checkmarks (completed), pulsing orange (current), grey (upcoming) |
| **Stat Cards** | Orange accents on primary, blue on secondary | Dashboard tiles with orange primary metrics, blue secondary KPIs |

## Component Patterns

- **Primary Buttons**: Orange background, white text, 8px radius, hover opacity shift
- **Secondary Buttons**: Blue background, white text, 8px radius
- **Stage Badges**: Green=completed, Orange=current/active, Blue=status/review, Grey=pending
- **Form Inputs**: 8px radius, 1px border, light background, orange focus ring
- **Timeline**: Left-aligned stages, 2px connecting line, green completed, pulsing orange current
- **Stat Cards**: Large number in orange/blue, label below, card border subtle

## Motion & Transitions

- **Smooth Transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) on all interactive elements
- **Pulse (Current Stage)**: 1.5s cycle, orange glow expanding from center
- **Fade In**: 0.3s on page/modal load
- **Slide In**: 0.3s from right on notifications/toasts

## Signature Detail

Orange drives urgency and conversion; blue anchors trust and secondary hierarchy. Green reserved for completed milestones only. Pulsing orange on current stage creates visual focus without distraction. Minimal shadows and no decorative patterns maintain professional fintech aesthetic.

## Constraints

- Mobile-first responsive (sm: 640px, md: 768px, lg: 1024px)
- Light mode optimized, dark mode via class toggle if needed
- 8px base radius (`--radius: 0.5rem`) for all rounded elements
- No gradients, no decorative patterns, minimal shadows only
- BiggPocket branding: orange primary, blue secondary, navy header

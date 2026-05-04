---
name: Executive Portfolio Admin
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#684000'
  on-tertiary: '#ffffff'
  tertiary-container: '#885500'
  on-tertiary-container: '#ffd4a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin: 40px
  container-max: 1440px
---

## Brand & Style

This design system is built on a **Corporate / Modern** foundation with a heavy emphasis on **Minimalism**. The brand personality is authoritative yet understated, designed to make the portfolio owner's work the hero while providing a high-utility environment for data management.

The aesthetic prioritizes clarity and "SaaS-style" precision. It utilizes a vast amount of white space to reduce cognitive load and relies on refined proportions rather than decorative elements. The emotional response is one of calm control and professional excellence, ensuring that complex data visualizations—like project engagement metrics or traffic sources—are interpreted without visual friction.

## Colors

The palette is anchored by a deep slate (**Neutral**) which provides a sophisticated, high-contrast foundation for text and structural elements. The **Primary Indigo** acts as the main interactive driver, used for calls-to-action and primary navigation states. 

The **Secondary Emerald** is reserved for positive data trends and success states, while the **Tertiary Amber** handles warnings or pending actions. Backgrounds utilize a sequence of very light grays (`#F8FAFC`, `#F1F5F9`) to create subtle distinction between the canvas and the content containers, maintaining a clean "SaaS" look without feeling clinical.

## Typography

This design system employs a dual-font strategy. **Manrope** is used for headings to provide a modern, refined, and slightly geometric personality that feels premium. **Inter** is utilized for all body text, data points, and UI labels due to its exceptional legibility at small sizes and its systematic, utilitarian nature.

Letter spacing is tightened for headlines to maintain visual impact and opened slightly for small labels to ensure readability in data-heavy tables. Hierarchy is established primarily through weight shifts and the strategic use of the Neutral slate palette.

## Layout & Spacing

The design system utilizes a **Fixed Grid** model for the main content area, centered within the viewport, while the sidebar remains fixed to the left. The grid consists of 12 columns with a 24px gutter, ensuring that complex dashboards can be broken down into modular cards (spanning 3, 4, 6, or 12 columns).

A strict 4px baseline grid governs vertical rhythm. Plenty of white space is mandated between sections (32px to 40px) to allow the data visualizations to breathe and to prevent the interface from feeling cluttered. Content "islands" (cards) use generous internal padding (24px) to emphasize the clean, professional aesthetic.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Ambient Shadows**. The primary background is the lightest gray, while functional cards sit on a pure white surface.

Depth is signaled using extremely soft, diffused shadows with a low-opacity Neutral tint (`hex: #0F172A`, `alpha: 0.04`). These shadows are almost imperceptible but serve to lift interactive cards and modals off the page. No heavy borders are used; instead, depth is reinforced by thin, 1px borders in a very light slate (`#E2E8F0`) to define boundaries without adding visual weight.

## Shapes

The shape language is **Soft** and systematic. A base corner radius of `0.25rem` (4px) is applied to small components like checkboxes and small buttons, while `0.5rem` (8px) is the standard for larger cards and input fields. 

This subtle rounding balances the professional, "straight-edged" corporate look with a hint of modern friendliness. It avoids the playfulness of pill shapes in favor of a precision-engineered appearance suitable for an administrative tool.

## Components

- **Buttons:** Primary buttons use a solid Indigo fill with white text. Secondary buttons use a light slate ghost-style background. All buttons feature a subtle 1px inset border for a tactile, "pressed-into-the-page" look.
- **Cards:** The primary container for all dashboard data. Cards must have a white background, an 8px corner radius, and a 1px `#E2E8F0` border.
- **Inputs:** Text fields use a 1px border that shifts to Primary Indigo on focus. Labels are always positioned above the input in `label-md` Inter.
- **Data Visualization:** Charts should use a curated palette starting with Indigo and Emerald. Use soft line weights (2px) and area gradients for line charts to maintain the sophisticated SaaS look.
- **Chips/Badges:** Small, low-contrast indicators for status (e.g., "Published" in light Emerald with dark Emerald text). These should have a `rounded-lg` (8px) or pill-shape for quick recognition.
- **Navigation:** The left-hand sidebar uses a subtle dark-mode-lite aesthetic or a very light gray with "active" states indicated by a 2px Indigo vertical bar on the left edge.
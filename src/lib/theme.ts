// ═══════════════════════════════════════════════
// Tuli Artisan — Theme Color Reference
// ═══════════════════════════════════════════════
//
// All theme colors are defined as CSS custom properties in globals.css.
// Components reference them via inline styles: style={{ color: "var(--color-dark)" }}
//
// LIGHT THEME (default)
// --color-dark:            #171412     Primary text
// --color-mid:             #555248     Secondary text
// --color-light:           #A39E93     Tertiary text / labels
// --color-cream:           #FAF8F4     Page background
// --color-gold:            #B8960C     Brand accent
// --color-gold-highlight:  #D4B545     Gold emphasis
// --color-divider:         #E8E3DA     Borders / lines
// --color-bg:              #FAF8F4     Page background (alias)
// --color-bg-alt:          #F0EBE1     Alternate section background
// --color-surface:         #FFFFFF     Card / surface background
// --color-dark-bg:         #171412     Footer / dark sections
// --color-nav-bg:          rgba(250,248,244,0.92)  Navbar backdrop
// --color-text-on-dark:    #EDE8DF     Text on dark backgrounds (always light)
// --color-btn-primary-bg:  #171412     Primary button background
// --color-btn-primary-text:#FAF8F4     Primary button text
//
// DARK THEME ([data-theme="dark"])
// --color-dark:            #EDE8DF     Primary text (swaps to light)
// --color-mid:             #9B958A     Secondary text
// --color-light:           #6B665D     Tertiary text
// --color-cream:           #0C0B09     Page background (swaps to dark)
// --color-gold:            #D4B96E     Brand accent (warmer)
// --color-bg:              #0C0B09     Page background
// --color-bg-alt:          #131210     Alternate section background
// --color-surface:         #1A1815     Card / surface background
// --color-dark-bg:         #070605     Footer / dark sections
// --color-btn-primary-bg:  #EDE8DF     Primary button (swaps)
// --color-btn-primary-text:#0C0B09     Primary button text (swaps)

export const THEME_COOKIE_NAME = "tuli-theme";
export const THEME_STORAGE_KEY = "tuli-theme";
export type Theme = "light" | "dark";

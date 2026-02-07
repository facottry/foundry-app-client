system-design.md
Overview

This document describes the mobile-web (mWeb) app-like architecture for Clicktory.
Goal: deliver a native-app feel using standard web technologies, without fragmenting desktop behavior.

Design Goals

App-like navigation on mWeb

Zero dependency on long scrolling to access actions

Clear separation between:

Primary navigation

Account actions

Meta / platform information

No regression on desktop UX or SEO

Platform Scope
Platform	Behavior
Desktop Web	Existing layout, classic footer
Mobile Web (mWeb)	App-like UI, bottom nav, profile sheet
Tablet	Follows mWeb rules
High-Level Architecture
Navigation Layers
┌─────────────────────────────┐
│ Content Area (Routes)       │
├─────────────────────────────┤
│ Bottom App Navigation       │ ← mWeb only
└─────────────────────────────┘

Overlays

Profile opens as a full-height bottom sheet

Modals and sheets live above navigation

No page reloads

Routing Strategy
Core Routes
/                → Home
/search          → Search
/dashboard       → Dashboard
/profile         → (Desktop only)

mWeb Profile Behavior

/profile route is not used on mWeb

Profile opens as a client-side bottom sheet

Prevents context loss and back-button confusion

Bottom App Navigation (mWeb)
Tabs (fixed, always visible)

Home

Search

Dashboard

Profile

Rules:

Exactly 4 tabs

Icon + label mandatory

Fixed height: 56–64px

Safe-area aware (iOS)

Hidden on desktop

Profile Bottom Sheet (mWeb)
Behavior

Full-height

Slides up from bottom

Swipe-down to dismiss

Single scroll container

Keyboard-safe

Sectioning
[ Account Section ]
- Public Profile
- Share Profile
- My Products
- Saved
- Settings
- Logout

────────────

[ Platform Section ]
- Plans
- Blog
- About Clicktory
- Newsletter
- Social Icons

Footer Handling
Platform	Footer
Desktop	Visible
mWeb	Disabled

All footer intent is relocated into the Profile sheet on mWeb.

State Management
Required Global State

Auth state

User role

Profile sheet open/close

Active bottom tab

Sheet State

Controlled via global UI store

No route push on open

Back button closes sheet first

Performance Considerations

Bottom nav mounted once

Profile sheet lazy-loaded

Icons preloaded

No layout shift during nav changes

Accessibility

All tabs keyboard-focusable

Sheet has focus trap

Proper ARIA roles for navigation

Minimum touch target: 44px

Analytics Hooks (Recommended)

nav_tab_click

profile_sheet_open

profile_item_click

newsletter_cta_view

newsletter_cta_submit

Non-Goals

Native app parity

PWA installation flows

Hamburger menus

Infinite scroll dependency
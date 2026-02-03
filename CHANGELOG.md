# Changelog

## [3.2.4] - 2026-02-03
### Added
- **Canonical Identity System**: Standardized "Email as Single Source of Truth" identity logic.
- **Login Methods Support**: Added `loginMethods` to user profile to support multiple providers.
- **Feature Flags**: Added `ENABLE_GOOGLE_AUTH` (and others) controlled via `.env` and `localStorage` overrides for safe testing.
- **Global Google SDK**: Centralized Google GSI SDK loading with global window callback to fix scope issues.

### Changed
- **User Schema**: Made `password_hash` optional to support pure-SSO accounts.
- **AuthService**: Refactored `resolveUser` to automatically link identities to existing accounts by verified email.
- **AuthContext**: Removed redundant data unwrapping that caused production crashes.

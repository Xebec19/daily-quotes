# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Daily Quotes is a React Native mobile application built with Expo Router, using file-based routing. The app displays inspirational quotes with a dark, purple-themed UI. It targets iOS, Android, and Web platforms from a single codebase.

**Tech Stack:** React Native 0.81.5, Expo ~54.0, Expo Router ~6.0, TypeScript (strict mode)

## Development Commands

```bash
# Start development server
pnpm start

# Platform-specific builds
pnpm android    # Run on Android device/emulator
pnpm ios        # Run on iOS simulator/device
pnpm web        # Run in web browser

# Linting
pnpm lint       # Run ESLint
```

## Architecture

### File-Based Routing

The app uses Expo Router with file-based routing. Routes are defined by the file structure in the `app/` directory:

- `app/_layout.tsx` - Root layout (currently minimal/empty)
- `app/index.tsx` - Main/entry screen

The original Expo template code has been moved to `app-example/` for reference.

### Entry Point

- The main app entry is `app/index.tsx` which contains the complete quote display UI
- The root layout (`app/_layout.tsx`) is intentionally minimal, returning an empty fragment

### Styling Approach

All styling uses React Native's `StyleSheet` API (no CSS-in-JS libraries). The design uses:
- Dark theme with `#131022` background
- Primary accent color: `#3713ec` (purple/indigo)
- Decorative glow effects using absolute positioned views
- Material Icons from `@expo/vector-icons`

### TypeScript Configuration

- Strict mode enabled
- Path alias: `@/*` maps to the project root (e.g., `@/components/Button`)

### Expo Configuration

Key settings in `app.json`:
- New React architecture enabled (`newArchEnabled: true`)
- Experiments: typed routes and React Compiler enabled
- Orientation locked to portrait
- Deep linking scheme: `dailyquotes://`
- Static web export enabled

### Component Patterns

The app uses functional components with explicit TypeScript types for props. Icon names are typed as `keyof typeof MaterialIcons.glyphMap` for type safety.

Example:
```typescript
function IconButton({ icon }: { icon: keyof typeof MaterialIcons.glyphMap }) {
  return <View style={styles.iconButton}>
    <MaterialIcons name={icon} size={22} color="#fff" />
  </View>;
}
```

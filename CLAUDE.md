# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js React application called "realarm" - an alarm clock app that helps manage sleep cycles with configurable intervals and sounds.

## Common Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Core Structure
- **Main App**: `src/app/page.tsx` - Central state management and main application logic
- **Types**: `src/types/alarm.ts` - TypeScript interfaces for alarm states and component props
- **Hooks**: `src/hooks/use-alarm-sound.ts` - Audio management for alarm sounds
- **Components**: Modular UI components in `src/components/`
- **Utils**: Time calculation utilities in `src/utils/time.ts`

### State Management
The app uses React's built-in state management with useState hooks. Main state is centralized in the root page component:
- Alarm status flow: `setup` → `sleeping` → `alarming` → `interval` (cycles)
- Timer management with setInterval/clearInterval
- Fixed wakeup time calculation and display

### Key Features
- Sleep cycle management with configurable duration
- Interval-based alarms between sleep cycles
- Multiple alarm sounds with volume control
- Keyboard (spacebar) and click event handling to stop alarms
- Progress tracking and cycle counting

### Component Architecture
- **SetupForm**: Initial configuration (sleep time, intervals, volume, sound selection)
- **RunningDisplay**: Active alarm state display and controls
- **UI Components**: Shadcn/ui components in `src/components/ui/`

### Audio System
- Audio files stored in `public/sounds/`
- useAlarmSound hook handles audio lifecycle and playback
- Supports looping alarm sounds with configurable volume

### Development Notes
- Uses Next.js 15 with React 19
- TypeScript throughout
- Tailwind CSS for styling
- ESLint for code quality
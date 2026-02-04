# replit.md

## Overview

This is a premium one-page presentation web application showcasing an AI-enhanced online presence service. The app serves as a demo/mini-app featuring:

- A single-page vertical scroll presentation with multiple sections (Hero, Problem, Solution, How It Works)
- AI-powered live avatar video chat integration using HeyGen/LiveAvatar
- Text-based AI conversation demos
- A direct path to scheduling pilot calls

The application is designed as a presentational tool, not a SaaS platform, emphasizing simplicity, readability, and extensibility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom plugins for Replit integration
- **Styling**: TailwindCSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Routing**: Wouter (lightweight React router)
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React

**Key Design Decisions**:
- Single-page application with vertical scroll sections
- Component-based architecture with UI primitives in `client/src/components/ui/`
- Path aliases configured: `@/` for client src, `@shared/` for shared code

### Backend Architecture

- **Framework**: Express.js 5 on Node.js
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints under `/api/` prefix
- **Server Structure**: 
  - `server/index.ts` - Express app setup and middleware
  - `server/routes.ts` - Route registration
  - `server/storage.ts` - In-memory storage interface
  - `server/replit_integrations/` - Third-party service integrations

**Key Design Decisions**:
- In-memory storage by default (MemStorage class) with interface for future database swap
- HTTP server created separately for WebSocket support capability
- Development uses Vite middleware for HMR; production serves static files

### Data Storage

- **Development**: In-memory storage using Map data structures
- **Production-ready**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` using drizzle-zod for validation
- **Migrations**: Drizzle Kit with output to `./migrations`

**Current Schema**:
- `users` table with id, username, password fields
- `avatar_test_questions` table - тестовые вопросы для LiveAvatar по категориям
- `avatar_test_runs` table - результаты тестов (вопрос, ответ аватара, время ответа)
- Uses `gen_random_uuid()` for ID generation

### Avatar Testing System

Система автоматизированного тестирования LiveAvatar (Sandbox Mode):

**Страница**: `/admin/avatar-tests`

**Функции**:
- Добавление тестовых вопросов по категориям (Приветствие, О компании, Возражения и т.д.)
- Запуск одиночных тестов или прогон всех вопросов
- Sandbox Mode — бесплатно, сессии до 1 минуты
- Сбор ответов аватара и времени ответа
- Экспорт результатов в CSV

**API**: `/api/avatar-tests/...`

### Build System

- **Client Build**: Vite outputs to `dist/public`
- **Server Build**: esbuild bundles server to `dist/index.cjs`
- **Build Script**: Custom `script/build.ts` handles both builds
- **Dependency Bundling**: Allowlist of common dependencies bundled to reduce cold start times

## External Dependencies

### LiveAvatar/HeyGen Integration

Real-time AI avatar video chat service located in `server/replit_integrations/liveavatar/`:

**Environment Variables**:
- `LIVEAVATAR_API_KEY` - HeyGen API authentication
- `LIVEAVATAR_AVATAR_ID` - Default avatar identifier
- `LIVEAVATAR_VOICE_ID` - Voice configuration
- `LIVEAVATAR_CONTEXT_ID` - Default conversation context
- `LIVEAVATAR_CONTEXT_ID_SALES`, `LIVEAVATAR_CONTEXT_ID_PROJECTS`, etc. - Scenario-specific contexts

**Client Integration**:
- Uses `livekit-client` for WebRTC video/audio streaming
- `LiveAvatarChat.tsx` component handles three states: pre-call, during call, post-call

### Database

- **ORM**: Drizzle ORM v0.39
- **Database**: PostgreSQL (requires `DATABASE_URL` environment variable)
- **Session Store**: connect-pg-simple for session persistence
- **Schema Validation**: drizzle-zod integration with Zod

### Frontend Libraries

- **UI Primitives**: Full suite of Radix UI components (@radix-ui/react-*)
- **Forms**: react-hook-form with @hookform/resolvers
- **Date Handling**: date-fns
- **Carousel**: embla-carousel-react
- **Animations**: framer-motion

### Replit-Specific

- `@replit/vite-plugin-runtime-error-modal` - Error overlay in development
- `@replit/vite-plugin-cartographer` - Code mapping (dev only)
- `@replit/vite-plugin-dev-banner` - Development banner (dev only)
- Custom `vite-plugin-meta-images` - OpenGraph image URL injection
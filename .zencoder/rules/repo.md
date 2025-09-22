---
description: Repository Information Overview
alwaysApply: true
---

# Defense Solutions Web Application Information

## Summary
A modern web application for defense solutions built with React, Express, and TypeScript. The application features a client-side React frontend and a server-side Express backend, with Supabase integration for database operations.

## Structure
- `/client` - React frontend application with components, pages, and assets
- `/server` - Express backend server with API routes and database integration
- `/shared` - Shared types and database schemas using Drizzle ORM
- `/api` - API route handlers for serverless deployment

## Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: TypeScript 5.6.3
**Build System**: Vite 5.4.19
**Package Manager**: pnpm (inferred from build commands)

## Dependencies
**Main Dependencies**:
- React 18.3.1 - Frontend UI library
- Express 4.21.2 - Backend server framework
- Supabase - Backend as a service for database operations
- Drizzle ORM - Database ORM with PostgreSQL support
- TailwindCSS - Utility-first CSS framework
- Wouter - Routing library for React
- Tanstack Query - Data fetching library
- Zod - Schema validation library

**Development Dependencies**:
- Vite - Build tool and development server
- TypeScript - Static type checking
- ESBuild - JavaScript bundler
- Drizzle Kit - Database migration tools

## Build & Installation
```bash
# Install dependencies
pnpm install

# Development mode
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Database schema push
pnpm db:push
```

## Database
**Type**: PostgreSQL (via Supabase)
**ORM**: Drizzle ORM
**Schema**: Defined in `shared/schema.ts`
**Tables**:
- users - User authentication
- contact_submissions - Contact form submissions

## Deployment
**Platform**: Vercel (configured via vercel.json)
**Build Command**: `pnpm build`
**Output Directory**: `dist/public`
**Environment Variables**:
- PORT - Server port (default: 3000)
- DATABASE_URL - PostgreSQL connection string
- SUPABASE_URL - Supabase project URL
- SUPABASE_ANON_KEY - Supabase anonymous key

## Client Application
**Framework**: React with TypeScript
**Routing**: Wouter
**State Management**: React Query
**UI Components**: Custom components with Radix UI primitives
**Styling**: TailwindCSS with SCSS
**Entry Point**: `client/src/main.tsx`

## Server Application
**Framework**: Express
**API Routes**: RESTful endpoints in `/api` directory
**Database Access**: Supabase client
**Entry Point**: `server/index.ts`
**Static Serving**: Production build serves static files from `dist/public`
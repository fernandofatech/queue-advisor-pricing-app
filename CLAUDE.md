# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QueueAdvisor is a Next.js application that helps users choose between Amazon SQS and Apache Kafka (MSK) based on technical requirements, message volume, and budget. It provides real-time AWS pricing comparisons and personalized recommendations.

## Tech Stack

- **Framework**: Next.js 16.0.0 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI primitives with custom components
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Deployment**: Vercel
- **Package Manager**: pnpm (as evidenced by pnpm-lock.yaml)

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Architecture

### Application Structure

This is a Next.js App Router application with the following key directories:

- **`app/`**: Next.js App Router pages and API routes
  - `app/page.tsx`: Main landing page with comparison form
  - `app/api/compare/route.ts`: POST endpoint that processes comparison requests and returns recommendations
  - `app/docs/`, `app/faq/`, `app/how-it-works/`: Information pages
  - `app/layout.tsx`: Root layout with theme provider and analytics

- **`components/`**: React components organized by feature
  - `components/ui/`: Reusable UI primitives (buttons, cards, sliders, etc.)
  - `components/comparison-form.tsx`: Multi-step wizard form with preset configurations
  - `components/results-display.tsx`: Displays comparison results
  - `components/service-radar-chart.tsx`: Radar chart visualization
  - `components/pricing-table.tsx`: Pricing comparison table

- **`lib/`**: Utility functions and shared logic
  - `lib/aws-pricing.ts`: Static AWS pricing data and calculations
  - `lib/i18n.ts`: Internationalization (English and Portuguese)
  - `lib/utils.ts`: Utility functions (e.g., `cn()` for className merging)

- **`types/`**: TypeScript type definitions
  - `types/comparison.ts`: Core types for comparison results

### Data Flow

1. User fills out the comparison form (`components/comparison-form.tsx`)
2. Form data is sent to `/api/compare` endpoint
3. API route (`app/api/compare/route.ts`) applies decision logic based on:
   - Message volume
   - Ordering requirements
   - Replay capability needs
   - Message loss tolerance
   - Environment (AWS vs multicloud)
4. API fetches pricing data from `lib/aws-pricing.ts`
5. Results are returned with recommendation, explanation, radar chart data, and pricing
6. `components/results-display.tsx` renders the results with visualizations

### Recommendation Algorithm

The decision logic in `app/api/compare/route.ts` recommends Kafka/MSK when:

- High volume (>50M messages/month) + replay needed
- Strict ordering + replay needed
- Multicloud environment (portability)
- Low loss tolerance + very high volume (>100M messages/month)

Otherwise, it recommends SQS as the cost-effective, fully-managed option.

### Internationalization

The app supports English and Portuguese through `lib/i18n.ts`. All user-facing text uses the `useTranslation()` hook. The locale state is managed at the page level and passed down to child components.

### Styling

- Uses Tailwind CSS with custom configuration
- Modern color palette with purple-blue primary (`brand-primary`) and orange secondary (`brand-secondary`)
- Dark theme by default (`app/layout.tsx` sets `defaultTheme="dark"`)
- Component styling uses `cn()` utility from `lib/utils.ts` for conditional classes
- Gradient effects throughout the UI for modern, professional appearance

## Key Technical Details

### Pricing Data

Pricing is calculated statically in `lib/aws-pricing.ts`:

- **SQS**: $0.40 per million requests
- **MSK**: ~$460/month base cost (3 brokers) + storage costs
- Storage estimates: 1M messages ≈ 10GB, 10M ≈ 100GB, 100M ≈ 500GB

### Form Presets

The comparison form includes 4 presets (`components/comparison-form.tsx`):

1. **Microservices**: 5M messages/month, no ordering, $200 budget
2. **Event Streaming**: 50M messages/month, with ordering/replay, $1000 budget
3. **Cost Effective**: 1M messages/month, high loss tolerance, $50 budget
4. **High Throughput**: 100M messages/month, with ordering/replay, $2000 budget

### Path Aliases

TypeScript is configured with `@/*` path alias pointing to the root directory (see `tsconfig.json`).

## Important Conventions

- All components use TypeScript with explicit type annotations
- Client components use `"use client"` directive
- Form state is managed with React `useState` (no external state management)
- API routes return JSON with proper error handling
- All user-facing strings must be internationalized through `lib/i18n.ts`

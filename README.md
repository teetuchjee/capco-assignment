# Capco Assignment — Next.js App Router

This project is a modern frontend application built with **Typescript** **Next.js (App Router)**, **React**, and **Tailwind CSS**.  
It runs on **port 3000** by default and includes **Docker support** and **Cypress end-to-end testing**.

The goal of this project is to demonstrate clean architecture, good developer experience, UI performance patterns (virtualization), and production-quality tooling.

---

# 🚀 1. Setup Instructions

### ✅ Option 1: Run Locally

#### Requirements
- Node.js 18+ (or 20+)
- npm, yarn, or pnpm
```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 🐳 Option 2: Run with Docker
```bash
docker compose up --build
```

Then open:  
👉 **http://localhost:3000**

Hot reload is enabled.

---

## 🧪 Running Tests (Cypress E2E)

This project includes end-to-end tests focusing on real user flows and virtualized DOM behavior.

### Open Cypress UI (Interactive Mode)
```bash
npm run cypress:e2e
```

This opens the Cypress Test Runner where you can select and run individual E2E test files.

### Run Tests in Headless Mode

**Run all E2E tests (starts dev server automatically):**
```bash
npm run test:e2e
```

**Run all E2E tests headlessly (for CI/CD):**
```bash
npm run test:e2e:headless
```

**Run Cypress directly (requires dev server running):**
```bash
npm run cypress:run
```

### Test Structure
```
cypress/
├── e2e/              # End-to-end test files
├── fixtures/         # Test data and mock responses
└── support/          # Custom commands and configuration
```

---

## 📁 Project Structure
```
├── app/              # Next.js App Router pages
├── components/       # React components (Atomic Design)
│   ├── atoms/        # Basic building blocks (buttons, inputs, icons)
│   ├── molecules/    # Simple component groups (search bar, card)
│   ├── organisms/    # Complex components (header, grid, forms)
│   └── templates/    # Page-level layouts
├── hooks/            # Custom React hooks
├── constants/        # Shared constants and configuration values
├── interfaces/       # TypeScript interfaces and types
├── services/         # API clients and business logic layer
├── lib/              # Utilities and helpers
├── public/           # Static assets
├── cypress/          # Cypress E2E tests
│   ├── e2e/          # Test files
│   ├── fixtures/     # Test data
│   └── support/      # Custom commands
└── docker-compose.yml
```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run cypress:open` | Open Cypress Test Runner (all modes) |
| `npm run cypress:e2e` | Open Cypress E2E tests interactively |
| `npm run cypress:run` | Run all E2E tests headlessly |
| `npm run test:e2e` | Run E2E tests with dev server |
| `npm run test:e2e:headless` | Run E2E tests headlessly with dev server |

---

## 🔧 Technologies Used

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Cypress** (E2E Testing)
- **Docker**
- **TanStack Virtual** (for virtualization)
- **TanStack Query** (for fetching data)

---

## 📝 Notes

- The application uses **React Server Components** where appropriate
- **Virtualization** is implemented for performance with large lists
- E2E tests cover critical user flows and virtualized component behavior
- Hot reload works in both local and Docker development
- Tests validate data-index attributes for proper virtual scrolling

---

## 🐛 Troubleshooting

**Port 3000 already in use:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
# or on Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Cypress tests failing:**
```bash
# Make sure dev server is running first
npm run dev

# Then run tests in another terminal
npm run cypress:e2e
```

**Tests can't find elements:**
- Ensure your components have proper `data-index` or `data-testid` attributes
- Check that the application has fully loaded before assertions
- Use `cy.wait()` if needed for dynamic content

**Docker hot reload not working:**
- Make sure volumes are properly mounted in `docker-compose.yml`
- Try rebuilding: `docker compose up --build --force-recreate`

---


# 2. Trade-off Analysis: Feed Assignment

## Prioritized Features

### 1. **Core Functionality with TanStack React Query**
I prioritized implementing a robust data fetching layer using TanStack React Query as the foundation. This decision was strategic because:
- **Caching & Performance**: Built-in caching mechanisms reduce unnecessary API calls
- **State Management**: Automatic handling of loading, error, and success states
- **Developer Experience**: Simplified data synchronization and refetching logic

### 2. **Performance Optimization with TanStack Virtual**
Given the nature of infinite scrolling feeds, I immediately identified DOM node accumulation as a critical performance bottleneck. TanStack Virtual was prioritized to:
- **Prevent DOM Bloat**: Only render visible items in the viewport
- **Smooth Scrolling**: Maintain 60fps even with thousands of items
- **Memory Efficiency**: Dramatically reduce memory footprint as users scroll

### 3. **Dual Layout System (List + Grid)**
After establishing core list functionality, I explored whether the virtualization would work with multiple items per row:
- **List View**: Single item per row (traditional feed)
- **Grid View**: Multiple items per row (gallery-style)
- **Toggle Functionality**: Implemented view switcher to demonstrate both layouts working seamlessly
- **Layout Optimization**: Ensured virtualization performed well in both modes

### 4. **Rick and Morty API Integration**
I chose the Rick and Morty API (`https://rickandmortyapi.com/api`) because:
- **Personal Interest**: Genuine enthusiasm for the theme kept motivation high
- **Rich Data**: Character data provides meaningful content for testing
- **Reliable Endpoint**: Well-documented, stable API with good structure
- **Visual Appeal**: Character images make the feed more engaging

### 5. **Essential UI/UX States**
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: Graceful error messages with retry options
- **Responsive Design**: Mobile-first approach ensuring usability across devices

### 6. **End-to-End Testing with Cypress**
Prioritized Cypress testing to ensure:
- **User Flow Validation**: Critical paths work as expected
- **Regression Prevention**: Catch breaking changes early

---

## Intentionally Left Out (Time Constraints)

### 1. **Advanced Grid Layouts**
**What**: Masonry-style grid layout (Pinterest-like)

**Why Skipped**: 
- Complex virtualization implementation
- Requires dynamic height calculations
- Would need additional libraries or custom logic
- Time investment vs. value didn't align with core requirements

**Trade-off Rationale**: Standard grid already demonstrates layout flexibility; masonry would be iterative improvement rather than core functionality.

### 2. **Advanced Filtering & Search**
**What**: Client-side or server-side filtering by character status, species, gender, etc.

**Why Skipped**:
- Requires additional UI components (filter panel, chips)
- State management for filter combinations
- URL state synchronization for shareable filtered views
- Testing coverage for all filter permutations

**Trade-off Rationale**: Focused on feed performance and rendering; filtering is a feature layer that could be added without architectural changes.


### 3. **Unit Component Testing**
**What**: Comprehensive unit tests for individual components using Jest/React Testing Library

**Why Skipped**:
- E2E tests with Cypress already cover critical user flows
- Unit tests require mocking TanStack Query and Virtual
- Time-intensive to write tests for all component variations
- Setup and configuration for testing environment

**Trade-off Rationale**: Prioritized E2E testing for faster feedback on real user scenarios; unit tests provide value but E2E tests catch integration issues that unit tests might miss. Unit testing would be the next logical step for increased test coverage and faster CI/CD feedback loops.

---

## Decision Framework

My prioritization followed this hierarchy:
```
1. Core Performance (Virtualization) ← Foundation
2. Functional Completeness (List + Grid) ← Demonstrates versatility
3. User Experience (Loading/Error states) ← Production-ready feel
4. Quality Assurance (Testing) ← Confidence
```

**Key Principle**: Deliver a **performant, working, tested** feed with dual layouts over a feature-rich but potentially buggy or slow implementation.

The current implementation represents a **strategic MVP**: core features executed well rather than many features executed poorly.


# 3. Future Scope: If I Had 2 More Hours

### Immediate Priorities (2-Hour Scope)

### **Search & Filter Implementation** 
- **Search Bar**: Real-time character name search with debouncing
- **Basic Filters**: Status (Alive/Dead/Unknown) and Species dropdowns
- **URL State**: Sync filters to URL parameters for shareable links
- **Clear Filters**: Reset button to return to default view

**Why This First**: Adds immediate user value and demonstrates state management skills without major architectural changes


# 4. AI Usage

## How I Utilized AI Tools

I had a clear vision from the start due to my prior experience with TanStack React Query and familiarity with virtualization concepts. AI tools served as an **accelerator** rather than a guide, helping me implement faster and troubleshoot edge cases.

### Specific Use Cases:

**1. Quick Start & Boilerplate**
- Generated initial component structures to save setup time
- Requested TypeScript type definitions for API responses
- Got starter configurations for TanStack Query and Virtual

**2. Component Adjustments**
- Asked for layout optimization suggestions when switching between list and grid views
- Requested responsive design patterns for different breakpoints

**3. Debugging & Problem-Solving**
- **Key Example**: When grid view was fetching twice with the same `pageParams`, I consulted AI to understand the root cause

**4. Best Practice Validation**
- Verified virtualization configuration options
- Validated testing strategies with Cypress

### My Approach:
I used AI as a **technical rubber duck** and **syntax reference**, not as an architect. I knew what I wanted to build; AI helped me build it faster by handling boilerplate and explaining unexpected behaviors when they occurred.

**Time Saved**: Approximately 20-30% faster implementation by avoiding documentation deep-dives and getting instant explanations for quirky behaviors.

## 📄 License

MIT
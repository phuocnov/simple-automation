# New Feature Implementation Guide

This guide outlines the process for implementing new features in this project, ensuring adherence to our established architectural principles: Feature-Based Architecture, Clean Architecture influence, and Modular Monolith.

## 1. Feature-Based Architecture

Every new feature should reside in its own dedicated directory under `src/features/`. This promotes vertical slicing, where a feature owns all its related components.

**Feature Directory Structure Example (`src/features/your-new-feature/`):**

```
src/features/your-new-feature/
├───__tests__/             # Unit and integration tests for the feature
├───pages/                 # UI components (e.g., YourNewFeaturePage.tsx)
├───yourNewFeature.slice.ts  # Redux Toolkit slice (state, reducers, actions)
├───yourNewFeature.selector.ts # Reselect selectors for deriving state
├───yourNewFeature.queries.ts  # React Query hooks for data fetching/mutations
└───use-your-new-feature.ts  # Custom hooks specific to the feature (optional)
```

## 2. Clean Architecture Influence

The project follows a layered approach with strict dependency rules: `Domain` → `API` → `Mapper` → `Feature` → `UI`. Dependencies should always flow inwards.

### a. Domain Layer (`src/domain/`)

*   **Purpose:** Defines core business entities and types. It should be framework-agnostic and free of any implementation details.
*   **Action:** If your new feature introduces new core entities, define their types/interfaces in `src/domain/your-new-feature/your-new-feature.model.ts`.
*   **Dependencies:** Should have no external dependencies (only basic TypeScript types).

### b. API Layer (`src/shared/api/`)

*   **Purpose:** Handles communication with the backend. It defines API request/response types and functions for making HTTP calls.
*   **Action:**
    *   Define API request/response types in `src/shared/api/your-new-feature.types.ts`.
    *   Create API functions (e.g., using Axios) in `src/shared/api/your-new-feature.api.ts`.
*   **Dependencies:** Can depend on external HTTP clients (e.g., Axios) and its own types, but not directly on `Domain` or `Feature` logic.

### c. Mapper Layer (`src/shared/mappers/`)

*   **Purpose:** Bridges the gap between raw API responses and domain/feature-specific models. It transforms data.
*   **Action:** Create a mapper file `src/shared/mappers/your-new-feature.mapper.ts` to convert API response DTOs (Data Transfer Objects) into your `Domain` models (or models used by your feature).
*   **Dependencies:** Can depend on `Domain` models and `API` types.

### d. Feature Layer (`src/features/your-new-feature/`)

*   **Purpose:** Orchestrates the feature's logic, state management, and data flow. It combines elements from lower layers to serve the UI.
*   **Actions:**
    *   **`yourNewFeature.slice.ts`**: Define the Redux state, reducers, and actions for your feature.
    *   **`yourNewFeature.selector.ts`**: Create selectors to extract and transform data from the Redux store for UI consumption.
    *   **`yourNewFeature.queries.ts`**: Implement React Query hooks that:
        *   Call functions from `src/shared/api/your-new-feature.api.ts`.
        *   Use mappers from `src/shared/mappers/your-new-feature.mapper.ts` to process API responses.
        *   Dispatch actions to `yourNewFeature.slice.ts` to update the Redux store.
    *   **`use-your-new-feature.ts` (optional)**: For complex feature-specific logic that can be abstracted into a custom hook.
*   **Dependencies:** Can depend on `Domain` models, `API` functions, `Mapper` functions, and its own slice/selectors. Should NOT directly depend on other features' internals.

### e. UI Layer (`src/features/your-new-feature/pages/` and `src/shared/components/`)

*   **Purpose:** Presents data to the user and handles user interactions.
*   **Actions:**
    *   Create page-level components in `src/features/your-new-feature/pages/`.
    *   Use custom hooks from `yourNewFeature.queries.ts` and `use-your-new-feature.ts` to fetch data and interact with feature logic.
    *   Consume state via `yourNewFeature.selector.ts`.
    *   Reusable, generic UI components can go into `src/shared/components/`.
*   **Dependencies:** Depends on its own feature's hooks, selectors, and possibly shared components.

## 3. Modular Monolith

Each feature (`auth`, `user`, `your-new-feature`) should be treated as an isolated module.

*   **Principle:** A feature should not directly reach into the internal files (e.g., slice, specific hooks) of another feature.
*   **Interaction:** If features need to interact, they should do so through well-defined interfaces, shared utilities, or by dispatching actions that other features might listen to (but not directly calling their internal functions).

---

### New Feature Checklist:

1.  \[ ] Create `src/features/your-new-feature/` directory and its subdirectories (`pages/`, `__tests__/`).
2.  \[ ] (Optional) Define `src/domain/your-new-feature/your-new-feature.model.ts` for new core entities.
3.  \[ ] Define `src/shared/api/your-new-feature.types.ts` for API request/response types.
4.  \[ ] Implement `src/shared/api/your-new-feature.api.ts` for API calls.
5.  \[ ] Implement `src/shared/mappers/your-new-feature.mapper.ts` for data transformations.
6.  \[ ] Create `src/features/your-new-feature/yourNewFeature.slice.ts` for state management.
7.  \[ ] Create `src/features/your-new-feature/yourNewFeature.selector.ts` for state selection.
8.  \[ ] Implement `src/features/your-new-feature/yourNewFeature.queries.ts` for data fetching/mutations.
9.  \[ ] Implement `src/features/your-new-new-feature/pages/YourNewFeaturePage.tsx` and other UI components.
10. \[ ] Write tests in `src/features/your-new-feature/__tests__/`.
11. \[ ] Ensure all dependencies flow inwards, and features remain isolated.
12. \[ ] Integrate the new feature into the router (`src/app/router/routes.tsx`) and Redux store (`src/app/store/root.reducer.ts`).

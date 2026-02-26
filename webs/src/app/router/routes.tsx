import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { withPageBoundary } from "../../shared/error/withPageBoundary.tsx";

const LoginPage = lazy(() =>
  import('../../features/auth/pages/login-page.tsx')
)

const DashboardPage = lazy(() =>
  import('../../features/dashboard/pages/dashboard-page.tsx')
)

export const router = createBrowserRouter([
  {
    path: '/login',
    element: withPageBoundary(<LoginPage />)
  },
  {
    path: '/',
    element: <LoginPage />,
    children: [
      {
        index: true,
        element: withPageBoundary(<Navigate to="/dashboard" replace />)
      },
      {
        path: 'dashboard',
        element: withPageBoundary(<DashboardPage />)
      },
    ]
  }
])

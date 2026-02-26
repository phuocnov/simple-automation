import React from "react";
import { logError } from "./log-error";

type Props = {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

type State = {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logError(error, errorInfo)
  }
}

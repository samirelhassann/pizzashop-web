/* eslint-disable react/no-unstable-nested-components */
import { ComponentType, ReactNode } from "react";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

interface QueryErrorBoundaryProps {
  children: ReactNode;
  errorBoundaryComponent: ComponentType<FallbackProps>;
}

export default function QueryErrorBoundary({
  children,
  errorBoundaryComponent,
}: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={errorBoundaryComponent}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import OnboardingProvider from './OnboardingProvider';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <OnboardingProvider>{children}</OnboardingProvider>
    </QueryClientProvider>
  );
};

describe('OnboardingProvider', () => {
  it('renders without crashing', () => {
    render(<OnboardingProvider><div data-testid="child">Child</div></OnboardingProvider>, { wrapper: createWrapper() });
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
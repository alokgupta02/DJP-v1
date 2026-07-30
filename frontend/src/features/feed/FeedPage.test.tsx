import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import FeedPage from './FeedPage';
import { fetchIssues, fetchDiscussions, fetchPolls } from './feedApi';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/feed']}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};

describe('FeedPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<FeedPage />, { wrapper: createWrapper() });
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('shows filter tabs', () => {
    render(<FeedPage />, { wrapper: createWrapper() });
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Issues')).toBeInTheDocument();
    expect(screen.getByText('Discussions')).toBeInTheDocument();
    expect(screen.getByText('Polls')).toBeInTheDocument();
    expect(screen.getByText('Petitions')).toBeInTheDocument();
  });
});

describe('feedApi', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it('fetchIssues returns mapped data', async () => {
    const mockResponse = [{
      id: '1', title: 'Test Issue', category: 'Road', priority: 'CRITICAL',
      location: 'Ward 1', createdAt: '2024-01-01', status: 'Open',
      supportsCount: 5, commentsCount: 2, metadata: '{}'
    }];
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const result = await fetchIssues();
    expect(result).toHaveLength(1);
    expect(result[0].severity).toBe('Critical');
  });

  it('fetchDiscussions returns mapped data', async () => {
    const mockResponse = [{
      id: '1', title: 'Discussion', description: 'Desc', createdAt: '2024-01-01',
      votesCount: 10, participantCount: 5, commentsCount: 3, location: 'Ward 1',
      latitude: 1, longitude: 2, metadata: '{}'
    }];
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const result = await fetchDiscussions();
    expect(result).toHaveLength(1);
    expect(result[0].supports).toBe(10);
  });

  it('fetchPolls returns mapped data', async () => {
    const mockResponse = [{
      id: '1', question: 'Poll?', description: 'Desc', expiresAt: '2024-12-31',
      votesCount: 100, commentsCount: 10, location: 'Ward 1', govLevel: 'City',
      metadata: '{}', optionsJson: '[{"label":"Yes","pct":60,"primary":true}]'
    }];
    fetchSpy.mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const result = await fetchPolls();
    expect(result).toHaveLength(1);
    expect(result[0].votes).toBe(100);
  });
});
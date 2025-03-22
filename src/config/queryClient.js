import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
      cacheTime: 30 * 60 * 1000, // Cache is kept for 30 minutes
      refetchOnWindowFocus: false, // Disable automatic refetching when window regains focus
      retry: 1, // Only retry failed requests once
    },
  },
}); 
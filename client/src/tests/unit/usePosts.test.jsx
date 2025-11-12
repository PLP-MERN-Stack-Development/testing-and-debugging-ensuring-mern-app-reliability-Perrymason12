import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import { usePosts } from '../../hooks/usePosts';

jest.mock('axios');

describe('usePosts hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches posts on mount', async () => {
    const posts = [
      {
        _id: '1',
        title: 'Testing Hooks',
        content: 'Hooks make stateful logic reusable.',
        publishedAt: '2024-04-01T00:00:00.000Z'
      }
    ];

    axios.get.mockResolvedValue({ data: posts });

    const { result } = renderHook(() => usePosts());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.posts).toEqual(posts);
    expect(result.current.error).toBeNull();
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:5000/api/posts',
      expect.objectContaining({
        params: {
          page: 1,
          limit: 10
        }
      })
    );
  });

  it('exposes an error state when the request fails', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => usePosts());

    await waitFor(() => expect(result.current.error).toBeTruthy());
    expect(result.current.posts).toEqual([]);
  });
});


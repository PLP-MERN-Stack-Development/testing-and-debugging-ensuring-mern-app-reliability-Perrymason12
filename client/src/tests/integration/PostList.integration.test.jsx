import { render, screen, waitFor } from '@testing-library/react';
import PostList from '../../components/PostList';
import { server, rest, API_URL } from '../mswServer';

describe('PostList integration', () => {
  it('renders posts returned by the API', async () => {
    render(<PostList />);

    expect(screen.getByRole('status')).toHaveTextContent(/loading/i);

    await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());
    expect(screen.getByRole('listitem')).toHaveTextContent('Learning Testing');
  });

  it('shows an empty state when no posts are available', async () => {
    server.use(
      rest.get(`${API_URL}/posts`, (req, res, ctx) =>
        res(ctx.status(200), ctx.json([]))
      )
    );

    render(<PostList />);

    await waitFor(() =>
      expect(screen.getByText(/no posts available/i)).toBeInTheDocument()
    );
  });

  it('handles server errors gracefully', async () => {
    server.use(
      rest.get(`${API_URL}/posts`, (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<PostList />);

    await waitFor(() =>
      expect(
        screen.getByRole('alert')
      ).toHaveTextContent(/failed to load posts/i)
    );
  });
});


import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const handlers = [
  rest.get(`${API_URL}/posts`, (req, res, ctx) => {
    const category = req.url.searchParams.get('category');

    const posts = [
      {
        _id: '1',
        title: 'Learning Testing',
        content: 'Testing improves confidence.',
        category: category || 'default',
        publishedAt: '2024-01-01T00:00:00.000Z'
      }
    ];

    return res(ctx.status(200), ctx.json(posts));
  }),
  rest.post(`${API_URL}/posts`, async (req, res, ctx) => {
    const { title, content, category } = await req.json();

    if (!title || !content || !category) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Title, content and category are required' })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({
        _id: '2',
        title,
        content,
        category,
        publishedAt: new Date().toISOString()
      })
    );
  })
];

export const server = setupServer(...handlers);
export { rest };


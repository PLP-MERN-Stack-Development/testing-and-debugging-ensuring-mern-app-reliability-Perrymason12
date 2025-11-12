import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PostForm from '../../components/PostForm';

jest.mock('axios');

describe('PostForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fillForm = () => {
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Testing with Jest' }
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Content goes here' }
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: '123' }
    });
  };

  it('submits the form and resets on success', async () => {
    axios.post.mockResolvedValue({ data: {} });
    const onSuccess = jest.fn();

    render(<PostForm onSuccess={onSuccess} />);

    fillForm();
    fireEvent.submit(screen.getByRole('form', { name: /create post form/i }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    expect(screen.getByLabelText(/title/i)).toHaveValue('');
  });

  it('shows an error message on failure', async () => {
    axios.post.mockRejectedValue({ message: 'Network failed' });

    render(<PostForm />);

    fillForm();
    fireEvent.submit(screen.getByRole('form', { name: /create post form/i }));

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Network failed')
    );
  });
});


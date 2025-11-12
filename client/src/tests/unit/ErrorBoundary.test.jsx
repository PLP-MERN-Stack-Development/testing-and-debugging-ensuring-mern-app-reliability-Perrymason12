import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Boom');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>
    );

    expect(screen.getByText(/all good/i)).toBeInTheDocument();
  });

  it('catches errors and renders fallback UI', () => {
    const fallback = jest.fn(({ error, reset }) => (
      <div>
        <p role="alert">{error.message}</p>
        <button type="button" onClick={reset}>
          Try again
        </button>
      </div>
    ));

    render(
      <ErrorBoundary fallback={fallback}>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(fallback).toHaveBeenCalled();
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Boom');

    fireEvent.click(screen.getByText(/try again/i));
    expect(fallback).toHaveBeenCalledTimes(1);
  });
});


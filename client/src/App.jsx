import { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

const App = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [refreshToken, setRefreshToken] = useState(0);

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePostCreated = () => {
    setRefreshToken((token) => token + 1);
  };

  return (
    <div>
      <header>
        <h1>Quality Assurance Dashboard</h1>
      </header>

      <main>
        <section>
          <label htmlFor="category">Filter by category</label>
          <input
            id="category"
            value={categoryFilter}
            onChange={handleCategoryChange}
            placeholder="Category id"
          />
        </section>

        <ErrorBoundary>
          <PostForm onSuccess={handlePostCreated} />
          <PostList category={categoryFilter} refreshToken={refreshToken} />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default App;


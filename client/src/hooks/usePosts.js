import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const usePosts = ({
  category = '',
  page = 1,
  limit = 10,
  refreshToken = 0
} = {}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useMemo(() => {
    const query = { page, limit };
    if (category) {
      query.category = category;
    }
    return query;
  }, [category, limit, page]);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/posts`, { params });
      setPosts(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchPosts().catch(() => {
      // Swallow the error because it is already stored in state
    });
  }, [fetchPosts, refreshToken]);

  return {
    posts,
    isLoading,
    error,
    refetch: fetchPosts
  };
};

export default usePosts;


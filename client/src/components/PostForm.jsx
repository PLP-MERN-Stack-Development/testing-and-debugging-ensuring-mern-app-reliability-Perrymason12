import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from './Button';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initialState = {
  title: '',
  content: '',
  category: ''
};

const PostForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await axios.post(
        `${API_URL}/posts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN || ''}`
          }
        }
      );

      setFormData(initialState);
      if (onSuccess) {
        onSuccess();
      }
    } catch (submitError) {
      setError(submitError.response?.data?.error || submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Create post form">
      <h2>Create Post</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
      />

      <label htmlFor="category">Category</label>
      <input
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Create Post'}
      </Button>
    </form>
  );
};

PostForm.propTypes = {
  onSuccess: PropTypes.func
};

PostForm.defaultProps = {
  onSuccess: undefined
};

export default PostForm;


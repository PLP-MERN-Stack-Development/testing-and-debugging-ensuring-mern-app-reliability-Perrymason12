import PropTypes from 'prop-types';
import { usePosts } from '../hooks/usePosts';
import formatDate from '../utils/formatDate';

const PostList = ({ category, refreshToken }) => {
  const { posts, isLoading, error } = usePosts({
    category,
    refreshToken
  });

  if (isLoading) {
    return <p role="status">Loading posts...</p>;
  }

  if (error) {
    return (
      <p role="alert">
        Failed to load posts. Try again later.
      </p>
    );
  }

  if (!posts.length) {
    return <p>No posts available.</p>;
  }

  return (
    <ul aria-label="Post list">
      {posts.map((post) => (
        <li key={post._id}>
          <article>
            <h3>{post.title}</h3>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <p>{post.content}</p>
          </article>
        </li>
      ))}
    </ul>
  );
};

PostList.propTypes = {
  category: PropTypes.string,
  refreshToken: PropTypes.number
};

PostList.defaultProps = {
  category: '',
  refreshToken: 0
};

export default PostList;


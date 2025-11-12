import {
  postsReducer,
  postsActions,
  initialState,
  selectPosts,
  selectPostStatus,
  selectPostError
} from '../../store/postsSlice';

describe('posts slice', () => {
  it('returns the initial state by default', () => {
    expect(postsReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('handles fetch lifecycle actions', () => {
    const loadingState = postsReducer(initialState, postsActions.fetchStart());
    expect(selectPostStatus(loadingState)).toBe('loading');

    const posts = [{ _id: '1', title: 'Test' }];
    const successState = postsReducer(
      loadingState,
      postsActions.fetchSuccess(posts)
    );
    expect(selectPosts(successState)).toEqual(posts);
    expect(selectPostStatus(successState)).toBe('succeeded');

    const error = 'Network error';
    const failureState = postsReducer(
      successState,
      postsActions.fetchFailure(error)
    );
    expect(selectPostError(failureState)).toBe(error);
    expect(selectPostStatus(failureState)).toBe('failed');
  });

  it('adds new posts to the top of the list', () => {
    const post = { _id: '1', title: 'New post' };
    const state = postsReducer(
      initialState,
      postsActions.addPost(post)
    );
    expect(selectPosts(state)).toEqual([post]);
  });
});


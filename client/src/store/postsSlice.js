export const initialState = {
  items: [],
  status: 'idle',
  error: null
};

export const actionTypes = {
  FETCH_START: 'posts/fetchStart',
  FETCH_SUCCESS: 'posts/fetchSuccess',
  FETCH_FAILURE: 'posts/fetchFailure',
  ADD_POST: 'posts/addPost'
};

export const postsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return {
        ...state,
        status: 'loading',
        error: null
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        items: action.payload
      };
    case actionTypes.FETCH_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.payload
      };
    case actionTypes.ADD_POST:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    default:
      return state;
  }
};

export const postsActions = {
  fetchStart: () => ({ type: actionTypes.FETCH_START }),
  fetchSuccess: (posts) => ({ type: actionTypes.FETCH_SUCCESS, payload: posts }),
  fetchFailure: (error) => ({ type: actionTypes.FETCH_FAILURE, payload: error }),
  addPost: (post) => ({ type: actionTypes.ADD_POST, payload: post })
};

export const selectPosts = (state) => state.items;
export const selectPostStatus = (state) => state.status;
export const selectPostError = (state) => state.error;


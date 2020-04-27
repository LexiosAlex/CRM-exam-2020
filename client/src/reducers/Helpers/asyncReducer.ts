interface AsyncReducer {
  loaded: boolean;
  pending: boolean;
  error: boolean;
}

const initialState = {
  loaded: false,
  pending: false,
  error: false,
};

export const createAsyncStateReducer = (
  requestedAction,
  succeedAction,
  failedAction,
  resetAction = 'ASYNC_STATE/RESET'
) => (state: AsyncReducer = initialState, action): AsyncReducer => {
  switch (action.type) {
    case requestedAction: {
      return { ...state, pending: true };
    }
    case succeedAction: {
      return { ...state, loaded: true, pending: false, error: false };
    }
    case failedAction: {
      return { ...state, pending: false, error: true };
    }
    case resetAction: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

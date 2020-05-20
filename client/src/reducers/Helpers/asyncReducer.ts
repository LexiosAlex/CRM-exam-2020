import { IAsyncReducer } from '../../interfaces/state';

const initialState = {
  loaded: false,
  pending: false,
  error: '',
};

export const createAsyncStateReducer = (
  requestedAction,
  succeedAction,
  failedAction,
  resetAction = 'ASYNC_STATE/RESET'
) => (state: IAsyncReducer = initialState, { type, payload }): IAsyncReducer => {
  switch (type) {
    case requestedAction:
      return { ...state, pending: true };

    case succeedAction:
      return { ...initialState, loaded: true };

    case failedAction:
      return { ...state, pending: false, error: payload.error };

    case resetAction: {
      return initialState;
    }
    default:
      return state;
  }
};

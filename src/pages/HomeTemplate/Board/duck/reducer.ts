import { Board, BoardState, Action } from './types';
import * as ActionTypes from './constants';


const boardState: BoardState<Board> = {
  loading: false,
  data: null,
  error: null,
}

const boardReducer = (state = boardState, action: Action) => {
  switch (action.type) {
    case ActionTypes.BOARD_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.BOARD_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state }
    }
    case ActionTypes.BOARD_FAIL: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state }
    }
    default:
      return { ...state }
  }
}
export default boardReducer;
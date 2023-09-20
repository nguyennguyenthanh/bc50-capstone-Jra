import * as ActionTypes from './constants';
import api from '../../../../utils/api';
import { Action, Board, Result } from './types';


export const fetchProjectDetail = (id: any) => {
  return (dispatch: any) => {
    dispatch(actBoardRequest());
    api.get(`Project/getProjectDetail?id=${id}`)
      .then((result: Result<Board>) => {
        if (result.data.statusCode === 200) {
          dispatch(actBoardSuccess(result.data.content))
          localStorage.setItem('BoardProject', JSON.stringify(result.data.content))
        }
      })
      .catch((error: any) => {
        dispatch(actBoardFail(error));
      })
  }
}


const actBoardRequest = (): Action => ({ type: ActionTypes.BOARD_REQUEST })
const actBoardSuccess = (data: Board[]): Action => ({
  type: ActionTypes.BOARD_SUCCESS,
  payload: data
})
const actBoardFail = (error: any) => ({
  type: ActionTypes.BOARD_FAIL,
  payload: error
})
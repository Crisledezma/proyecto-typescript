import axios from 'axios';
import { ThunkDispatch } from "redux-thunk";
import { ADD_TODO, UPDATE_TODOS } from ".";
import { ITodo } from "../../models/ITodo";
import { IState } from '../../models/IState';
import { IAction } from '../../models/IAction';
import { AnyAction } from 'redux';

export const addTodo = (payload: ITodo) => ({
  type: ADD_TODO,
  payload
});

export const updateTodos = (payload: ITodo[]) => {
  return {
    type: UPDATE_TODOS,
    payload
  }
};

export const traerTodos = () => {
  return async (dispatch: ThunkDispatch<IState, null, IAction>) => {
    try {
      const responseTodos = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      dispatch(updateTodos(responseTodos.data));
    } catch (error) {
      console.log(error);
    }
  }
}
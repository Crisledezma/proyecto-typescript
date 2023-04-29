import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { traerTodos } from '../../store/actions/todo-actions';

export const ListaTodosFunciones = () => {

  const todos = useSelector((state) => state.todoReducer.todos);

  console.log(todos);

  const dispatch = useDispatch();

  const fetchTodos = React.useCallback(() => {
    dispatch(traerTodos());
  }, [dispatch]);

  React.useEffect(() => { fetchTodos(); }, [fetchTodos]);
  

  return (<div>ListaTodosFunciones</div>)
}
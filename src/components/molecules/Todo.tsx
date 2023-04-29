import React from 'react';
import { ITodo } from '../../models/ITodo';
import { useEjemploContext } from '../../contexts/Ejemplo';
import checkbox from '@mui/material/Checkbox';
import { Checkbox, Typography } from '@mui/material';

export interface TodoProps {
  todo: ITodo;
}


export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { toggleTodoCompleted } = useEjemploContext();
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleTodoCompleted(event.currentTarget.checked, todo.id);
  }
  return (
    <li className='list-none'>
      <label>
        <Checkbox onChange={handleCheck} checked={todo.completed} />
        <Typography
          component="span"
          variant='body1'
          className={`${todo.completed ? "line-through" : "line-none"}`}>
          {todo.title}
        </Typography>
      </label>
    </li>
  )
}

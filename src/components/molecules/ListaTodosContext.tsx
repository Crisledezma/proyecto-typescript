import React, { useState } from 'react'
import { useEjemploContext } from '../../contexts/Ejemplo';
import { Todo } from './Todo';
import "../../styles/listas.css";
import { Button as MuiButton, TextField } from '@mui/material';
import { Button as AntdButton } from 'antd';
import styled from '@emotion/styled';

export const ListaTodosContexts = () => {

  const { todos, loading, agregarTodo } = useEjemploContext();
  const [valor, setValor] = useState('');

  if(loading) return <p>Cargando...</p>;

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const valor = e.currentTarget.value;
      agregarTodo(e.currentTarget.value);
      console.log(valor);
      e.currentTarget.value = '';
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    setValor(event?.currentTarget.value as string);
  };

  const onClick = (e: React.MouseEvent) => {
    if (valor) {
      agregarTodo(valor);
      setValor('');
    }
  }

  return (
    <Container fondo="#eee">
      <TextField
        value={valor}
        onChange={handleChange}
        className='m-5'
        variant='standard'
        type='text'
        onKeyDown={handleEnter}
        placeholder='Nuevo To Do'
        label="Nuevo To Do"
      />
      <StyledButton
        onClick={onClick}
        className='bg-orange-600 m-5'
        variant='contained'
      >Este es un Botón MUI</StyledButton>
      <AntdButton
        onClick={onClick}
        type='dashed'
        className='bg-lime-500'
      >
        Este es un botón ANTD
      </AntdButton>
      <ul className='lista'>
        {todos.map((todo) => { 
          return <Todo key={todo.id} todo={todo} />
        })}
      </ul>
    </Container>
  )
}

const Container = styled.div<{ fondo: string }>`
  padding: 20px;
  ${(props) => props.fondo && `background-color: ${props.fondo}`}
`;

const StyledButton = styled(MuiButton)`
background-color: #acb;
color: blue;
`;
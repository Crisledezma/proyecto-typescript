import React from "react";
import { ITodo } from "../models/ITodo";
import { IUser } from "../models/IUser";
import { getTodos, saveTodo } from "../services/firebase";
import { useFirebaseAuth } from "./FirebaseAuthContext";

export interface EjemploContextProps {
  todos: ITodo[];
  users: IUser[];
  loading: boolean;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  agregarTodo: (title: string) => void;
  toggleTodoCompleted: (newValue: boolean, todoId: string) => void;
}

const EjemploContext = React.createContext<EjemploContextProps>({
  todos: [],
  users: [],
  loading: false,
  setTodos: () => {},
  setUsers: () => {},
  setLoading: () => {},
  agregarTodo: () => { },
  toggleTodoCompleted: () => {},
});

export const EjemploContextProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { authUser } = useFirebaseAuth();

  const traerTodos = React.useCallback(async () => {
    try {
      setLoading(true);
      if (!authUser) return;
      const response = await getTodos(authUser);
      setTodos(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  const agregarTodo = React.useCallback(
    async (title: string) => {
    if (!authUser) return;
    const newTodo: ITodo = {
      id: Date.now().toString(36),
      title,
      completed: false,
    };
      try {
        await saveTodo(newTodo, authUser);
        const nuevosTodos = await getTodos(authUser);
        setTodos(nuevosTodos);
      } catch (error) {
        console.error(error);
      }
  }, [authUser]);
  
  const toggleTodoCompleted = React.useCallback(
    (newValue: boolean, todoId: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              completed: newValue,
            };
          }
          return todo;
        })
      );
    },
    []
  );

  React.useMemo(() => {
    if (authUser) {
      traerTodos();
    }
  }, [authUser, traerTodos]);

  const contextValue = React.useMemo(
    () => ({
      todos,
      users,
      loading,
      setTodos,
      setUsers,
      setLoading,
      agregarTodo,
      toggleTodoCompleted,
    }),
  [
    todos,
    users,
    setTodos,
    setUsers,
    loading,
    setLoading,
    agregarTodo,
    toggleTodoCompleted,
  ]);

  return (
    <EjemploContext.Provider value={contextValue}>
      {children}
    </EjemploContext.Provider>
  )
};

export const useEjemploContext = () =>
  React.useContext<EjemploContextProps>(EjemploContext);
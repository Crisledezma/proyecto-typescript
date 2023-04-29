import './App.css';
import { EjemploContextProvider } from './contexts/Ejemplo';
import { ListaTodosContexts } from './components/molecules/ListaTodosContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ListaPublicacionesWrapper } from './components/organisms/ListaPublicacionesWrapper';
import { PublicacionPorId } from './components/organisms/PublicacionPorId';
import LoginForm from './components/organisms/LoginForm';

const router = createBrowserRouter([
  {
    path: '/',
    element:  <EjemploContextProvider>
                <ListaTodosContexts />
              </EjemploContextProvider>,
  },
  {
    path: 'publicaciones',
    element: <ListaPublicacionesWrapper />,
  },
  {
    path: 'publicaciones/:id',
    element: <PublicacionPorId />,
  },
  {
    path: 'login',
    element: <LoginForm />,
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;

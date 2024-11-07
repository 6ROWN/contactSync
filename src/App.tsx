import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import Layout from './layouts/Layout';
import Landing from './pages/Landing';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  const router = createBrowserRouter([
    {
      path:"/contact-sync",
      element: <Landing/>
    },
   {
      path:"/",
      element: <Layout/>,
      children:[
        {
          index:true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path:"/login",
          element: <Login/>
        }
      ]
   }
  ])

  return (
    <RouterProvider router={router} />

  )
}

export default App

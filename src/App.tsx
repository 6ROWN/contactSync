import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Landing from "./pages/Landing";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignUp from "./pages/SignUp";
import AddContact from "./pages/AddContact";
import { Toaster } from "sonner";
import ContactDetails from "./pages/ContactDetails";
import EditContact from "./pages/EditContact";
import ErrorPage from "./components/ErrorPage";
import UserProfile from "./pages/UserProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/contact-sync",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/add-contact",
          element: (
            <ProtectedRoute>
              <AddContact />
            </ProtectedRoute>
          ),
        },
        {
          path: "/contact/:id",
          element: (
            <ProtectedRoute>
              <ContactDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/edit/:id",
          element: (
            <ProtectedRoute>
              <EditContact />
            </ProtectedRoute>
          ),
        },
        {
          path: "/view-profile",
          element: (
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
}

export default App;

import {createBrowserRouter, redirect, RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import { RequireAuth } from "./components/RequireAuth";
import { NotFound } from "./pages/NotFound";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import AddNote from "./pages/AddNote";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";

const router = createBrowserRouter([
  {
  path: "/",
  element: 
    (
  <RequireAuth>
  <Layout />
  </RequireAuth>
    ),
  errorElement: <NotFound />,
  children: [
    {
  index: true,
  element: <Home />,
    },
    {
  path: "/",
  loader: () => redirect("/"),
    },
    {
  path: "notes",
  children: [
    {
  index: true,
  element: <Notes />,
    },
    {
  path: "add",
  element: <AddNote />,
    },
    {
  path: ":id",
  element: <Note />,
    },
    {
  path: ":id/edit",
  element: <EditNote />,
    },
    ],
    },  
    ],
    },
    {
  path: "signup",
  element: <Signup />,
    },
    {
  path: "login",
  element: <Login />,
    },
   ]);

export default function App() {
return (
<Provider store={store}>
<PersistGate loading={<>Loading</>} persistor={persistor}>
<RouterProvider router={router} />
</PersistGate>
</Provider>
   );
   }

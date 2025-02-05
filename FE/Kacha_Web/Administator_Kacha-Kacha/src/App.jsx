import { ToastContainer } from "react-toastify";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes";
import LayoutMain from "./layouts/Main";
import HomePage from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    /////////// PUBLIC ROUTES ///////////
    {
      path: ROUTES.HOME,
      element: <LayoutMain Component={HomePage} />,
    },
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

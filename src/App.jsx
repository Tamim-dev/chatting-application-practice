import React  from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Ragistration from "./components/pages/ragistration/Ragistration";
import Login from "./components/pages/login/Login";
import RotLayOut from "./components/pages/RotLayOut";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route
        path="/"
        element={ <Ragistration/>}
      >
      </Route>
      <Route
        path="/login"
        element={ <Login/>}
      >
      </Route>
      <Route
        path="/rotlayout"
        element={ <RotLayOut/>}
      >
      </Route>
      </>
    )
  );
    return(
      <RouterProvider router={router} />
    )
}

export default App;

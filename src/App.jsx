import React from "react";
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";
import Ragistration from "./components/pages/ragistration/Ragistration";
import Login from "./components/pages/login/Login";
import RotLayOut from "./components/pages/RotLayOut";
import Home from "./components/pages/Home";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<Ragistration />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/chat" element={<RotLayOut />}>
                    <Route path="home" element={<Home/>}></Route>
                </Route>
            </Route>
        )
    );
    return <RouterProvider router={router} />;
}

export default App;

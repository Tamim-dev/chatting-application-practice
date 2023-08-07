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
import Chat from "./components/pages/Chat";
import Group from "./components/pages/Group";
import Friends from "./components/pages/Friends";
import People from "./components/pages/People";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<Ragistration />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/chat" element={<RotLayOut />}>
                    <Route path="home" element={<Home/>}></Route>
                    <Route path="chat" element={<Chat/>}></Route>
                    <Route path="group" element={<Group/>}></Route>
                    <Route path="friends" element={<Friends/>}></Route>
                    <Route path="people" element={<People/>}></Route>
                </Route>
            </Route>
        )
    );
    return <RouterProvider router={router} />;
}

export default App;

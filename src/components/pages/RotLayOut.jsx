import React from "react";
import { Outlet } from "react-router-dom";

const RotLayOut = () => {
    return (
        <div>
            <div>RotLayOut</div>
            <Outlet />
        </div>
    );
};

export default RotLayOut;

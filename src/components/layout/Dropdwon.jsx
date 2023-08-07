import React from "react";

const Dropdwon = ({ children, className, dropref }) => {
    return (
        <div className={className} ref={dropref}>
            {children}
        </div>
    );
};

export default Dropdwon;
import React from "react";
import Button from "@mui/material/Button";
import profile from "../../assets/profile.png";

const Friend = () => {
    return (
        <div className="box">
                            <div className="tilte">
                                <h2>Friend</h2>
                            </div>
                            <div className="user">
                                <img className="profileimg" src={profile} />
                                <div className="profiletitle">
                                    <h2>Jenny Wilson</h2>
                                    <p>Love You.....</p>
                                </div>
                                <div className="profilebtn">
                                    <Button variant="contained" size="small">
                                        Join
                                    </Button>
                                </div>
                            </div>
                        </div>
      );
};

export default Friend;

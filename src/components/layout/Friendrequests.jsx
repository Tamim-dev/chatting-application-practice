import React from "react";
import Button from "@mui/material/Button";
import profile from "../../assets/profile.png";

const Friendrequests = () => {
    return (
        <div className="box">
                            <div className="tilte">
                                <h3>Friend Requests</h3>
                            </div>
                            <div className="user">
                                <img className="profileimg" src={profile} />
                                <div className="profiletitle">
                                    <h4>Jenny Wilson</h4>
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

export default Friendrequests;

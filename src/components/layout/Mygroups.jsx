import React from "react";
import Button from "@mui/material/Button";
import profile from "../../assets/profile.png";

const Mygroups = () => {
  return (
    <div className="box">
                        <div className="tilte">
                            <h2>My Groups</h2>
                            <Button variant="contained" size="small">
                                Creact Group
                            </Button>
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

export default Mygroups;

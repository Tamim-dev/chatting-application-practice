import React from "react";
import Button from "@mui/material/Button";
import profile from "../../assets/profile.png";

const Friend = () => {

    let handelFriendRequest =()=>{
        
    }

    return (
        <div className="box">
                            <div className="tilte">
                                <h3>Friend</h3>
                            </div>
                            <div className="user">
                                <img className="profileimg" src={profile} />
                                <div className="profiletitle">
                                    <h4>Jenny Wilson</h4>
                                    <p>Love You.....</p>
                                </div>
                                <div className="profilebtn">
                                    <Button onClick={handelFriendRequest} variant="contained" size="small">
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>
      );
};

export default Friend;

import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Grid from "@mui/system/Unstable_Grid";
import homepagedesign from "../design/homepagedesign.css";
import {
    AiOutlineHome,
    AiOutlineProfile,
    AiOutlineSetting,
} from "react-icons/ai";
import {
    BsChatRightDots,
    BsPeopleFill,
    BsFillPersonFill,
} from "react-icons/bs";
import profile from "../../assets/profile.png";

const RotLayOut = () => {
    let location = useLocation();

    return (
        <div>
            <Grid container spacing={0}>
                <Grid xs={1.5}>
                    <div className="rotlayout">
                        <h2 style={{ marginBottom: "33px" }}>Chat...</h2>

                        <ul>
                            <ol>
                                <Link
                                    to={"/chat/home"}
                                    className={
                                        location.pathname == "/chat/home"
                                            ? "roticon"
                                            : "roticonactive"
                                    }
                                >
                                    <AiOutlineHome /> Home
                                </Link>
                            </ol>
                        </ul>
                        <ul>
                            <ol>
                                <Link
                                    to={"/chat/chat"}
                                    className={
                                        location.pathname == "/chat/chat"
                                            ? "roticon"
                                            : "roticonactive"
                                    }
                                >
                                    <BsChatRightDots /> Chat
                                </Link>
                            </ol>
                        </ul>
                        <ul>
                            <ol>
                                <Link
                                    to={"/chat/group"}
                                    className={
                                        location.pathname == "/chat/group"
                                            ? "roticon"
                                            : "roticonactive"
                                    }
                                >
                                    <BsPeopleFill /> Group
                                </Link>
                            </ol>
                        </ul>
                        <ul>
                            <ol>
                                <Link
                                    to={"/chat/friends"}
                                    className={
                                        location.pathname == "/chat/friends"
                                            ? "roticon"
                                            : "roticonactive"
                                    }
                                >
                                    <BsFillPersonFill /> Friends
                                </Link>
                            </ol>
                        </ul>
                        <ul>
                            <ol>
                                <Link
                                    to={"/chat/people"}
                                    className={
                                        location.pathname == "/chat/people"
                                            ? "roticon"
                                            : "roticonactive"
                                    }
                                >
                                    <AiOutlineProfile /> People
                                </Link>
                            </ol>
                        </ul>
                        <div className="rotprofile">
                            <img style={{width:"25%"}} src={profile}/>
                            <p style={{width:"60%", margin:'0 5px 0 8px'}}>Paula Mora</p>
                            <AiOutlineSetting style={{ width:"15px"}}/>
                        </div>
                    </div>
                </Grid>
                <Grid xs={10.5}>
                    <Outlet />
                </Grid>
            </Grid>
        </div>
    );
};

export default RotLayOut;

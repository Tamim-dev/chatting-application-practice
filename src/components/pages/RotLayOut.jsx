import React, { useRef, useState, useEffect } from "react";
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
import { BiLogOut } from "react-icons/bi";
import profile from "../../assets/profile.png";
import Dropdwon from "../layout/Dropdwon";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { userData } from "../../features/userSlice";

const RotLayOut = () => {
    let [logoutRefDropDwon, setLogoutRefDropDwon] = useState(false);
    let userdata = useSelector((state) => state.loggedUser.loginUser);

    let logoutref = useRef();
    let location = useLocation();
    const auth = getAuth();
    const dispatch = useDispatch();
    let navigate = useNavigate()
    let loginUser = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        if (loginUser == null) {
            navigate("/login");
        }
    }, []);

    if (loginUser == null) {
        navigate("/login");
        return
    }

    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (logoutref.current.contains(e.target)) {
                setLogoutRefDropDwon(true);
            } else {
                setLogoutRefDropDwon(false);
            }
            return
        });
    }, []);

    let handelLogOut = ()=>{
        signOut(auth).then(() => {
            localStorage.removeItem("users");
            dispatch(userData(null));
            navigate("/login")
          }).catch((error) => {
            console.log("hoi nai");
          });
    }

    return (
        <div>
            <Grid container spacing={0}>
                <Grid xs={1.5}>
                    <div className="rotlayout">
                        <h3 style={{ marginBottom: "33px" }}>Chat...</h3>

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
                            <img style={{ width: "25%" }} src={profile} />
                            <p style={{ width: "60%", margin: "0 5px 0 8px" }}>
                                {userdata.displayName}
                            </p>
                            <Dropdwon dropref={logoutref}>
                                <AiOutlineSetting
                                    style={{ width: "15px", fontSize: "16px" }}
                                />
                                {logoutRefDropDwon && (
                                    <div className="Dropdwon">
                                        <button className="btn" onClick={handelLogOut}>
                                            <BiLogOut style={{display:"flex", alignItems:"center"}}/> Log Out
                                        </button>
                                    </div>
                                )}
                            </Dropdwon>
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

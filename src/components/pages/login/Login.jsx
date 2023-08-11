import React, { useEffect, useState } from "react";
import loginragistration from "../../design/loginragistration.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import imgp from "../../../assets/react.svg";
import Alert from "@mui/material/Alert";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";
import Grid from "@mui/system/Unstable_Grid";
import { useDispatch,useSelector } from "react-redux";
import { userData } from "../../../features/userSlice";

let initialValue = {
    email: "",
    password: "",
    error: "",
};

const Login = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let [values, setValues] = useState(initialValue);
    let loginUser = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        if (loginUser != null) {
            navigate("/chat/home");
        }
    }, []);

    let handelChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: "",
        });
    };

    let handelClick = () => {
        let { email, password } = values;

        if (!email) {
            setValues({
                ...values,
                error: "Enteryouremail",
            });
            return;
        }
        if (!password) {
            setValues({
                ...values,
                error: "Enteryourpassword",
            });
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                dispatch(userData(user.user));
                localStorage.setItem("users", JSON.stringify(user.user));
                navigate("/chat/home");
            })
            .catch((error) => {
                if (error.message.includes("(auth/invalid-email)")) {
                    setValues({
                        ...values,
                        error: "auth/invalid-email",
                    });
                }
                if (error.message.includes("(auth/wrong-password)")) {
                    setValues({
                        ...values,
                        error: "(auth/wrong-password)",
                    });
                }
                if (error.message.includes("(auth/user-not-found)")) {
                    setValues({
                        ...values,
                        error: "(auth/user-not-found)",
                    });
                }
            });
    };

    return (
        <Grid container spacing={0}>
            <div className="inputbox">
                <div>
                    <img style={{ marginTop: "70px" }} src={imgp} />
                    <h2 style={{ margin: "32px 0 12px 0" }}>Login</h2>
                    <p>Login and you can enjoy it</p>
                </div>
                <div className="textfield">
                    <TextField
                        onChange={handelChange}
                        name="email"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                    />
                    {values.error.includes("Enteryouremail") && (
                        <Alert className="alert" severity="error">
                            Please Enter Your Email
                        </Alert>
                    )}
                    {values.error.includes("auth/invalid-email") && (
                        <Alert className="alert" severity="error">
                            Email is invalid
                        </Alert>
                    )}
                    {values.error.includes("auth/user-not-found") && (
                        <Alert className="alert" severity="error">
                            User-not-found
                        </Alert>
                    )}
                </div>
                <div className="textfieldeye">
                    <TextField
                        onChange={handelChange}
                        name="password"
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type={values.eye ? "text" : "password"}
                    />
                    <div
                        className="eye"
                        onClick={() =>
                            setValues({ ...values, eye: !values.eye })
                        }
                    >
                        {values.eye ? <PiEyeBold /> : <PiEyeClosedBold />}
                    </div>
                    {values.error.includes("Enteryourpassword") && (
                        <Alert className="alert" severity="error">
                            Please Enter Your Password
                        </Alert>
                    )}
                    {values.error.includes("(auth/wrong-password)") && (
                        <Alert className="alert" severity="error">
                            Password is wrong
                        </Alert>
                    )}
                </div>
                <div>
                    <Button onClick={handelClick} variant="contained">
                        Login
                    </Button>
                </div>
                <Alert className="alert" severity="info">
                    Don't have an account ?{" "}
                    <Link
                        to="/"
                        style={{
                            color: "#DA8F21",
                            cursor: "pointer",
                            textDecoration: "none",
                        }}
                    >
                        Sing Up
                    </Link>
                </Alert>
            </div>
        </Grid>
    );
};

export default Login;

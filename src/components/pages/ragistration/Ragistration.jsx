import React, { useState } from "react";
import loginragistration from "../../design/loginragistration.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import imgp from "../../../assets/react.svg";
import Alert from "@mui/material/Alert";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";
import Grid from "@mui/system/Unstable_Grid";

let initialValue = {
    email: "",
    fullName: "",
    password: "",
    error: "",
    eye: false,
};

const Ragistration = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let [values, setValues] = useState(initialValue);

    let handelChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: "",
        });
    };

    let handelClick = () => {
        let { email, fullName, password } = values;

        if (!email) {
            setValues({
                ...values,
                error: "Enteryouremail",
            });
            return;
        }
        if (!fullName) {
            setValues({
                ...values,
                error: "Enteryourfullname",
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

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                if (error.message.includes("(auth/invalid-email)")) {
                    setValues({
                        ...values,
                        error: "auth/invalid-email",
                    });
                }
            });
    };

    return (
        <Grid container spacing={0}>
            <div className="inputbox">
                <div>
                    <img style={{ marginTop: "70px" }} src={imgp} />
                    <h2 style={{ margin: "32px 0 12px 0" }}>
                        Get started with easily register
                    </h2>
                    <p>Free register and you can enjoy it</p>
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
                            Enter is invalid
                        </Alert>
                    )}
                </div>
                <div className="textfield">
                    <TextField
                        onChange={handelChange}
                        name="fullName"
                        id="outlined-basic"
                        label="Full Name"
                        variant="outlined"
                    />
                    {values.error.includes("Enteryourfullname") && (
                        <Alert className="alert" severity="error">
                            Please Enter Your Full Name
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
                        onClick={()=>setValues({ ...values, eye: !values.eye })}
                    >
                        {values.eye ? <PiEyeBold /> : <PiEyeClosedBold />}
                    </div>

                    {values.error.includes("Enteryourpassword") && (
                        <Alert className="alert" severity="error">
                            Please Enter Your Password
                        </Alert>
                    )}
                </div>
                <div>
                    <Button onClick={handelClick} variant="contained">
                        Ragistration
                    </Button>
                </div>
                <Alert className="alert" severity="info">
                    Allready have an account ?{" "}
                    <Link
                        to="/login"
                        style={{
                            color: "#DA8F21",
                            cursor: "pointer",
                            textDecoration: "none",
                        }}
                    >
                        Sing In
                    </Link>
                </Alert>
            </div>
        </Grid>
    );
};

export default Ragistration;

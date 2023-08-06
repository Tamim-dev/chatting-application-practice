import React, { useState } from "react";
import loginragistration from "../../design/loginragistration.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import imgp from "../../../assets/react.svg";
import Alert from "@mui/material/Alert";

let initialValue = {
    email: "",
    password: "",
    error: "",
};

const Login = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let [values, setValues] = useState(initialValue);

    let handelChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error:""
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
            .then((userCredential) => {
                navigate("/rotlayout");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    return (
        <div className="inputbox">
            <div>
                <img style={{ marginTop: "100px" }} src={imgp} />
                <h2 style={{ margin: "42px 0 12px 0" }}>Login</h2>
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
            </div>
            <div className="textfield">
                <TextField
                    onChange={handelChange}
                    name="password"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                />
                {values.error.includes("Enteryourpassword") && (
                    <Alert className="alert" severity="error">
                        Please Enter Your Password
                    </Alert>
                )}
            </div>
            <div>
                <Button onClick={handelClick} variant="contained">
                    Login
                </Button>
            </div>
        </div>
    );
};

export default Login;

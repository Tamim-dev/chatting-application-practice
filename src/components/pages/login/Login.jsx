import React, { useState } from "react";
import loginragistration from "../../design/loginragistration.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

let initialValue = {
    email: "",
    password: "",
    error: "",
};

const Login = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let [values, setValues] = useState(initialValue);

    let handelChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    let handelClick = () => {
        let { email, password } = values;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/rotlayout")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    return (
        <div className="inputbox">
            <div className="textfield">
                <TextField
                    onChange={handelChange}
                    name="email"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                />
            </div>
            <div className="textfield">
                <TextField
                    onChange={handelChange}
                    name="password"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                />
            </div>
            <div>
                <Button onClick={handelClick} variant="contained">
                    Ragistration
                </Button>
            </div>
        </div>
    );
};

export default Login;

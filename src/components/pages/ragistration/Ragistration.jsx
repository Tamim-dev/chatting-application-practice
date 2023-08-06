import React, { useState } from "react";
import loginragistration from "../../design/loginragistration.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import imgp from "../../../assets/react.svg";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

let initialValue = {
    email: "",
    fullName: "",
    password: "",
    error: "",
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
                console.log(error.message);
            });
    };

    return (
        <div className="inputbox">
            <div>
                <img style={{ marginTop: "100px" }} src={imgp} />
                <h2 style={{ margin: "42px 0 12px 0" }}>
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
                    Ragistration
                </Button>
            </div>
            <Alert className="alert" severity="info">
                         Allready have an account  <Link to="/login" style={{color:"#DA8F21", cursor:"pointer"}}>Sing In</Link>
                    </Alert>
        </div>
    );
};

export default Ragistration;

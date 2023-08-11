import React, { useState ,useEffect} from "react";
import Button from "@mui/material/Button";
import profile from "../../assets/profile.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
};
let initialValue = {
    name: "",
    tagline: "",
};

const Mygroups = () => {
    const db = getDatabase();
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(initialValue);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    let userList = useSelector((state) => state.loggedUser.loginUser);
    let [myGroup,setMyGroup] = useState([])

    useEffect(() => {
        onValue(ref(db, "groups/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userList.uid == item.val().adminId) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setMyGroup(arr);
        });
    }, []);

    let handelchange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    let handelCreactGroup = () => {
        set(push(ref(db, "groups/")), {
            adminId: userList.uid,
            adminName: userList.displayName,
            groupName: values.name,
            groupTagline: values.tagline,
        }).then(() => {
            setOpen(false);
        });
    };

    return (
        <div className="box">
            <div className="tilte">
                <h3>My Groups</h3>
                <Button onClick={handleOpen} variant="contained" size="small">
                    Creact Group
                </Button>
            </div>
            {myGroup.map(item=>(
                <div className="user">
                <img className="profileimg" src={profile} />
                <div className="profiletitle">
                    <p style={{fontSize:"10px"}}>Admin: {item.adminName}</p>
                    <h4>{item.groupName}</h4>
                    <p style={{fontSize:"12px"}}>{item.groupTagline}</p>
                </div>
                <div className="frireqebtn">
                    <Button variant="contained" color="secondary" size="small">
                        Requset
                    </Button>
                    <Button variant="contained" color="success" size="small">
                        Members
                    </Button>
                </div>
            </div>
            ))}
            

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Creact Group
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField
                            onChange={handelchange}
                            name="name"
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />
                        <TextField
                            onChange={handelchange}
                            name="tagline"
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />
                        <Button
                            onClick={handelCreactGroup}
                            variant="contained"
                            size="small"
                        >
                            Creact
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default Mygroups;

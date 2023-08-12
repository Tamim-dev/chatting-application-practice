import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import profile from "../../assets/profile.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
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
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [values, setValues] = useState(initialValue);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const handleClose2 = () => setOpen2(false);
    const handleClose3 = () => setOpen3(false);
    let userList = useSelector((state) => state.loggedUser.loginUser);
    let [myGroup, setMyGroup] = useState([]);
    let [GroupJoinReq, setGroupJoinReq] = useState([]);
    let [members, setMembers] = useState([]);

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

    let handelReqlist = (item) => {
        onValue(ref(db, "groupjoinreq/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((items) => {
                if (
                    userList.uid == items.val().adminId &&
                    items.val().groupId == item.id
                ) {
                    arr.push({ ...items.val(), id: items.key });
                }
            });
            setGroupJoinReq(arr);
        });
        setOpen2(true);
    };

    let handelMemberAccept =(item)=>{
        set(push(ref(db, "members/")), {
            ...item
        }).then(() => {
            remove(ref(db, "groupjoinreq/" + item.id));
        });
    }

    let handelremove =(item)=>{
        remove(ref(db, "groupjoinreq/" + item.id));
    }

    let handelMember =(item)=>{
        onValue(ref(db, "members/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userList.uid == item.val().adminId) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setMembers(arr);
        });
        setOpen3(true)
    }

    let handelmembersremove =(item)=>{
        remove(ref(db, "members/" + item.id));
    }

    return (
        <div className="box">
            <div className="tilte">
                <h3>My Groups</h3>
                <Button onClick={handleOpen} variant="contained" size="small">
                    Creact Group
                </Button>
            </div>
            {myGroup.map((item) => (
                <div className="user">
                    <img className="profileimg" src={profile} />
                    <div className="profiletitle">
                        <p style={{ fontSize: "10px" }}>
                            Admin: {item.adminName}
                        </p>
                        <h4>{item.groupName}</h4>
                        <p style={{ fontSize: "12px" }}>{item.groupTagline}</p>
                    </div>
                    <div className="frireqebtn">
                        <Button
                            onClick={() => handelReqlist(item)}
                            variant="contained"
                            color="secondary"
                            size="small"
                        >
                            Requset
                        </Button>
                        <Button
                        onClick={()=>handelMember(item)}
                            variant="contained"
                            color="success"
                            size="small"
                        >
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

            <Modal
                open={open2}
                onClose={handleClose2}
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
                    {GroupJoinReq.map((item, index) => (
                        <Typography
                            id="modal-modal-description"
                            sx={{
                                mt: 2,
                                borderBottom: "1px solid #262626",
                                display: "flex",
                            }}
                        >
                            <ListItem key={index} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.userName}
                                    secondary={
                                        <React.Fragment>
                                            {"wants to join your group"}
                                        </React.Fragment>
                                    }
                                />
                                <div className="frireqebtn">
                                    <Button onClick={()=>handelMemberAccept(item)} variant="contained" size="small">
                                        accept
                                    </Button>
                                    <Button onClick={()=>handelremove(item)} variant="contained" size="small">
                                        remove
                                    </Button>
                                </div>
                            </ListItem>
                        </Typography>
                    ))}
                </Box>
            </Modal>

            
            <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Members List
                    </Typography>
                    {members.map((item, index) => (
                        <Typography
                            id="modal-modal-description"
                            sx={{
                                mt: 2,
                                borderBottom: "1px solid #262626",
                                display: "flex",
                            }}
                        >
                            <ListItem key={index} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.userName}
                                    secondary={
                                        <React.Fragment>
                                            {"wants to join your group"}
                                        </React.Fragment>
                                    }
                                />
                                <div className="frireqebtn">
                                    <Button onClick={()=>handelmembersremove(item)} variant="contained" size="small">
                                        remove
                                    </Button>
                                </div>
                            </ListItem>
                        </Typography>
                    ))}
                </Box>
            </Modal>
        </div>
    );
};

export default Mygroups;

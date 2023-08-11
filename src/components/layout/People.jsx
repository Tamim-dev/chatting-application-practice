import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import profile from "../../assets/profile.png";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const People = () => {
    const db = getDatabase();
    let [usersArr, setUsersArr] = useState([]);
    let [friendRequestArr, setFriendRequestArr] = useState([]);
    let [friendsArr, setFriendsArr] = useState([]);
    let [blockArr, setBlockArr] = useState([]);
    let userList = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        onValue(ref(db, "users/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userList.uid != item.key) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setUsersArr(arr);
        });
        onValue(ref(db, "friendrequest/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().receiverId + item.val().senderId);
            });
            setFriendRequestArr(arr);
        });
        onValue(ref(db, "friends/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().receiverId + item.val().senderId);
            });
            setFriendsArr(arr);
        });
        onValue(ref(db, "block/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().blockedId + item.val().whoblockId);
            });
            setBlockArr(arr);
        });
    }, []);

    let handelFriendReq = (item) => {
        set(ref(db, "friendrequest/" + item.id), {
            senderId: userList.uid,
            senderName: userList.displayName,
            receiverId: item.id,
            receiverName: item.username,
        });
    };

    let handelFriendReqCancel = (item) => {
        remove(ref(db, "friendrequest/" + item.id));
    };
    return (
        <div className="box">
            <div className="tilte">
                <h3>People</h3>
            </div>
            {usersArr.map((item) => (
                <div className="user">
                    <img className="profileimg" src={profile} />
                    <div className="profiletitle">
                        <h4>{item.username}</h4>
                    </div>
                    <div className="profilebtn">
                        {friendRequestArr.includes(item.id + userList.uid) ? (
                            <Button
                                onClick={() => handelFriendReqCancel(item)}
                                variant="contained"
                                size="small"
                            >
                                Cancel
                            </Button>
                        ) : friendRequestArr.includes(
                              userList.uid + item.id
                          ) ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                            >
                                Panding
                            </Button>
                        ) : friendsArr.includes(item.id + userList.uid) ||
                          friendsArr.includes(userList.uid + item.id) ? (
                            <Button
                                variant="contained"
                                size="small"
                                color="success"
                            >
                                Friend
                            </Button>
                        ) : blockArr.includes(item.id + userList.uid) ||
                          blockArr.includes(userList.uid + item.id) ? (
                            <Button variant="contained" color="error" size="small">
                                Block
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handelFriendReq(item)}
                                variant="contained"
                                size="small"
                            >
                                Add
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default People;

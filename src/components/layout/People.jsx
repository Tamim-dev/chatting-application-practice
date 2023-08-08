import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import profile from "../../assets/profile.png";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const People = () => {
    const db = getDatabase();
    let [usersArr, setUsersArr] = useState([]);
    let [friendrequestArr, setFriendrequestArr] = useState([]);
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
            setFriendrequestArr(arr);
        });
    }, []);

    let handelFriendReq = (item) => {
        set(push(ref(db, "friendrequest")), {
            senderId: userList.uid,
            senderName: userList.displayName,
            receiverId: item.id,
            receiverName: item.username,
        });
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
                        {friendrequestArr.includes(item.id + userList.uid) ? (
                            <Button
                                onClick={() => handelFriendReq(item)}
                                variant="contained"
                                size="small"
                            >
                                Cancel
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

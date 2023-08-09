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

const Friend = () => {
    const db = getDatabase();
    let [friendstArr, setFriendsArr] = useState([]);
    let userList = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        onValue(ref(db, "friends/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (
                    item.val().senderName == userList.displayName ||
                    item.val().receiverName == userList.displayName
                ) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setFriendsArr(arr);
        });
    }, []);

    return (
        <div className="box">
            <div className="tilte">
                <h3>Friend</h3>
            </div>
            {friendstArr.map((item) => (
                <div className="user">
                    <img className="profileimg" src={profile} />
                    <div className="profiletitle">
                        {item.receiverid == userList.uid ? (
                            <h4>{item.senderName}</h4>
                        ) : (
                            <h4>{item.receiverName}</h4>
                        )}
                    </div>
                    <div className="profilebtn">
                        <Button variant="contained" size="small">
                            Add
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Friend;

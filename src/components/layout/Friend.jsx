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

    let handelUnfriend =(item)=>{
        remove(ref(db, "friends/" + item.id))
    }

    let handelBlock =(item)=>{
        set(ref(db, "block/" + item.id),{
            whoblockId: item.receiverId,
            whoblockName: item.receiverName,
            blockedId: item.senderId,
            blockedName: item.senderName
        }).then(()=>{
            remove(ref(db, "friends/" + item.id))
        })
    }

    return (
        <div className="box">
            <div className="tilte">
                <h3>Friend</h3>
            </div>
            {friendstArr.map((item) => (
                <div className="user">
                    <img className="profileimg" src={profile} />
                    <div className="profiletitle">
                        {item.receiverId == userList.uid ? (
                            <h4>{item.senderName}</h4>
                        ) : (
                            <h4>{item.receiverName}</h4>
                        )}
                    </div>
                    <div className="frireqebtn">
                        <Button onClick={()=>handelUnfriend(item)} variant="contained" color="secondary" size="small">
                            Unfriend
                        </Button>
                        <Button onClick={()=>handelBlock(item)} variant="contained" color="error" size="small">
                            Block
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Friend;

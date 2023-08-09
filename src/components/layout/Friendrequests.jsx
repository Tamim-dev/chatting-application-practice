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

const Friendrequests = () => {
    const db = getDatabase();
    let [friendrequestArr, setFriendrequestArr] = useState([]);

    let userList = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        onValue(ref(db, "friendrequest/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().receiverId == userList.uid) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setFriendrequestArr(arr);
        });
    }, []);

    let handelAccept =(item)=>{
        set(push(ref(db, "friends")),{
            ...item
        }).then(()=>{
            remove(ref(db, "friendrequest/" + item.id))
        })
    }

    let handelReject =(item)=>{
        remove(ref(db, "friendrequest/" + item.id))
    }

    return (
        <div className="box">
            <div className="tilte">
                <h3>Friend Requests</h3>
            </div>
            {friendrequestArr.map((item) => (
                <div className="user">
                    <img className="profileimg" src={profile} />
                    <div className="profiletitle">
                        <h4>{item.senderName}</h4>
                    </div>
                    <div className="frireqebtn">
                        <Button onClick={()=>handelAccept(item)} variant="contained" size="small">
                            Accept
                        </Button>
                        <Button onClick={()=>handelReject(item)} variant="contained" color="error" size="small">
                            reject
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Friendrequests;

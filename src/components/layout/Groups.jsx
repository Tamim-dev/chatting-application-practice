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

const Groups = () => {
    const db = getDatabase();
    let userList = useSelector((state) => state.loggedUser.loginUser);
    let [myGroup, setMyGroup] = useState([]);
    let [GroupJoinReq, setGroupJoinReq] = useState([]);


    useEffect(() => {
        onValue(ref(db, "groups/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userList.uid != item.val().adminId) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setMyGroup(arr);
        });

        onValue(ref(db, "groupjoinreq/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                // if(item.val().userId == userList.uid){

                    arr.push(item.val().groupId);
                // }
            });
            setGroupJoinReq(arr);
        });
    }, []);

    let handelJoinReq = (item) => {
        set(push(ref(db, "groupjoinreq/")), {
            userId: userList.uid,
            groupId: item.id,
        });
       
    };

    return (
        <div className="box">
            <div className="tilte">
                <h3>Group</h3>
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
                    <div className="profilebtn">
                        {GroupJoinReq.indexOf(item.id) != -1 ?
                        <Button
                            variant="contained"
                            size="small"
                        >
                            Requset
                        </Button>
                        :
                        <Button
                            onClick={() => handelJoinReq(item)}
                            variant="contained"
                            size="small"
                        >
                            Join
                        </Button>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Groups;

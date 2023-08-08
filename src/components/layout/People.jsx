import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import profile from "../../assets/profile.png";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const People = () => {
    const db = getDatabase();
    let [usersArr, setUsersArr] = useState([])
    let userList = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        onValue(ref(db, "users/"), (snapshot) => {
            let arr =[]
            snapshot.forEach((item)=>{
                if(userList.uid != item.key){
                    arr.push({...item.val(),id:item.key})
                }
            })
            setUsersArr(arr)
        });
    }, []);

    let handelFriendReq =(item)=>{

    }
    return (
        <div className="box">
            <div className="tilte">
                <h3>People</h3>
            </div>
            {usersArr.map(item=>(
                <div className="user">
                <img className="profileimg" src={profile} />
                <div className="profiletitle">
                    <h4>{item.username}</h4>
                </div>
                <div className="profilebtn">
                    <Button onClick={()=>handelFriendReq(item)} variant="contained" size="small">
                        Add
                    </Button>
                </div>
            </div>
            ))}
            
        </div>
    );
};

export default People;

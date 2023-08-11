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

const Blocklist = () => {
    const db = getDatabase();
    let [BlockArr, setBlockArr] = useState([]);
    let userList = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        onValue(ref(db, "block/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if(item.val().whoblockId == userList.uid){
                    arr.push({ ...item.val(), id: item.key });
                }
                
            });
            setBlockArr(arr);
        });
    }, []);

    let handelUnblock = (item)=>{
        remove(ref(db,"block/" + item.id))
    }

    return (
        <div className="box">
            <div className="tilte">
                <h3>Block List</h3>
            </div>
            {BlockArr.map((item) => (
                <div className="user">
                    <img className="profileimg" src={profile} />
                    <div className="profiletitle">
                        <h4>Jenny Wilson</h4>
                        <p>Love You.....</p>
                    </div>
                    <div className="profilebtn">
                        <Button onClick={()=>handelUnblock(item)} variant="contained" size="small">
                            Unblock
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Blocklist;

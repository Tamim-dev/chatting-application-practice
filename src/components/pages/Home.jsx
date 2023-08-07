import React,{useEffect} from "react";
import Grid from "@mui/system/Unstable_Grid";
import Mygroups from "../layout/Mygroups";
import People from "../layout/People";
import Groups from "../layout/Groups";
import Friendrequests from "../layout/Friendrequests";
import Friend from "../layout/Friend";
import Blocklist from "../layout/Blocklist";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Home = () => {
    let navigate = useNavigate();
    let loginUser = useSelector((state) => state.loggedUser.loginUser);

    useEffect(() => {
        if (loginUser == null) {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <Grid container>
                <Grid xs={4}>
                    <Mygroups/>
                    <People/>
                </Grid>
                <Grid xs={4}>
                    <Groups/>
                    <Friendrequests/>
                </Grid>
                <Grid xs={4}>
                    <Friend/>
                    <Blocklist/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;

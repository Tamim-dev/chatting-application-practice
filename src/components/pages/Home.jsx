import React from "react";
import Grid from '@mui/system/Unstable_Grid';
import Button from '@mui/material/Button';

const Home = () => {
    return (
        <div>
            <Grid container spacing={0}>
                <Grid xs={4}>
                    <div className="box">
                    <div className="tilte">
                    <h2>My Groups</h2>
                    <Button variant="outlined" size="small">Outlined</Button>
                    </div>
                    </div>
                </Grid>
                <Grid xs={4}>
                    xs=4
                </Grid>
                <Grid xs={4}>
                    xs=4
                </Grid>
                <Grid xs={4}>
                    xs=8
                </Grid>
                <Grid xs={4}>
                    xs=8
                </Grid>
                <Grid xs={4}>
                    xs=8
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;

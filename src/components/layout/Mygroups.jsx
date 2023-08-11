import React,{useState} from "react";
import Button from "@mui/material/Button";
import profile from "../../assets/profile.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };
  let initialValue = {
    name: "",
    tagline: "",
};

const Mygroups = () => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(initialValue);
    const handleClose = () => setOpen(false);

    let handelchange =(e)=>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    let handelCreactGroup = () => {
        setOpen(true);
    };

    return (
        <div className="box">
            <div className="tilte">
                <h3>My Groups</h3>
                <Button
                    onClick={handelCreactGroup}
                    variant="contained"
                    size="small"
                >
                    Creact Group
                </Button>
            </div>
            <div className="user">
                <img className="profileimg" src={profile} />
                <div className="profiletitle">
                    <h4>Jenny Wilson</h4>
                    <p>Love You.....</p>
                </div>
                <div className="profilebtn">
                    <Button variant="contained" size="small">
                        Join
                    </Button>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                    Creact Group
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField onChange={handelchange} name="name" id="outlined-basic" label="Outlined" variant="outlined" />
                    <TextField onChange={handelchange} name="tagline" id="outlined-basic" label="Outlined" variant="outlined" />
                    <Button
                    onClick={handelCreactGroup}
                    variant="contained"
                    size="small"
                >
                    Creact
                </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default Mygroups;

import * as React from 'react';
import MainAdminLay from '../../../layouts/AdminLayouts/MainAdminLay'
import Time from '../../Time'
import DepartmentTable from './Table'
import { FaPlus } from "react-icons/fa6";
import "./depart.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import axios from 'axios';
import VerifyToken from '../../VerifyToken';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
};

const Department = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false)
    let { verifyData } = VerifyToken()
    const schoolName = verifyData.schoolName;
    const schoolEmail = verifyData.email;
    const data = { name, schoolName, schoolEmail }

    const create = () => {
        console.log(data);
            axios.post("https://gradejet-backend.onrender.com/department", data)
                .then((res) => {
                    console.log(res);
                    setName(" ")
                    handleClose()
                    toast.success(res.data.message)
                }).catch((err) => {
                    console.log(err);
                    toast.error(err.response.data.message)
                })
    }
    return (
        <MainAdminLay>
        <ToastContainer />

            <div className=" px-5 py-2 h-screen">
                <div className="waist px-3">
                    <h3 className="bop">Departments</h3>
                    <div className="e">
                        <Time STYLE="meo" />
                    </div>
                </div>
                <div>
                    <DepartmentTable />
                </div>
                <div className='ccd '>

                    <Button onClick={handleOpen}><button className='bob bg-dark-purple'><FaPlus /></button></Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Create a Department
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <input className='form-control' onChange={(e) => setName(e.target.value)} placeholder='Department name' />
                                <div className='flex justify-end py-2'>
                                    <Button onClick={() => create()}>Create</Button>
                                </div>
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            </div>
        </MainAdminLay>
    )
}

export default Department
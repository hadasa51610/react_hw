import { FormEvent, useContext, useState } from "react";
import { UserContext, UserType } from "./UserReducer";
import Form from "./Form";
import axios from "axios";
import { URL } from "./userDetails";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const UpdateUser = () => {
    const { user, userDispatch } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: FormEvent, user1: UserType) => {
        e.preventDefault();
        setOpen(false);

        try {
            const res = await axios.put(
                URL, {
                firstName: user1.firstName,
                lastName: user1.lastName,
                mail: user1.mail,
                password: user1.password,
                address: user1.address,
                phone: user1.phone
            }, { headers: { 'user-id': '' + user.id } } )

            userDispatch({
                type: 'UPDATE_USER',
                data: res.data
            })

        } catch (error: any) {
            if (error.status === 404) { alert('user not found') }
            else if (error.status === 403) { alert('Unauthorized') }
        }
    }

    return (<>
        <Button sx={{ color: "black", borderColor: "black" }} startIcon={<EditIcon />} variant="outlined" onClick={() => setOpen(!open)}>Update</Button>

        <Modal open={open} onClose={() => setOpen(false)}>
            <Box
                component={Paper}
                sx={{
                    position: 'fixed',
                    top: '40vh',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    boxShadow: 24,
                    borderRadius: 2
                }} >
                <Form handleSubmit={handleSubmit} />
            </Box>
        </Modal>
    </>)
}
export default UpdateUser;
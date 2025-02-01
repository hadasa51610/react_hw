import { FormEvent, useContext, useState } from "react";
import { UserContext, UserType } from "./UserReducer";
import Form from "./Form";
import axios, { AxiosError } from "axios";
import { URL } from "./UserDetails";
import { Button, Modal } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const UpdateUser = () => {
    const { user, userDispatch } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: FormEvent, user1: UserType) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                URL, { ...user1 }
                , { headers: { 'user-id': '' + user.id } })

            userDispatch({
                type: 'UPDATE_USER',
                data: res.data
            })
            setOpen(false);
        } catch (error: AxiosError | any) {
            if (error.response.status === 404) { alert('user not found') }
            else if (error.response.status === 403) { alert('Unauthorized') }
        }
    }

    return (<>
        <Button sx={{ color: "black", borderColor: "black" }} startIcon={<EditIcon />} variant="outlined" onClick={() => setOpen(true)}>Update</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Form handleSubmit={handleSubmit} />
        </Modal>
    </>)
}
export default UpdateUser;
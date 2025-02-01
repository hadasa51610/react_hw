import { useContext, useState } from "react";
import { UserContext, UserType } from "./UserReducer";
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField, Box, Typography } from "@mui/material";

const Form = ({ handleSubmit }: { handleSubmit: Function }) => {

    const { user } = useContext(UserContext);
    const [userData, setUser] = useState<UserType>({
        id: user?.id || 0,
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        password: user?.password || "",
        address: user?.address || "",
        phone: user?.phone || ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...userData,
            [name]: value
        });
    };

    return (<>
        <Box
            component="form"
            sx={{
                position: 'absolute',
                top: '15%',
                left: '40%',
                transform: 'translateX(-50%,-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                boxShadow: 24,
                bgcolor: 'background.paper',
                borderRadius: 3,
                '& > :not(style)': { m: 1, width: '100%' }
            }}

            noValidate
            autoComplete="off"
        >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Update Your Information
            </Typography>
            <TextField label="First Name" variant="outlined"
                type='text' name="firstName" value={userData.firstName} onChange={handleChange} />
            <TextField label="Last Name" variant="outlined"
                type='text' name="lastName" value={userData.lastName} onChange={handleChange} />
            <TextField label="Email" variant="outlined"
                type='email' name="mail" value={userData.email} onChange={handleChange} />
            <TextField label="Password" variant="outlined"
                type='password' name="password" value={userData.password} onChange={handleChange} />
            <TextField label="Address" variant="outlined"
                type='text' name="address" value={userData.address} onChange={handleChange} />
            <TextField label="Phone" variant="outlined"
                type='text' name="phone" value={userData.phone} onChange={handleChange} />
            <Button type="submit" startIcon={<SendIcon />} variant="contained" sx={{ mt: 2, bgcolor: '#ae7a6f', '&:hover': { bgcolor: 'primary.dark' } }}
                onClick={(e) => { handleSubmit(e, userData); }}>Send</Button>
        </Box>
    </>)
}
export default Form;
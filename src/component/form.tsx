import { useContext, useState } from "react";
import { UserContext } from "./UserReducer";
import SendIcon from '@mui/icons-material/Send';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Form = ({ handleSubmit }: { handleSubmit: Function }) => {

    const { user } = useContext(UserContext);
    const [userData, setUser] = useState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        mail: user.mail,
        password: user.password,
        address: user.address,
        phone: user.phone
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
                position: 'fixed',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
                width:"35ch",
                '& > :not(style)': { m: 1, width: '100%' }
            }}

            noValidate
            autoComplete="off"
            onSubmit={(e) => { handleSubmit(e, userData); }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Update Your Information
            </Typography>
            <TextField label="First Name" variant="outlined"
                type='text' name="firstName" value={userData.firstName} onChange={handleChange} />
            <TextField label="Last Name" variant="outlined"
                type='text' name="lastName" value={userData.lastName} onChange={handleChange} />
            <TextField label="Email" variant="outlined"
                type='email' name="mail" value={userData.mail} onChange={handleChange} />
            <TextField label="Password" variant="outlined"
                type='password' name="password" value={userData.password} onChange={handleChange} />
            <TextField label="Address" variant="outlined"
                type='text' name="address" value={userData.address} onChange={handleChange} />
            <TextField label="Phone" variant="outlined"
                type='text' name="phone" value={userData.phone} onChange={handleChange} />
            <Button type="submit" startIcon={<SendIcon />} variant="contained" sx={{ mt: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
            >Send</Button>
        </Box>
    </>)
}
export default Form;
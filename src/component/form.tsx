import { useContext, useState } from "react";
import { UserContext, UserType } from "./userReducer";
import SendIcon from '@mui/icons-material/Send';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Form = ({ handleSubmit }: { handleSubmit: Function }) => {

    const { user } = useContext(UserContext);
    const [userData, setUser] = useState<UserType>({
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
                border: '1px solid black',
                position: 'fixed',
                top: '15vh',
                left: '40vw',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '75vh', 
                '& > :not(style)': { m: 1, width: '30ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={(e) => { handleSubmit(e, userData); }}>
                
                <TextField label="firstName" variant="outlined"
                    type='text' name="firstName" value={userData.firstName} onChange={handleChange} />
                <TextField label="lastName" variant="outlined"
                    type='text' name="lastName" value={userData.lastName} onChange={handleChange} />
                <TextField label="email" variant="outlined"
                    type='email' name="mail" value={userData.mail} onChange={handleChange} />
                <TextField label="password" variant="outlined"
                    type='password' name="password" value={userData.password} onChange={handleChange} />
                <TextField label="address" variant="outlined"
                    type='text' name="address" value={userData.address} onChange={handleChange} />
                <TextField label="phone" variant="outlined"
                    type='text' name="phone" value={userData.phone} onChange={handleChange} />
                <Button type="submit" startIcon={<SendIcon />} sx={{ color: "black", borderColor: "black" }}>save</Button>
            </Box>
    </>)
}
export default Form;
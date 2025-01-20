import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "./UserReducer";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import { IsLogin, URL } from "./userDetails";
import Modal from "@mui/material/Modal";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Login = () => {
    const [, setIsLogin] = useContext(IsLogin);
    const { user, userDispatch } = useContext(UserContext);
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false);
    const [click, setClick] = useState("")
    const handleOpenLogin = () => { setClick("login"); setOpen(true); }
    const handleOpenRegister = () => { setClick("register"); setOpen(true); }
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${URL}/${click}`,
                {
                    email: emailRef.current?.value,
                    password: passRef.current?.value
                })

            userDispatch({
                type: 'LOGIN_USER',
                data: {
                    id: res.data.user.id,
                    mail: res.data.user.email,
                    password: res.data.user.password
                }
            })
            setIsLogin(true);
            handleClose();

        } catch (e: any) {
            if (e.response?.status === 403) alert('Invalid credentials');
            if (e.response?.status === 422) alert('User already signed up');
        }
    }

    return (<>
        <Button onClick={handleOpenRegister} sx={{ color: "black" }} startIcon={<AppRegistrationIcon />}>sign up</Button>
        <span style={{ color: "black", margin: "1vh", fontSize: "3vh", fontWeight: 'bold' }}>|</span>
        <Button onClick={handleOpenLogin} sx={{ color: "black" }} startIcon={<LoginIcon />}>sign in</Button>
        <Modal open={open} onClose={handleClose} >
            <Box
                component={Paper}
                sx={{
                    border: '1px solid black',
                    position: 'fixed',
                    top: '20vh',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    boxShadow: 24,
                    borderRadius: 2,
                    '& > :not(style)': { m: 2, width: '30ch' }
                }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 ,textAlign:'center',fontWeight:'bold'}}>
                    {click === "login" ? "Login" : "Register"}
                </Typography>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    sx={{ width: '100%' }}>
                    <TextField label="Email" variant="outlined"
                        type='email' name="email" inputRef={emailRef} fullWidth sx={{ mb: 2 }}/>
                    <TextField label="Password" variant="outlined"
                        type='password' name="password" inputRef={passRef} fullWidth sx={{ mb: 2 }}/>
                    <Button type="submit" startIcon={<SendIcon />} variant="contained" sx={{ width: '100%' }}>Send</Button>
                </Box>
            </Box>
        </Modal>
    </>)
}
export default Login;
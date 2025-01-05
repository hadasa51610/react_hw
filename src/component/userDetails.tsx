import { useContext, useState } from "react"
import UpdateUser from "./updateUser"
import { UserContext } from "./userReducer"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Login from "./login";
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
import EditIcon from '@mui/icons-material/Edit';

const UserDetails = () => {
    const { user } = useContext(UserContext)

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }
    function stringAvatar(nameStr: string) {
        return {
            sx: {
                bgcolor: stringToColor(nameStr),
            },
            children: `${nameStr.split(' ')[0][0]}${nameStr.split(' ')[1][0]}`,
        };
    }
    const nameStr = user.firstName + ' ' + user.lastName;
    const [isUpdate, setIsUpdate] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [showLogin, setShowLogin] = useState(true)
    return (<>
        <AppBar position="fixed" sx={{ backgroundColor: 'rgba(222, 197, 197, 0.52)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0.01 }}>
                        {user.firstName == '' && user.lastName == '' && <Avatar src="/broken-image.jpg" />}
                        <Tooltip title={nameStr}>
                            {(user.firstName != '' || user.lastName != '') ? <Avatar {...stringAvatar(nameStr)} /> : <></>}
                        </Tooltip>
                    </Box>

                    {/* log in button */}
                    {!isLogin && <Box sx={{ flexGrow: 0.01 }}>
                        <Button sx={{ color: "black", borderColor: "black" }} variant="outlined" startIcon={<LoginIcon />}
                            onClick={() => { setShowLogin(false) }}>Log in
                        </Button>
                        {!isLogin && !showLogin && <Login setIsLogin={setIsLogin} />}
                    </Box>}

                    {/* show user */}
                    {isLogin && !showLogin && <Box sx={{ flexGrow: 0.01 }}>
                        <span style={{ color: 'black', fontSize: "17px" }}>hello {user.firstName} {user.lastName}</span>
                    </Box>}
                    {/* update button */}
                    {isLogin && !showLogin && <Box sx={{ flexGrow: 0.01 }}>
                        <Button sx={{ color: "black", borderColor: "black" }} variant="outlined" startIcon={<EditIcon />}
                            onClick={() => setIsUpdate(true)}>edit</Button>
                        {isLogin && !showLogin && isUpdate && <UpdateUser setIsUpdate={setIsUpdate} />}
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    </>)
}

export default UserDetails
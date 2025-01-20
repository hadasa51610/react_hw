import { createContext, Dispatch, useState ,useReducer} from "react";
import UpdateUser from "./UpdateUser";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from "react-router";
import NavBar from "./NavBar";
import userReducer, { UserContext, UserType } from "./UserReducer";
import MyAvatar from "./Avatar&Name";
import Login from "./Login";

export const IsLogin = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => null]);
export const URL = 'http://localhost:3000/api/user';

const UserDetails = () => {
    const [isLogin, setIsLogin] = useState(false);
    const initialUser: UserType = { id: 0, firstName: '', lastName: '', mail: '', password: '', address: '', phone: '' };
    const [user, userDispatch] = useReducer(userReducer, initialUser);

    return (
        <IsLogin.Provider value={[isLogin, setIsLogin]}>
            <UserContext.Provider value={{ user, userDispatch }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '200vh' }}>
                    <AppBar position="fixed" sx={{ backgroundColor: 'rgba(222, 197, 197, 0.52)', boxShadow: 'none' ,height:"10vh"}}>
                        <Toolbar disableGutters>
                            <Box>
                                {(user.firstName === '' && user.lastName === '') ? <MyAvatar nameString={''} /> :
                                    <MyAvatar nameString={user.firstName + ' ' + user.lastName} />}
                            </Box>
                            <Box>
                                {!isLogin && <Login />}
                                {isLogin && <UpdateUser />}
                            </Box>
                            <Box sx={{ position: 'absolute', right: 0 }}>
                                <NavBar />
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 10 }}>
                        <Outlet />
                    </Box>
                </Box>
            </UserContext.Provider>
        </IsLogin.Provider>
    );
}

export default UserDetails;
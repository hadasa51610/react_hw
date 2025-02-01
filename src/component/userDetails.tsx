import { createContext, Dispatch, useState, useReducer } from "react";
import UpdateUser from "./UpdateUser";
import { AppBar, Box, Toolbar } from '@mui/material';
import { Outlet } from "react-router";
import NavBar from "./NavBar";
import userReducer, { UserContext, UserType } from "./UserReducer";
import MyAvatar from "./Avatar&Name";
import Login from "./Login";
import AddRecipe from "./AddRecipe";

export const IsLogin = createContext<[boolean, Dispatch<React.SetStateAction<boolean>>]>([false, () => null]);
export const URL = 'http://localhost:3000/api/user';

const UserDetails = () => {
    const [isLogin, setIsLogin] = useState(false);
    const initialUser: UserType = { id: 0, firstName: '', lastName: '', email: '', password: '', address: '', phone: '' };
    const [user, userDispatch] = useReducer(userReducer, initialUser);

    return (
        <IsLogin value={[isLogin, setIsLogin]}>
            <UserContext value={{ user, userDispatch }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '200vh' }}>
                    <AppBar position="fixed" sx={{ backgroundColor: 'rgba(222, 197, 197, 0.52)', boxShadow: 'none', height: "10vh" }}>
                        <Toolbar disableGutters>
                            <Box margin={"15px"}>
                                {(user.firstName === '' && user.lastName === '') ? <MyAvatar nameString={''} /> :
                                    <MyAvatar nameString={user.firstName + ' ' + user.lastName} />}
                            </Box>
                            <Box>
                                {!isLogin && <Login />}
                                {isLogin && <UpdateUser /> }
                                {isLogin && <AddRecipe />}
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
            </UserContext>
        </IsLogin>
    );
}

export default UserDetails;
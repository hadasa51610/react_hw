import { useReducer } from "react";
import userReducer, { UserContext } from "./userReducer";
import UserDetails from "./userDetails";

const User = () => {
    const initialUser = { firstName: '', lastName: '', mail: '', password: '', address: '', phone: '' };
    const [user, userDispatch] = useReducer(userReducer, initialUser);

    return (<>
        <UserContext.Provider value={{ user, userDispatch }}>
            <UserDetails />
        </UserContext.Provider>
    </>)
}

export default User;
import { FormEvent, useContext } from "react";
import { UserContext, UserType } from "./userReducer";
import Form from "./Form";

const Login = ({ setIsLogin }: { setIsLogin: Function }) => {
    const { userDispatch } = useContext(UserContext);
    
    const handleSubmit = (e: FormEvent, user1: UserType) => {
        e.preventDefault();
        userDispatch({
            type: 'CREATE_USER',
            data: user1
        })
        setIsLogin(true);
    }
    return (<>
        <Form handleSubmit={handleSubmit}></Form>
    </>)
}
export default Login;
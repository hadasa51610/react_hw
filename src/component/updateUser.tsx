import { FormEvent, useContext } from "react";
import { UserContext, UserType } from "./userReducer";
import Form from "./Form";

const UpdateUser = ({ setIsUpdate }: { setIsUpdate: Function }) => {
    const { userDispatch } = useContext(UserContext);

    const handleSubmit = (e: FormEvent, user1: UserType) => {
        e.preventDefault();
        userDispatch({
            type: 'UPDATE_USER',
            data: user1
        })
        setIsUpdate(false);
    }

    return (<>
        <Form handleSubmit={handleSubmit}></Form>
    </>)
}
export default UpdateUser;
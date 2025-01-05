import { createContext, Dispatch } from "react"

export type UserType = {
    firstName: string,
    lastName: string,
    mail: string,
    password: string,
    address: string,
    phone: string
}
type Action = {
    type: 'CREATE_USER',
    data: UserType
} | {
    type: 'UPDATE_USER',
    data: Partial<UserType>
} | {
    type: 'DELETE_USER' | 'GET_USER'
}

export const UserContext = createContext<{
    user: UserType;
    userDispatch: Dispatch<Action>;
}>({
    user: { firstName: '', lastName: '', mail: '', password: '', address: '', phone: '' },
    userDispatch: () => null
})

export default (state: UserType, action: Action): UserType => {
    switch (action.type) {
        case 'CREATE_USER':
            if (action.data.firstName != state.firstName || action.data.lastName != state.lastName)
                return action.data;
            else
                return state;
        case 'UPDATE_USER':
            return { ...state, ...action.data };
        default:
             return state;
    }
}
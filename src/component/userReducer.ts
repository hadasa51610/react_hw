import { createContext, Dispatch } from "react"

export type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phone: string
}

export type PartialUserType = {
    id: number,
    email: string,
    password: string
}

type Action = {
    type: 'LOGIN_USER',
    data: PartialUserType
} | {
    type: 'UPDATE_USER',
    data: Partial<UserType>,
} | {
    type: 'DELETE_USER' | 'GET_USER' 
}

export const UserContext = createContext<{
    user: Partial<UserType>;
    userDispatch: Dispatch<Action>;
}>({
    user: { id: 0, firstName: '', lastName: '', email: '', password: '', address: '', phone: ''},
    userDispatch: () => null
})

export default (state: UserType, action: Action): UserType => {
    switch (action.type) {
        case 'LOGIN_USER':
            return { ...state, ...action.data};
        case 'UPDATE_USER':
            return { ...state, ...action.data};
        default:
            return state;
    }
}
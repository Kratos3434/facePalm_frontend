import { atom } from "jotai";

interface UserProps {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string,
    gender: string
}
export const userAtom = atom<UserProps>({firstName: "", lastName: "", email: "", password: "", password2: "", gender: ""});
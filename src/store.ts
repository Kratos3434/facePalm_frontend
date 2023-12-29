import { atom } from "jotai";
import { UserProps } from "./type";

export const userAtom = atom<UserProps>(
    {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        birthday: "",
        createdAt: "",
        updatedAt: "",
        disabledAt: "",
        posts: []
    }
);

export const userProfileAtom = atom<UserProps>(
    {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        birthday: "",
        createdAt: "",
        updatedAt: "",
        disabledAt: "",
        posts: []
    }
);

export const AddPostModalAtom = atom(false);
export const AddPostProfileAtom = atom(false);
export const ChangeProfilePicModalAtom = atom(false);
export const ChangeCoverPicModalAtom = atom(false);
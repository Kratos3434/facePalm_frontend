import { atom } from "jotai";
import { PostProps, UserProps } from "./type";

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
        posts: [],
        likes: []
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
        posts: [],
        likes: []
    }
);

export const AddPostModalAtom = atom(false);
export const AddPostProfileAtom = atom(false);
export const ChangeProfilePicModalAtom = atom(false);
export const ChangeCoverPicModalAtom = atom(false);

interface ViewPostProps {
    status: boolean,
    post: PostProps | null,
    userId?: number
}

export const ViewPostAtom = atom<ViewPostProps>({status: false, post: null, userId: 0});
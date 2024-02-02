import { atom } from "jotai";
import { LikeProps, PostProps, UserProps } from "./type";

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
        likes: [],
        friendRequests: [],
        friendRequestSent: [],
        notifications: [],
        notificationsSent: []
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
        likes: [],
        friendRequests: [],
        friendRequestSent: [],
        notifications: [],
        notificationsSent: []
    }
);

export const AddPostModalAtom = atom(false);
export const AddPostProfileAtom = atom(false);
export const ChangeProfilePicModalAtom = atom(false);
export const ChangeCoverPicModalAtom = atom(false);

interface ViewPostProps {
    status: boolean,
    post: PostProps | null,
    userId?: number,
    type?: string
}

interface ViewLikesProps {
    status: boolean,
    likes: LikeProps[] | null,
    userId?: number,
    type?: string
}

export const ViewPostAtom = atom<ViewPostProps>({status: false, post: null, userId: 0, type: ""});
export const ViewLikesAtom = atom<ViewLikesProps>({ status: false, likes: null, userId: 0, type: ""});

interface AddPostProps {
    status: boolean,
    type?: string
}

export const AddPostAtom = atom<AddPostProps>({ status: false, type: "" });
export const AddStatusAtom = atom<AddPostProps>({ status: false, type: "" });
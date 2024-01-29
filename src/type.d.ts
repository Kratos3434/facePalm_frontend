export interface UserProps {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
    gender: string,
    birthday?: string,
    profilePicture?: string,
    coverPicture?: string,
    createdAt: string,
    updatedAt?: string,
    disabledAt?: string,
    posts: PostProps[],
    likes: LikeProps[],
    bio?: string,
    addressFrom?: string,
    friendRequests: FriendRequestProps[],
    friendRequestSent: FriendRequestProps[],
    notifications: NotificationProps[],
    notificationsSent: NotificationProps[]
}

export interface CommentProps {
    postId: number,
    comment: string,
    author: UserProps,
    post: PostProps,
    createdAt: string,
    updatedAt?: string
}
export interface PostProps {
    id: number,
    featureImage: string,
    description: string,
    likes: LikeProps[],
    shares: number,
    author: UserProps,
    comments: CommentProps[],
    createdAt: string,
    updatedAt?: string
}

export interface LikeProps {
    id: number,
    userId: number,
    post: PostProps,
    user: UserProps,
    createdAt: string,
    updatedAt?: string
}

export interface FriendRequestProps {
    id: number,
    user: UserProps,
    userId: number,
    requester: UserProps,
    requesterId: number,
    status: string,
    createdAt: string,
    updatedAt: string
}

export interface NotificationProps {
    id: number,
    description: string,
    recipient: UserProps,
    recipientId: number,
    sender: UserProps,
    senderId: number,
    type: String,
    isRead: boolean,
    createdAt: string,
    updatedAt: string
}
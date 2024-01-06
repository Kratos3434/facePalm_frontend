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
    likes: LikeProps[]
    bio?: string,
    addressFrom?: string
}

export interface PostProps {
    featureImage: string,
    description: string,
    likes: LikeProps[],
    shares: number,
    author: UserProps
}

export interface LikeProps {
    id: number,
    post: PostProps,
    user: UserProps,
    createdAt: string,
    updatedAt?: string
}
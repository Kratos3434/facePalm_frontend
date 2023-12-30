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
    posts: PostProps[]
    bio?: string,
    addressFrom?: string
}

export interface PostProps {
    featureImage: string,
    description: string,
    likes: number,
    shares: number,
    author: UserProps
}
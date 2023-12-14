export interface UserProps {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone?: string,
    gender: string,
    birthday?: string,
    createdAt: string,
    updatedAt?: string,
    disabledAt?: string
}

export interface PostProps {
    photo: string,
    description: string,
    likes: number,
    shares: number,
    author: UserProps
}
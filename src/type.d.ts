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
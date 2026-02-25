export interface AddUserResponse{
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        __v: number
    },
    token: string
}

export type UserPayload = {
    firstName: string
    lastName: string
    email: string
    password: string
}

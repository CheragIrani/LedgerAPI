export type UserPayload = {
    firstName: string
    lastName: string
    email: string
    password: string

}

export async function userDetails(overrides: Partial<UserPayload> = {}):Promise<UserPayload> {
    const defaultUserDetails = {
        firstName: 'Test',
        lastName: 'User',
        email: `test4523${Date.now()}@fake.com`,
        password: 'myPassword'
    }

    const userDetails = {
        ... defaultUserDetails,
        ... overrides
    }

    return userDetails
}

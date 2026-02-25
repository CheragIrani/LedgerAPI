import { UserPayload } from "../userData"

export async function userDetails(overrides: Partial<UserPayload> = {}):Promise<UserPayload> {
    const defaultUserDetails = {
        firstName: 'Test',
        lastName: 'User',
        email: `test${Date.now()}@fake.com`,
        password: 'myPassword'
    }

    const userDetails = {
        ... defaultUserDetails,
        ... overrides
    }

    return userDetails
}
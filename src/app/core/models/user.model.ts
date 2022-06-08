import { Event } from "./event.model";

export interface User {
    userId?: string,
    username: string | undefined,
    access_token?: string,
    refresh_token?: string,
    studentId?: number,
    email?: string,
    firstName?: string,
    lastName?: string,
    profilePicture?: string,
    language?: string,
    events?: Event[]
}
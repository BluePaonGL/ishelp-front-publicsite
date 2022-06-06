export interface User {
    userId?: string,
    username: string | undefined,
    access_token?: string,
    refresh_token?: string,
    student_id?: number,
    email?: string,
    firstName?: string,
    lastName?: string,
    profilePicture?: string,
    language?: string
}
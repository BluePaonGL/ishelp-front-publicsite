export interface User {
    id: string | undefined,
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
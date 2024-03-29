import { User } from "./user.model"

export interface ApplicationPaging {
    content?: Application[],
    totalElements?: number,
    totalPages?: number,
    size?: number
}

export interface Application {
    applicationId?: string,
    object?: string,
    motivations?: string,
    resume?: string,
    contact?: string,
    status?: string,
    user?: User
}
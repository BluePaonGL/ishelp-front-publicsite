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
    contact?: string
}
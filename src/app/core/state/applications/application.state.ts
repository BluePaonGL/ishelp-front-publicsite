import { Application } from "../../models/application.model";

export interface ApplicationsState {
    applications: Application[];
}

export const initialState: ApplicationsState = {
    applications: []
}
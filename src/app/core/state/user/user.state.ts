import { ApplicationInitStatus } from "@angular/core";
import { Application } from "../../models/application.model";
import { User } from "../../models/user.model";

export interface UserState {
    user: User;
    application: Application;
}

export const initialState: UserState = {
    user: {} as User,
    application: {}
}
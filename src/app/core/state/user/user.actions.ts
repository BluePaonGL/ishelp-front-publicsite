import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const appLoaded = createAction("[App] App Loaded");

export const fetchUserSuccess = createAction(
    "[UserService API] Fetch User Profile Success",
    props<{user: User}>()
);

export const fetchUserFailed = createAction(
    "[UserService API] Fetch User Profile Failed",
    props<{error: any}>()
);

export const fetchUserOnLogin = createAction(
    "[Login Page] Fetch User Data on Successful Login",
    props<{user : User}>()
);


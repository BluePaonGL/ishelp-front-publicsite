import { MatDialog } from "@angular/material/dialog";
import { createAction, props } from "@ngrx/store";
import { Application, ApplicationPaging } from "../../models/application.model";
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

export const registerUser = createAction(
    "[Register Page] Register User",
    props<{user: User}>()
);

export const registerUserSuccess = createAction(
    "[UserService API] Register User Success",
    props<{user: User}>()
)

export const pageApplications = createAction(
    "[Application Page] Page Applications",
    props<{userId: string}>()
)

export const pageApplicationsSuccess = createAction(
    "[UserService API] Page Applications Success",
    props<{applications: ApplicationPaging}>()
)

export const submitApplication = createAction(
    "[Apply Page] Submit Application",
    props<{application: Application}>()
)

export const submitApplicationSuccess = createAction(
    "[UserService API] Submit Application Success",
    props<{application: Application}>()
)
import { MatDialog } from "@angular/material/dialog";
import { createAction, props } from "@ngrx/store";
import { Application, ApplicationPaging } from "../../models/application.model";
import { User } from "../../models/user.model";
import { Event } from "../../models/event.model";

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

export const fetchEventsSuccess = createAction(
    "[EventService API] Fetch Event Data Success",
    props<{events: Event[]}>()
);

export const fetchEventsFailed = createAction(
    "[EventService API] Fetch Event Data Failed",
    props<{error: any}>()
);

export const fetchEventsOnLogin = createAction(
    "[Login Page] Fetch Events Data on Successful Login",
    props<{userId : string}>()
);

export const addUserEvent = createAction(
    "[EventSignup Page] Signup to event",
    props<{event : Event}>()
);

export const deleteUserEvent = createAction(
    "[EventSignout Page] Signout to event",
    props<{event : Event}>()
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

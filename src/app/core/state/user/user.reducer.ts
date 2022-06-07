import { Action, createReducer, on } from "@ngrx/store";
import { initialState, UserState } from "./user.state";
import * as UserActions from "./user.actions";

const userReducer = createReducer(
    initialState,
    on(UserActions.fetchUserSuccess, (state, {user}) => ({
        ...state,
        user: user
    })),
    on(UserActions.fetchUserOnLogin, (state, {user}) => ({
        ...state,
        user: user
    })),
    on(UserActions.registerUserSuccess, (state, {user}) => ({
        ...state,
        user
    })),
    on(UserActions.submitApplicationSuccess, (state, {application}) => {
        return {...state,
        application: application}
    }),
    on(UserActions.pageApplicationsSuccess, (state, {applications}) => {
        console.log(applications);
        if(applications.content !== undefined) {
            return {
                ...state,
                application: applications.content[applications.content.length - 1]
            }
        } else {
            return {
                ...state
            }
        }
        
    })
);

export function reducer(state: UserState | undefined, action: Action) {
    return userReducer(state, action);
} 
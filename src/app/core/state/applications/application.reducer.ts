import { Action, createReducer, on, USER_PROVIDED_META_REDUCERS } from "@ngrx/store";
import { ApplicationsState, initialState } from "./application.state";
import * as ApplicationActions from "./application.actions";
import { Application } from "../../models/application.model";

const applicationReducer = createReducer(
    initialState,
    on(ApplicationActions.fetchApplicationsInReviewSuccess, (state, {applications}) => {
        let applicationList: Application[] = [];
        if(applications.content !== undefined) {
            applicationList = [...applications.content];
        }
        
        return { ...state,
        applications: applicationList}
    })
)

export function reducer(state: ApplicationsState | undefined, action: Action) {
    return applicationReducer(state, action);
}
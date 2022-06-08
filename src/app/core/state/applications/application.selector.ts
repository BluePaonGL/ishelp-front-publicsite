import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ApplicationsState } from "./application.state";

export const selectApplications = createFeatureSelector<ApplicationsState>("applications");

export const selectApplicationItems = createSelector(
    selectApplications,
    (state: ApplicationsState) => {
        return state.applications
    }
)

export const selectApplicationById = (props: {id: string | null}) =>
    createSelector(selectApplicationItems, (applications) =>
        applications.find((application) => application.applicationId === props.id)
)
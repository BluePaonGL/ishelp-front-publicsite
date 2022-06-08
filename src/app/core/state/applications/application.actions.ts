import { createAction, props } from "@ngrx/store";
import { ApplicationPaging } from "../../models/application.model";

export const fetchApplicationsInReviewSuccess = createAction(
    "[Application Service API] Fetch Application In Review Success",
    props<{applications: ApplicationPaging}>()
)

export const changeApplicationStatus = createAction(
    "[Candidate Choix Component] Change Application Status",
    props<{status: string, applicationId: string}>()
)
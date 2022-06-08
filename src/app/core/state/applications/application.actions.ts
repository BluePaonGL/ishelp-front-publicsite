import { createAction, props } from "@ngrx/store";
import { ApplicationPaging } from "../../models/application.model";

export const fetchApplicationsInReviewSuccess = createAction(
    "[Application Service API] Fetch Application In Review Success",
    props<{applications: ApplicationPaging}>()
)
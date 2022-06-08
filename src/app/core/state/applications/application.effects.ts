import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { ApplicationsService } from "../../services/applications.service";
import * as UserActions from "../user/user.actions";
import * as ApplicationActions from "./application.actions";

@Injectable()
export class ApplicationsEffects {
    constructor(private actions$: Actions<any>, private applicationService: ApplicationsService) {}

    fetchApplicationsInReview = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.appLoaded),
            switchMap(() => 
                this.applicationService.fetchApplicationsInReview().pipe(
                    map((applications) => ApplicationActions.fetchApplicationsInReviewSuccess({applications}))
                )
            )
        )
    )
}
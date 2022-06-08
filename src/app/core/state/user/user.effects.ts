import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { EventDialogComponent } from "src/app/event/pages/back/event-dialog.component";
import { UsersService } from "src/app/utility/users.service";
import * as UserActions from "./user.actions";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions<any>, private userService: UsersService) {}

    fetchUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.fetchUserOnLogin),
            switchMap((action) => 
                this.userService.getUser(action.user.userId).pipe(
                    map((user) => {
                        user.profilePicture = user.profilePicture !== null ? user.profilePicture :'../../assets/logo-whiteback-round.png';
                        return UserActions.fetchUserSuccess({user})
                    }),        
                    catchError((error) => of(UserActions.fetchUserFailed({error: error})))
                )
            )
        )
    )

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.registerUser),
            switchMap((action) =>
                this.userService.registerUser(action.user).pipe(
                    map((user) => {
                        return UserActions.registerUserSuccess({user});
                    })
                )
            )
        )
    )

    pageApplication$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.fetchUserSuccess),
            switchMap((action) => 
                this.userService.pageApplications(action.user.userId).pipe(
                    tap((applications) => console.log(applications)),
                    map((applications) => UserActions.pageApplicationsSuccess({applications}))
                )
            )
        )
    )

    submitApplication$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.submitApplication),
            switchMap((action) =>
                this.userService.submitApplication(action.application).pipe(
                    map((application) => UserActions.submitApplicationSuccess({application}))
                )
            )
        )
    )
}
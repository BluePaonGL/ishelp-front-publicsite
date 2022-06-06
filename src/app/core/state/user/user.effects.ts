import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { UsersService } from "src/app/utility/users.service";
import * as UserActions from "./user.actions";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions<any>, private userService: UsersService) {}

    fetchUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.appLoaded.type, UserActions.fetchUserOnLogin),
            switchMap((action) => 
                this.userService.getUser(action.user.id).pipe(
                    tap((user) => console.log(user)),
                    map((user) => UserActions.fetchUserSuccess({user})),
                    catchError((error) => of(UserActions.fetchUserFailed({error: error})))
                )
            )
        )
    )
}
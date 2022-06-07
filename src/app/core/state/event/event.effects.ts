import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { EventsService } from "src/app/event/events.service";
import { UsersService } from "src/app/utility/users.service";
import * as UserActions from "../user/user.actions"
import * as EventActions from "./event.actions"

@Injectable()
export class EventsEffects {
    constructor(private actions$: Actions<any>, private eventService: EventsService,
        private userService: UsersService) {}
    
    fetchEvents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.fetchUserSuccess),
            switchMap(() =>
                this.eventService.getAllEvents().pipe(
                    map((events) => {
                        return EventActions.fetchEventsSuccess({events: events});
                    }),
                    catchError((error) => of(EventActions.fetchEventsFailed({error: error})))
                ),
            )
        )
    )

    fetchEventParticipant = createEffect(() => 
        this.actions$.pipe(
            ofType(EventActions.fetchEventParticipant, EventActions.setCurrentEvent),
            switchMap((action) =>
                this.userService.getUserList(action.event.participantsId).pipe(
                    map((users) => {
                        return EventActions.fetchEventParticipantSuccess({event: action.event, users});
                    })
                )
            )
        ))
    
    addEventParticipant = createEffect(() => 
        this.actions$.pipe(
            ofType(EventActions.addEventParticipant),
            switchMap((action) =>
                this.eventService.addParticipant(action.userId, action.eventId).pipe(
                    map(() => {
                        return EventActions.addEventParticipantSuccess();
                    }),
                )
            )
        )
    )

    deleteEventParticipant = createEffect(() => 
        this.actions$.pipe(
            ofType(EventActions.deleteEventParticipant),
            switchMap((action) => 
                this.eventService.deleteParticipant(action.userId, action.eventId).pipe(
                    map(() => EventActions.deleteEventParticipantSuccess())
                )
            )
        )
    )

    /* fetchEventParticipant = createEffect(() =>
        this.actions$.pipe(
            ofType(EventActions.fetchEventsSuccess),
            exhaustMap((action) => 
                merge(
                    ...action.events.map(event =>
                        this.userService.getUserList(event.participantsId).pipe(
                            tap((users) => console.log(users, event)),
                            map(users => {
                                return EventActions.fetchEventParticipantSuccess({event, users});
                            })
                        )
                    )
                )
            )
        )
    ) */
}
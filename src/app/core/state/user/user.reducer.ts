import { Action, createReducer, on } from "@ngrx/store";
import { initialState, UserState } from "./user.state";
import * as UserActions from "./user.actions";
import { Event } from "../../models/event.model";

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
    on(UserActions.fetchEventsSuccess, (state, {events}) => {
        let updatedEvents = {...state.user}
        updatedEvents.events = events
        return {
            ...state,
            user: updatedEvents
        }
    }),
    on(UserActions.addUserEvent, (state, {event}) => {
        const userUpdate = {...state.user}
        let addedEvents: Event[] = []
        if(userUpdate.events !== undefined ){
            addedEvents = [...userUpdate.events];
        }
        addedEvents.push(event)
        let sortedEvents = addedEvents?.sort((objA, objB) => {
            if(objA.date !== undefined && objB.date !== undefined) {
                return new Date(objA.date).getTime() - new Date(objB.date).getTime()
            }
            return 0;
        });
        userUpdate.events = sortedEvents
        return {
            ...state,
            user: userUpdate
        }
    }),
    
    on(UserActions.deleteUserEvent, (state, {event}) => {
        const user = {...state.user}
        let deletedEvents: Event[] = []
        if(user.events !== undefined ){
            deletedEvents = [...user.events];
        }
        let eventIndex = deletedEvents.findIndex(
            (eventFind) => eventFind.eventId === event.eventId
        )
        deletedEvents.splice(eventIndex, 1);
        user.events = deletedEvents
        return {
            ...state,
            user: user
        }
    }),
    
    on(UserActions.registerUserSuccess, (state, {user}) => ({
        ...state,
        user
    })),

    on(UserActions.submitApplicationSuccess, (state, {application}) => {
        return {...state,
        application: application}
    }),

    on(UserActions.pageApplicationsSuccess, (state, {applications}) => {
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
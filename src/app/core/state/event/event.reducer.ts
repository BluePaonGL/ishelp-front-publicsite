import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { initialState } from "../event";
import * as EventActions from "./event.actions";
import { EventsEffects } from "./event.effects";
import { EventsState } from "./event.state";

const eventReducer = createReducer(
    initialState,
    on(EventActions.fetchEventsSuccess, (state, { events }) => ({
        ...state,
        events: events
    })),
    on(EventActions.addEventParticipant, (state, {userId, eventId}) => {
        let eventIndex = state.events.findIndex(
            (event) => event.eventId === eventId
        )
        const updatedMenuItems = [...state.events];
        if(userId !== undefined) {
            const participantId: string[] = updatedMenuItems[eventIndex].participantsId || [];
            let updatedParticipantList = [...participantId];
            if(updatedParticipantList !== undefined) {
                updatedParticipantList.push(userId);
            }
            updatedMenuItems[eventIndex] = {
                ...updatedMenuItems[eventIndex],
                participantsId: updatedParticipantList
            };
        }

        return {
            ...state,
            events: updatedMenuItems
        }
    }),
    on(EventActions.deleteEventParticipant, (state, {userId, eventId}) => {
        let eventIndex = state.events.findIndex(
            (event) => event.eventId === eventId
        )
        const updatedEvents = [...state.events];
        if(userId !== undefined) {
            const participantId: string[] = updatedEvents[eventIndex].participantsId || [];
            let updatedParticipantList = [...participantId];
            let participantIndex = updatedParticipantList.findIndex(
                (participant) => participant === userId
            );
            updatedParticipantList.splice(participantIndex, 1);
            updatedEvents[eventIndex] = {
                ...updatedEvents[eventIndex],
                participantsId: updatedParticipantList
            };
        }


        return {
            ...state,
            events: updatedEvents
        }
    }),
    on(EventActions.fetchEventParticipantSuccess, (state, {event, users}) => {
        let updatedEvent = {...event};
        updatedEvent.participants = users;
        updatedEvent.startingCampus = "NDC";
        let updatedState = {
            ...state
        };
        updatedState.event = updatedEvent;
        return {
            ...updatedState
        }
    }),

    on(EventActions.setCurrentEvent, (state, {event}) => {
        const currentEvent = {...event};
        return {
            ...state,
            event: currentEvent
        }
    }),

    on(EventActions.addEvent, (state, {event}) => {
        let events = [...state.events]
        events.push(event)
        let sortedEvents = events.sort((objA, objB) => {
            if(objA.date !== undefined && objB.date !== undefined) {
                return new Date(objA.date).getTime() - new Date(objB.date).getTime()
            }
            return 0;
        });
        return {
            ...state,
            events: sortedEvents
        }
    }),

    on(EventActions.deleteEvent, (state, {eventId}) => {
        let events = [...state.events]
        let eventIndex = state.events.findIndex(
            (event) => event.eventId === eventId
        )
        events.splice(eventIndex, 1)
        return {
            ...state,
            events: events
        }
    })
)

export function reducer(state: EventsState | undefined, action: Action) {
    return eventReducer(state, action);
}
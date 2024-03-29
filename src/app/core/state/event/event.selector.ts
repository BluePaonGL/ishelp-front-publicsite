import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventsState } from "./event.state";

export const selectEvents = createFeatureSelector<EventsState>("events");

export const selectEventItems = createSelector(
    selectEvents,
    (state: EventsState) => {
        return state.events
    }
)

export const selectCurrentEvent = createSelector(
    selectEvents,
    (state: EventsState) => {
        return state.event
    }
)

export const selectEvent = (id: string) => createSelector(
    selectEvents,
    (state: EventsState) => {
        let eventIndex = state.events.findIndex(
            (event) => event.eventId === id
        )
        return state.events[eventIndex]
    }
)

export const selectEventItem = (props: {id: string}) => 
    createSelector(selectEventItems, (eventItems) =>
        eventItems.find((eventItem) => eventItem.eventId === props.id)
);

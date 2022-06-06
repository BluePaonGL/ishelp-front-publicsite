import { Event } from "../../models/event.model";

export interface EventsState {
    events: Event[];
    event: Event;
}

export const initialState: EventsState = {
    events: [],
    event: {}
}
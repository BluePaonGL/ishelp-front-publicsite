import { createAction, props } from "@ngrx/store";
import { Event } from "../../models/event.model";
import { User } from "../../models/user.model";

export const fetchEventsSuccess = createAction(
    "[EventService API] Fetch Event List Success",
    props<{events: Event[]}>()
);

export const fetchEventsFailed = createAction(
    "[EventService API] Fetch Event List Failed",
    props<{error: any}>()
);

export const fetchEvents = createAction(
    "[Events Page] Fetch Events on Event Page Load",
    props<{events: Event[]}>()
);

export const addEventSuccess = createAction(
    "[EventService API] Add Event Success",
    props<{event: Event}>()
);

export const addEventFailed = createAction(
    "[EventService API] Add Event Failed",
    props<{error: any}>()
);

export const addEvent = createAction(
    "[ManageEvent Page] Add Event Form Submitted",
    props<{event: Event}>()
);

export const deleteEventSuccess = createAction(
    "[EventService API] Delete Event Success",
    props<{eventId: string}>()
);

export const deleteEventFailed = createAction(
    "[EventService API] Delete Event Failed",
    props<{error: any}>()
);

export const deleteEvent = createAction(
    "[ManageEvent Page] Delete Event Initiated",
    props<{eventId: string}>()
);

export const fetchEventParticipantSuccess = createAction(
    "[EventService API] Fetch Event Participant Success",
    props<{event: Event, users: User[]}>()
);

export const fetchEventParticipant = createAction(
    "[Event Component] Fetch Event Participant Initiated",
    props<{event: Event}>()
)

export const addEventParticipant = createAction(
    "[EventDetails Page] Add Event Participant Initiated",
    props<{userId: string | undefined, eventId: string}>()
);

export const deleteEventParticipant = createAction(
    "[EventDetails Page] Delete Event Participant Initiated",
    props<{userId: string | undefined, eventId: string}>()
)

export const setCurrentEvent = createAction(
    "[Event Component] Set Current Event",
    props<{event: Event}>()
)
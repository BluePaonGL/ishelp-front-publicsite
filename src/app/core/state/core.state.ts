import { ApplicationsState } from "./applications";
import { EventsState } from "./event";
import { UserState } from "./user";

export interface State {
    user: UserState;
    events: EventsState;
    applications: ApplicationsState;
}
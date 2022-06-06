import { EventsState } from "./event";
import { UserState } from "./user";

export interface State {
    user: UserState;
    events: EventsState;
}
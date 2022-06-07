import { User } from "./user.model";

export interface Event {
    eventId?: string,
    name?: string,
    eventType?: string,
    startingCampus?: string,
    startingTime?: string,
    endingTime?: string,
    location?: string,
    date?: string,
    description?: string,
    participantsId?: string[],
    participants?: User[]
}
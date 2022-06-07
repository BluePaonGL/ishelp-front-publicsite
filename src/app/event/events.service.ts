import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {lastValueFrom} from 'rxjs';
import { Event } from "../core/models/event.model"

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	eventUrl: string = 'https://event-service.cubetech-app.fr';
	constructor(private http: HttpClient) {}

	getAllEvents() {
		return this.http.get<Event[]>(this.eventUrl + '/event/events/');
	}

	async getEventById(eventId: string | null): Promise<any> {
		let event = await lastValueFrom(this.http.get(this.eventUrl + '/event/findEvent/' + eventId));
		return event;
	}

	async getEventByUserId(userId: string | undefined): Promise<any> {
		let event = await lastValueFrom(this.http.get(this.eventUrl + '/event/eventsByParticipantId/' + userId));
		return event;
	}

	addParticipant(participantId: any, eventId: any) {
		return this.http.post(this.eventUrl + '/event/addEventParticipant', {participantId, eventId});
	}

	deleteParticipant(participantId: any, eventId: any) {
		return this.http.delete(this.eventUrl + '/event/deleteParticipant/' + eventId + '/' + participantId)
	}

	async addEvent(name: string, eventType: string, startingCampus: string, location: string|null,
		date: string|null, startingTime: string, endingTime: string, description:string): Promise<any> {

		let response = await lastValueFrom(
		this.http.post(this.eventUrl + '/event/addEvent', {name, eventType, startingCampus, location,
			date, startingTime,endingTime, description})
	);
		return response;
	}

	async deleteEvent(eventId: any): Promise<any> {
		let response = await lastValueFrom(
			this.http.delete(this.eventUrl + '/event/deleteEvent/' + eventId)
		);
		return response;
	}
}

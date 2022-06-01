import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {lastValueFrom} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	eventUrl: string = 'https://event-service.cubetech-app.fr';
	constructor(private http: HttpClient) {}

	async getAllEvents(): Promise<any> {
		let events = await lastValueFrom(this.http.get(this.eventUrl + '/event/events/'));
		return events;
	}

	async getEventById(eventId: string | null): Promise<any> {
		let event = await lastValueFrom(this.http.get(this.eventUrl + '/event/findEvent/' + eventId));
		return event;
	}

	async getEventByUserId(userId: string | null): Promise<any> {
		let event = await lastValueFrom(this.http.get(this.eventUrl + '/event/eventsByParticipantId/' + userId));
		return event;
	}

	async addParticipant(participantId: any, eventId: any): Promise<any> {
		let response = await lastValueFrom(
			this.http.post(this.eventUrl + '/event/addEventParticipant', {participantId, eventId})
		);
		return response;
	}

	async deleteParticipant(participantId: any, eventId: any): Promise<any> {
		let response = await lastValueFrom(
			this.http.delete(this.eventUrl + '/event/deleteParticipant/' + eventId + '/' + participantId)
		);
		return response;
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

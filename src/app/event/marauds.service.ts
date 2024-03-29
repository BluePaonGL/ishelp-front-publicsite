import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {lastValueFrom} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MaraudsService {
	eventUrl: string = 'https://event-service.cubetech-app.fr';
	constructor(private http: HttpClient) {}

	async getAllMarauds(): Promise<any> {
		let events = await lastValueFrom(this.http.get(this.eventUrl + '/maraud/all/'));
		return events;
	}

	async getMaraudsByEventId(eventId: string | null): Promise<any> {
		let event = await lastValueFrom(this.http.get(this.eventUrl + '/maraud/byeventid/' + eventId));
		return event;
	}

	async getMaraudsByGroupId(groupId: string | null): Promise<any> {
		let event = await lastValueFrom(this.http.get(this.eventUrl + '/maraud/bygroupid/' + groupId));
		return event;
	}

	async addGroup(eventId: string, groupLabel: string): Promise<any> {
		let response = await lastValueFrom(this.http.post(this.eventUrl + '/maraud/create', {eventId, groupLabel}));
		return response;
	}

	async getAvailableUsers(eventId: string): Promise<any> {
		let response = await lastValueFrom(this.http.get(this.eventUrl + '/event/getParticipantsNotInGroupMarauds/' + eventId));
		return response;
	}

	async deleteMaraudGroup(groupId: string): Promise<any> {
		let event = await lastValueFrom(this.http.delete(this.eventUrl + '/maraud/deletemaraudgroup/' + groupId));
		return event;
	}

	async addMaraudGroupUser(maraudGroupId: string, participantId: string): Promise<any> {
		let event = await lastValueFrom(this.http.post(this.eventUrl + '/maraud/addmaraudgroupmember', {maraudGroupId, participantId} ));
		return event;
	}

	async deleteMaraudGroupUser(groupId: string, userId: string): Promise<any> {
		let event = await lastValueFrom(this.http.delete(this.eventUrl + '/maraud/removeuser/' + groupId + '/' + userId));
		return event;
	}

}

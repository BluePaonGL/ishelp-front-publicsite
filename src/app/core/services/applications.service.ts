import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApplicationPaging } from "../models/application.model";

@Injectable({
    providedIn: 'root',
})
export class ApplicationsService {
    applicationUrl: string = "https://user-service.cubetech-app.fr";
    constructor(private http: HttpClient) {}

    fetchApplicationsInReview() {
        return this.http.get<ApplicationPaging>(this.applicationUrl + "/application?status=IN_REVIEW");
    }
}
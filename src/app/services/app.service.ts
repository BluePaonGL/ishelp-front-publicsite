import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    currentUrl: string = '';
    previousUrl: string = '';

    constructor() { }
}
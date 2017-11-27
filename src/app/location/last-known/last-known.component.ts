import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-last-known',
    templateUrl: './last-known.component.html',
    styleUrls: ['./last-known.component.css']
})
export class LastKnownLocationComponent {

    locations: Location[];
    isRequesting = false;
    resultMessage;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    private getLocations() {
        this.isRequesting = true;
        this.http.get(this.baseUrl + 'api/location/get/last')
            .subscribe(
            (response: Location[]) => {
                this.locations = response;
                this.isRequesting = false;
            },
            (error: HttpErrorResponse) => {
                this.resultMessage += ` (${error.status} - ${error.statusText})`;
                this.isRequesting = false;
            });
    }
}

export class Location {
    longitude: number;
    latitude: number;
    timestamp: number;
    userName: string;
}
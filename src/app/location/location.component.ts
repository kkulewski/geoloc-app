import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css']
  })
export class LocationComponent {

    location: Location;
    locationAvailable: boolean;
    result = 'not run';

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

    locate() {
        if (!navigator.geolocation) {
            this.result = 'navigator API not available';
            return;
        }

        this.result = 'reading location...';
        navigator.geolocation.getCurrentPosition(
            position => this.onLocateSuccess(position),
            error => this.onLocateFailure
        );
    }

    private onLocateSuccess(position: Position) {
        this.result = 'success';

        this.location = new Location();
        this.location.latitude = position.coords.latitude;
        this.location.longitude = position.coords.longitude;
        this.location.timestamp = Date.now();
        const userName = localStorage.getItem('user_name');
        if (userName != null) {
            this.location.userName = userName;
        }

        this.sendLocation();
    }

    private onLocateFailure() {
        this.result = 'failure';
    }

    private sendLocation() {
        this.http.post(this.baseUrl + 'api/location/send', this.location).subscribe(error => console.error(error));
    }
}

export class Location {
    longitude: number;
    latitude: number;
    timestamp: number;
    userName: string;
}

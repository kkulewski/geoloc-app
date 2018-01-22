import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-locate',
    templateUrl: './locate.component.html',
    styleUrls: ['./locate.component.css']
})
export class LocateComponent {

    location: Models.Location;
    isRequesting = false;
    resultMessage = 'not run';

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    locate() {
        if (!navigator.geolocation) {
            this.resultMessage = 'navigator API not available';
            return;
        }

        this.resultMessage = 'reading location...';
        navigator.geolocation.getCurrentPosition(
            position => this.onLocateSuccess(position),
            error => this.onLocateFailure
        );
    }

    private onLocateSuccess(position: Position) {
        this.resultMessage = 'success';
        const username = localStorage.getItem('user_name');
        const userId = localStorage.getItem('user_id');
        this.location = {
            username: username,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            userId: userId
        };
        if (username) {
            this.sendLocation();
        }
    }

    private onLocateFailure() {
        this.resultMessage = 'failure';
    }

    private sendLocation() {
        this.isRequesting = true;
        this.http.post(this.baseUrl + 'api/location/send', this.location)
            .subscribe(
            (response: string) => {
                this.resultMessage += ` (${response})`;
                this.isRequesting = false;
            },
            (error: HttpErrorResponse) => {
                this.resultMessage += ` (${error.status} - ${error.statusText})`;
                this.isRequesting = false;
            });
    }
}

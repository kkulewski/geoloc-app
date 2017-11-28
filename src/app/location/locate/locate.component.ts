import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-locate',
    templateUrl: './locate.component.html',
    styleUrls: ['./locate.component.css']
})
export class LocateComponent {

    location: Location.Models.LocationModel;
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

        this.location.latitude = position.coords.latitude;
        this.location.longitude = position.coords.longitude;
        this.location.timestamp = Date.now();

        const userName = localStorage.getItem('user_name');
        if (userName != null) {
            this.location.userName = userName;
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

import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocationService } from '../../location.service';

@Component({
    selector: 'app-last-known',
    templateUrl: './last-known.component.html',
    styleUrls: ['./last-known.component.css']
})
export class LastKnownLocationComponent {

    locations: Models.Location[];
    isRequesting = false;
    resultMessage;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private locationService: LocationService) { }

    getLocations() {
        this.locationService.getLastLocations().subscribe(locations => this.locations = locations);
    }
}

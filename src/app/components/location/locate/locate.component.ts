import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../../modals/dialog/dialog.component';

@Component({
    selector: 'app-locate',
    templateUrl: './locate.component.html',
    styleUrls: ['./locate.component.css']
})
export class LocateComponent {

    location: Models.Location;
    isLoading = false;

    constructor(private http: HttpClient,
     public dialog: MatDialog) { }

    locate(): void {
        if (!navigator.geolocation) {
            this.openDialog('Your browser doesn\'t allow geolocation');
        }
        navigator.geolocation.getCurrentPosition(
            position => this.onLocateSuccess(position),
            error => this.openDialog('Your browser doesn\'t allow geolocation')
        );
    }

    private onLocateSuccess(position: Position): void {
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
        } else {
            this.openDialog('Your location was recognised');
        }
    }

    private sendLocation(): void {
        this.isLoading = true;
        this.http.post('api/location/send', this.location)
        .subscribe(
            (response: string) => {
                this.isLoading = false;
                this.openDialog('Your location was added to database');
            },
            (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.openDialog(`Error while adding your location to database`);
            });
    }

    private openDialog(message: string): void {
        this.dialog.open(DialogComponent, {
            width: '500px',
            data: { dialogHeader: 'Your location status',
            message: message }
        });
    }
}

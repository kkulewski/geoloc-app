import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import GoogleMapsLoader = require('google-maps');
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';
import { MeetingService } from '../../services/meeting.service';
import { MeetingInfoComponent } from '../modals/meeting-info/meeting-info.component';
import { NotificationService } from '../../services/notification.service';
import { StorageService } from '../../services/storage.service';
import { RelationsService } from '../../services/relations.service';

declare const google: any;

@Component({
    selector: 'app-meetings-map',
    templateUrl: './meetings-map.component.html',
    styleUrls: ['./meetings-map.component.css']
})
export class MeetingsMapComponent implements OnInit {

    constructor(private dialog: MatDialog, private zone: NgZone,
        private meetingService: MeetingService,
        private notificationService: NotificationService,
        private storageService: StorageService,
        private relationsService: RelationsService) {
        GoogleMapsLoader.KEY = environment.googleMapsApiKey;
        this.relationsService.getFriends(storageService.userId).subscribe(data => {
            this.currentUserFriendsIds = data.filter(relation =>
                relation.invitedUserId === storageService.userId ||
                relation.invitingUserId === storageService.userId
            ).map(relation =>
                relation.invitedUserId === storageService.userId ? relation.invitingUserId : relation.invitedUserId
            );
        });
    }

    @ViewChild('mapDiv') mapDiv: ElementRef;
    public map: google.maps.Map;
    private userLocationMarker: google.maps.Marker;
    private markers: any[] = [];
    public meetings: Models.Meeting[];
    private currentUserFriendsIds: string[];

    private _showFriendsMeetings: boolean;
    private _showUserMeetings: boolean;
    private _showOldMeetings: boolean;

    public get showUserMeetings(): boolean {
        return this._showUserMeetings;
    }
    public get showOldMeetings(): boolean {
        return this._showOldMeetings;
    }
    public get showFriendsMeetings(): boolean {
        return this._showFriendsMeetings;
    }

    public set showUserMeetings(value: boolean) {
        this._showUserMeetings = value;
        this.filterMarkers();
    }

    public set showOldMeetings(value: boolean) {
        this._showOldMeetings = value;
        this.filterMarkers();
    }

    public set showFriendsMeetings(value: boolean) {
        this._showFriendsMeetings = value;
        this.filterMarkers();
    }

    private filterMarkers() {
        this.markers.forEach(x => x.setMap(null));
        let meetingIds: string[] = [];
        if (this._showFriendsMeetings) {
            meetingIds = meetingIds.concat(this.meetings.filter(meeting =>
                this.currentUserFriendsIds.includes(meeting.hostId)
                || this.currentUserFriendsIds.forEach(id => meeting.participants.map(p => p.id).includes(id)))
                .map(meeting => meeting.id));
        }
        if (this._showOldMeetings) {
            meetingIds = meetingIds.concat(this.meetings.filter(meeting => new Date(meeting.date) < new Date())
                .map(meeting => meeting.id));
        }

        if (this._showUserMeetings) {
            meetingIds = meetingIds.concat(this.meetings.filter(meeting =>
                meeting.hostId === this.storageService.userId ||
                meeting.participants.map(participant => participant.id)
                    .includes(this.storageService.userId)
            ).map(meeting => meeting.id));
        }

        if (!this._showFriendsMeetings && !this._showOldMeetings && !this._showUserMeetings) {
            meetingIds = this.meetings.filter(meeting => new Date(meeting.date) >= new Date(new Date().getDate() + 1))
                .map(meeting => meeting.id);
        }
        this.markers.filter(marker => meetingIds.includes(marker.meetingId))
            .forEach(marker => marker.setMap(this.map));
    }
    private initMap() {
        this.meetingService.getMeetings().subscribe((meetings) => {
            this.meetings = meetings;
            this.loadMapWithApi();
            this.addUserLocationMarker();
        }, () => this.notificationService.showError());
    }

    private createMarkersFromMeetings() {
        this.meetings.forEach((meeting) => {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(meeting.latitude, meeting.longitude),
                meetingId: meeting.id,
                map: this.map
            });
            if (new Date(meeting.date) < new Date(new Date().getDate() - 1)) {
                marker.setMap(null);
            }
            this.markers.push(marker);
            google.maps.event.addListener(marker, 'click', () => {
                this.zone.run(() => this.showMeetingInfoModal(marker.meetingId));
            });
        });
    }

    private showMeetingInfoModal(meetingId: string) {
        let meeting = this.meetings.find(m => m.id === meetingId);
        this.dialog.open(MeetingInfoComponent, {
            data: { meeting }
        }).afterClosed().subscribe(result => {
            let joinedMeeting = this.meetings.find(m => m.id === result);
            if (joinedMeeting) {
                joinedMeeting.participants.push(
                    ({
                        id: this.storageService.userId,
                        email: this.storageService.userName,
                        firstName: null,
                        lastName: null
                    })
                );
            }
        });
    }

    private loadMapWithApi() {
        GoogleMapsLoader.load(g => {
            this.map = new google.maps.Map(this.mapDiv.nativeElement, {
                center: { lat: 53.921, lng: 19.037 },
                zoom: 8,
                disableDefaultUI: true,
                scaleControl: true,
                zoomControl: true
            });
            this.createMarkersFromMeetings();
        });
    }

    private addUserLocationMarker() {
        navigator.geolocation.getCurrentPosition(position => {
            this.userLocationMarker = new google.maps.Marker({
                position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                map: this.map,
                label: 'You'
            });
        });
    }

    ngOnInit() {
        this.initMap();
    }
}

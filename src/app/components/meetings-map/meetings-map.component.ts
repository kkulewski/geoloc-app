import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import GoogleMapsLoader = require('google-maps');
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';
import { MeetingService } from '../../services/meeting.service';
import { MeetingInfoComponent } from '../modals/meeting-info/meeting-info.component';
import { NotificationService } from '../../services/notification.service';
import { StorageService } from '../../services/storage.service';

declare const google: any;

@Component({
  selector: 'app-meetings-map',
  templateUrl: './meetings-map.component.html',
  styleUrls: ['./meetings-map.component.css']
})
export class MeetingsMapComponent implements OnInit, AfterViewInit {

  constructor(private dialog: MatDialog, private zone: NgZone,
    private meetingService: MeetingService,
    private notificationService: NotificationService,
    private storageService: StorageService) {
    GoogleMapsLoader.KEY = environment.googleMapsApiKey;
  }

  @ViewChild('mapDiv') mapDiv: ElementRef;
  public map: google.maps.Map;
  private userLocationMarker: google.maps.Marker;
  private markers: google.maps.Marker[] = [];
  public meetings: Models.Meeting[];


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
        map: this.map,
        meetingId: meeting.id
      });
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

  ngAfterViewInit() {
  }
}

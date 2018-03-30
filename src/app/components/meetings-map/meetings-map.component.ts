import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import GoogleMapsLoader = require('google-maps');
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';
import { MeetingService } from '../../services/meeting.service';

declare const google: any;

@Component({
  selector: 'app-meetings-map',
  templateUrl: './meetings-map.component.html',
  styleUrls: ['./meetings-map.component.css']
})
export class MeetingsMapComponent implements OnInit, AfterViewInit {

  constructor(private dialog: MatDialog, private zone: NgZone,
    private meetingService: MeetingService) {
    GoogleMapsLoader.KEY = environment.googleMapsApiKey;
  }

  @ViewChild('mapDiv') mapDiv: ElementRef;
  public map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  public meetings: Models.Meeting[];


  private initMap() {
    this.meetingService.getMeetings().subscribe((meetings) => {
      this.meetings = meetings;
      this.loadMapWithApi();
    });
  }

  private createMarkersFromMeetings() {
    this.meetings.forEach((meeting) => {
      this.markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(meeting.latitude, meeting.longitude),
        map: this.map
      }));
    });
  }

  private loadMapWithApi() {
    GoogleMapsLoader.load(g => {
      this.map = new google.maps.Map(this.mapDiv.nativeElement, {
        center: { lat: 53.921, lng: 19.037 },
        zoom: 8
      });
      this.createMarkersFromMeetings();
    });
  }

  ngOnInit() {
    this.initMap();
  }

  ngAfterViewInit() {
  }
}

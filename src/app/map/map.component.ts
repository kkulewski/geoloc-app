import { Component, Inject, ElementRef, ViewChild, OnInit, NgZone } from '@angular/core';
import { LocationService } from '../services/location.service';
import { MatDialog } from '@angular/material';
import { MeetingDialogComponent } from '../meeting-dialog/meeting-dialog.component';
import { Router } from '@angular/router';
import GoogleMapsLoader = require('google-maps');
import { environment } from '../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router, private zone: NgZone) {
    GoogleMapsLoader.KEY = environment.googleMapsApiKey;
  }

  @ViewChild('mapDiv') mapDiv: ElementRef;
  public map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private clickListener: google.maps.MapsEventListener;

  initMap() {
    GoogleMapsLoader.load(g => {
      this.map = new google.maps.Map(this.mapDiv.nativeElement, {
        center: { lat: 53.921, lng: 19.037 },
        zoom: 8,
        disableDefaultUI: true
      });
      this.clickListener = this.map.addListener('click', (event) => {
        this.zone.run(() => {
          this.addMarker(event.latLng);
        });
      });
    });
  }

  private addMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.markers.push(marker);
    this.showMeetingModal(location.lat(), location.lng());
  }

  private showMeetingModal(longitude: number, latitude: number) {
    this.dialog.open(MeetingDialogComponent, {
      data: {longitude, latitude}
    });
  }

  ngOnInit() {
    this.initMap();
  }
}

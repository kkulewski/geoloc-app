import { Component, Inject, ElementRef, ViewChild, OnInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MeetingCreateComponent } from '../modals/meeting-create/meeting-create.component';
import GoogleMapsLoader = require('google-maps');
import { environment } from '../../../environments/environment';
import { StorageService } from '../../services/storage.service';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(public dialog: MatDialog, private zone: NgZone, private storageService: StorageService) {
    GoogleMapsLoader.KEY = environment.googleMapsApiKey;
  }

  @ViewChild('mapDiv') mapDiv: ElementRef;
  public map: google.maps.Map;
  private userLocationMarker: google.maps.Marker;
  private markers: google.maps.Marker[] = [];
  private clickListener: google.maps.MapsEventListener;

  private initMap() {
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
    this.addUserLocationMarker();
  }

  private addMarker(location) {
    this.showMeetingModal(location.lat(), location.lng());
  }

  private showMeetingModal(latitude: number, longitude: number) {
    this.dialog.open(MeetingCreateComponent, {
      data: { longitude: longitude, latitude: latitude, userId: this.storageService.userId }
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

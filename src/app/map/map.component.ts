import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { LocationService } from '../location.service';
import { MatDialog } from '@angular/material';
import { MeetingDialogComponent } from '../meeting-dialog/meeting-dialog.component';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private locationService: LocationService, public dialog: MatDialog) {
  }

  @ViewChild('mapDiv') mapDiv: ElementRef;
  public map: google.maps.Map;
  public locations: Models.Location[];
  private markers: google.maps.Marker[] = [];
  private clickListener: google.maps.MapsEventListener;

  locate(location: Models.Location) {
    this.map.setCenter(new google.maps.LatLng(location.latitude, location.longitude));
  }

  initMap() {
    this.map = new google.maps.Map(this.mapDiv.nativeElement, {
      center: { lat: 53.921, lng: 19.037 },
      zoom: 8,
      disableDefaultUI: true
    });
    this.clickListener = this.map.addListener('click', (event) => this.addMarker(event.latLng));

  }

  private addMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.markers.push(marker);
    this.showMeetingModal();
  }

  private showMeetingModal() {
    this.dialog.open(MeetingDialogComponent, {
    });
  }

  ngOnInit() {
    this.initMap();
  }
}

import { Component, AfterViewInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { LocationService } from '../location.service';
declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  constructor(private locationService: LocationService) {
  }

  @ViewChild('mapDiv') mapDiv: ElementRef;
  public map: google.maps.Map;
  public locations: Models.Location[];
  private markers: google.maps.Marker[] = [];

  locate(location: Models.Location) {
    this.map.setCenter(new google.maps.LatLng(location.latitude, location.longitude));
  }

  initMap() {
    this.map = new google.maps.Map(this.mapDiv.nativeElement, {
      center: { lat: 53.921, lng: 19.037 },
      zoom: 8,
      disableDefaultUI: true
    });
    this.map.addListener('click', (event) => this.addMarker(event.latLng));
    this.locationService.getLastLocations().subscribe(locations => {
      this.locations = locations;
      for (let location of locations) {
        var pos = { lat: location.latitude, lng: location.longitude };
        var marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          title: location.username,
          label: location.username.charAt(0)
        });
        this.markers.push(marker);
      }
    });
  }

  private addMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.markers.push(marker);
  }

  ngAfterViewInit() {
    this.initMap();
  }
}

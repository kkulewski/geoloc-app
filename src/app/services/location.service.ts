import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) { }

  public getLastLocations(): Observable<Models.Location[]> {
    return this.http.get<Models.Location[]>('api/location/get/last/');
  }
}

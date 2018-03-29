import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  public getLastLocations(): Observable<Models.Location[]> {
    return this.http.get<Models.Location[]>(this.baseUrl + 'api/location/get/last/');
  }
}

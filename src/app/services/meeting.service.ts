import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MeetingService {

  constructor(private http: HttpClient) {
  }

  createMeeting(meeting: Models.Meeting): Observable<Object> {
    return this.http.post('api/meeting/create', meeting);
  }

  getMeetings(): Observable<Models.Meeting[]> {
    return this.http.get<Models.Meeting[]>('api/meeting');
  }

}

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

  joinMeeting(meeting: Models.Meeting, userId: string): Observable<void> {
    return this.http.post<void>('api/meeting/join', { meetingId: meeting.id, userId: userId});
  }

}

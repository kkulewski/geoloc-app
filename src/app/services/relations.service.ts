import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RelationsService {

  constructor(private http: HttpClient) { }

  public getFriends(userId: string): Observable<Models.Relation[]> {
    return this.http.get<Models.Relation[]>('api/relation/' + userId);
  }

  public getRequestsSent(userId: string): Observable<Models.Relation[]> {
    return this.http.get<Models.Relation[]>('api/relation/sent/' + userId);
  }

  public getRequestsReceived(userId: string): Observable<Models.Relation[]> {
    return this.http.get<Models.Relation[]>('api/relation/received/' + userId);
  }

  public sendRequest(invitingUserName: string, invitedUserName: string) {
    const url = 'api/relation/send';

    let relationRequest: RelationRequest = {
      invitingUserName: invitingUserName,
      invitedUserName: invitedUserName
    };

    const body = JSON.stringify(relationRequest);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, {headers});
  }

  public acceptRequest(relationId: string) {
    const url = 'api/relation/accept';
    const body = JSON.stringify(relationId);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, {headers});
  }
}

class RelationRequest {
  invitingUserName: string;
  invitedUserName: string;
}

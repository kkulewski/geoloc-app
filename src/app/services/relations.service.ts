import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RelationsService {

  constructor(private http: HttpClient) { }

  public getFriends(userId: string): Observable<Models.Relation[]> {
    return this.http.get<Models.Relation[]>('api/userrelation/' + userId);
  }

  public getRequestsSent(userId: string): Observable<Models.Relation[]> {
    return this.http.get<Models.Relation[]>('api/userrelation/sent/' + userId);
  }

  public getRequestsReceived(userId: string): Observable<Models.Relation[]> {
    return this.http.get<Models.Relation[]>('api/userrelation/received/' + userId);
  }

  public sendRequest(invitingUserName: string, invitedUserName: string) {
    const url = 'api/userrelation/send';

    var relationRequest = new RelationRequest();
    relationRequest.invitingUserName = invitingUserName;
    relationRequest.invitedUserName = invitedUserName;

    const body = JSON.stringify(relationRequest);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, {headers});
  }

  public acceptRequest(relationId: string) {
    const url = 'api/userrelation/accept';
    const body = JSON.stringify(relationId);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, {headers});
  }
}

class RelationRequest {
  invitingUserName: string;
  invitedUserName: string;
}

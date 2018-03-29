import { Component, Inject } from '@angular/core';
import { RelationsService } from '../services/relations.service';

@Component({
    selector: 'app-relations',
    templateUrl: './relations.component.html'
})
export class RelationsComponent {

    friends: Models.Relation[];
    requestsSent: Models.Relation[];
    requestsReceived: Models.Relation[];

    requestUserName: string;

    isRequesting = false;
    resultMessage;

    constructor(private relationsService: RelationsService) {
        this.getRelations();
    }

    get userId(): string {
        return localStorage.getItem('user_id');
    }

    get userName(): string {
        return localStorage.getItem('user_name');
    }

    getRelations() {
        this.relationsService.getFriends(this.userId).subscribe(friends => this.friends = friends);
        this.relationsService.getRequestsSent(this.userId).subscribe(requestsSent => this.requestsSent = requestsSent);
        this.relationsService.getRequestsReceived(this.userId).subscribe(requestsReceived => this.requestsReceived = requestsReceived);
    }

    send(invitedUserName: string) {
        this.relationsService.sendRequest(this.userName, invitedUserName).subscribe(e => this.getRelations());
    }

    accept(relationId: string) {
        this.relationsService.acceptRequest(relationId).subscribe(e => this.getRelations());
    }
}

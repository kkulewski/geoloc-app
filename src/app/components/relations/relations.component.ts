import { Component, Inject } from '@angular/core';
import { RelationsService } from '../../services/relations.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../services/notification.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html'
})
export class RelationsComponent {

  friends: Models.Relation[];
  requestsSent: Models.Relation[];
  requestsReceived: Models.Relation[];

  requestUserName: string;

  constructor(private relationsService: RelationsService,
    private notificationService: NotificationService,
    private storageService: StorageService) {
    this.getRelations();
  }

  getRelations() {
    forkJoin([
      this.relationsService.getFriends(this.storageService.userId),
      this.relationsService.getRequestsSent(this.storageService.userId),
      this.relationsService.getRequestsReceived(this.storageService.userId)
    ]).subscribe(results => {
      this.friends = results[0];
      this.requestsSent = results[1];
      this.requestsReceived = results[2];
    }, () => this.notificationService.showError());
  }

  send(invitedUserName: string) {
    this.relationsService.sendRequest(this.storageService.userName, invitedUserName)
      .subscribe(e => this.getRelations(), () => this.notificationService.showError());
  }

  accept(relationId: string) {
    this.relationsService.acceptRequest(relationId)
      .subscribe(e => {
        this.getRelations();
        this.notificationService.showNotification('Friend added!');
      }, () => this.notificationService.showError());
  }
}

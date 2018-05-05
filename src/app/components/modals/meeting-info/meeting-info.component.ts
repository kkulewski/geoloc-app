import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MeetingService } from '../../../services/meeting.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-meeting-info',
  templateUrl: './meeting-info.component.html',
  styleUrls: ['./meeting-info.component.css']
})
export class MeetingInfoComponent {

  public panelOpened = false;

  constructor(private dialogRef: MatDialogRef<MeetingInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Models.MeetingInfoData,
    private meetingService: MeetingService,
    private router: Router,
    private notificationService: NotificationService,
    private storageService: StorageService) {
  }

  get date(): string {
    return new Date(this.data.meeting.date).toDateString();
  }

  get time(): string {
    return new Date(this.data.meeting.time).toTimeString();
  }

  get isAlreadyInMeeting(): boolean {
    return this.data.meeting.participants.find(participant => participant.id === this.storageService.userId) !== undefined
      || this.isHost;
  }

  get participantsPresent(): boolean {
    return this.data.meeting.participants.length > 0;
  }

  get hostUsername(): string {
    return this.data.meeting.participants.find(participant => participant.id === this.data.meeting.hostId).email;
  }

  get isHost(): boolean {
    return this.storageService.userId === this.data.meeting.hostId;
  }

  onApprove() {
    this.meetingService.joinMeeting(this.data.meeting, this.storageService.userId)
      .subscribe(() => {
        this.dialogRef.close(this.data.meeting.id);
        this.notificationService.showNotification('You\'ve joined the meeting!');
      }, () => {
        this.notificationService.showError();
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}

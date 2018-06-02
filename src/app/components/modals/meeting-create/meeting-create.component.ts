import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MeetingService } from '../../../services/meeting.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-meeting-create',
  templateUrl: './meeting-create.component.html',
  styleUrls: ['./meeting-create.component.css']
})
export class MeetingCreateComponent {

  constructor(private dialogRef: MatDialogRef<MeetingCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Models.MeetingCreateData,
    private meetingService: MeetingService,
    private router: Router,
    private notificationService: NotificationService) {
  }

  name: string;
  time: string;
  description: string;
  date: Date;

  onApprove(): void {
    let month = this.date.getMonth();
    this.date.setUTCDate(this.date.getDate());
    this.date.setUTCMonth(month);
    let meeting: Models.Meeting = {
      id: null,
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      name: this.name,
      description: this.description,
      date: this.date,
      time: this.time,
      hostId: this.data.userId,
      participants: []
    };
    this.meetingService.createMeeting(meeting).subscribe(() => {
      this.dialogRef.close();
      this.router.navigate(['meetings']);
      this.notificationService.showNotification('Meeting created!');
    }, () => {
      this.dialogRef.close();
      this.notificationService.showError();
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

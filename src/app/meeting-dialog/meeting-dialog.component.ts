import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-meeting-dialog',
  templateUrl: './meeting-dialog.component.html',
  styleUrls: ['./meeting-dialog.component.css']
})
export class MeetingDialogComponent {

  constructor(private dialogRef: MatDialogRef<MeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Models.MeetingDialogModel,
    private meetingService: MeetingService) {
  }

  name: string;
  time: string;
  date: Date;

  onApprove(): void {
    let meeting: Models.Meeting = {
      name: this.name,
      userId: this.data.userId,
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      date: this.date,
      time: this.time,
    };
    this.meetingService.createMeeting(meeting).subscribe(() => this.dialogRef.close());
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

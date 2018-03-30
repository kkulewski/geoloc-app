import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MeetingService } from '../../../services/meeting.service';

@Component({
  selector: 'app-meeting-dialog',
  templateUrl: './meeting-dialog.component.html',
  styleUrls: ['./meeting-dialog.component.css']
})
export class MeetingDialogComponent {

  constructor(private dialogRef: MatDialogRef<MeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Models.MeetingDialogDataModel,
    private meetingService: MeetingService) {
  }

  name: string;
  time: string;
  description: string;
  date: Date;

  onApprove(): void {
    let meeting: Models.Meeting = {
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      name: this.name,
      description: this.description,
      date: this.date,
      time: this.time,
      host: {
        id: this.data.userId,
        email: null,
        firstName: null,
        lastName: null
      },
      participants: []
    };
    this.meetingService.createMeeting(meeting).subscribe(() => this.dialogRef.close());
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

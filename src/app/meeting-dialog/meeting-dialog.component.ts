import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-meeting-dialog',
  templateUrl: './meeting-dialog.component.html',
  styleUrls: ['./meeting-dialog.component.css']
})
export class MeetingDialogComponent {

  constructor(public dialogRef: MatDialogRef<MeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Models.MeetingDialogModel) {

  }

  name: string;
  time: string;
  date: string;

  onClose(): void {
    this.dialogRef.close();
  }
}

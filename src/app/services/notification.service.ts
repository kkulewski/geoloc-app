import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {

  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Close');
  }

  showError() {
    this.snackBar.open('Something went wrong... Try again later.', 'Okay');
  }

}

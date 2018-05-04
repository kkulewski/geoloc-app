import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelationsService } from './relations.service';
import { AccountService } from './account.service';
import { MeetingService } from './meeting.service';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    RelationsService,
    AccountService,
    MeetingService,
    NotificationService
  ]
})
export class ServicesModule { }

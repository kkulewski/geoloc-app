import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from './location.service';
import { RelationsService } from './relations.service';
import { AccountService } from './account.service';
import { MeetingService } from './meeting.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    RelationsService,
    LocationService,
    AccountService,
    MeetingService
  ]
})
export class ServicesModule { }

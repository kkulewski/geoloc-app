import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from './location.service';
import { RelationsService } from './relations.service';
import { AccountService } from './account.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ RelationsService, LocationService, AccountService ]
})
export class ServicesModule { }

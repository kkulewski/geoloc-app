import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatDialogModule, MatListModule, MatCardModule,
   MatInputModule, MatProgressSpinnerModule, MatMenuModule,
   MatIconModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule } from '@angular/material';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LocateComponent } from './location/locate/locate.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { MapComponent } from './map/map.component';
import { LocationService } from './services/location.service';
import { RelationsService } from './services/relations.service';
import { DialogComponent } from './dialog/dialog.component';
import { RelationsComponent } from './relations/relations.component';
import { environment } from '../environments/environment';
import { MeetingDialogComponent } from './meeting-dialog/meeting-dialog.component';


const appRoutes: Routes = [
  { path: '', component: MapComponent },
  { path: 'locate', component: LocateComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent},
  { path: 'relations', component: RelationsComponent}
];


@NgModule({
  entryComponents: [
    DialogComponent,
    MeetingDialogComponent,
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    LocateComponent,
    RegisterComponent,
    LoginComponent,
    MapComponent,
    DialogComponent,
    RelationsComponent,
    MeetingDialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: 'BASE_URL', useValue: environment.apiEndpoint },
    LocationService,
    RelationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

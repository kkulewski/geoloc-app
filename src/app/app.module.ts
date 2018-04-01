import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from './services/services.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatDialogModule, MatListModule, MatCardModule,
   MatInputModule, MatProgressSpinnerModule, MatMenuModule,
   MatIconModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatExpansionModule } from '@angular/material';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LocateComponent } from './components/location/locate/locate.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';
import { MapComponent } from './components/map/map.component';
import { RelationsComponent } from './components/relations/relations.component';

import { environment } from '../environments/environment';

import { HttpRouteInterceptor } from './http-interceptors/http-route-interceptor';
import { HttpModule } from '@angular/http';
import { MeetingsMapComponent } from './components/meetings-map/meetings-map.component';
import { InfoComponent } from './components/modals/info/info.component';
import { MeetingCreateComponent } from './components/modals/meeting-create/meeting-create.component';
import { MeetingInfoComponent } from './components/modals/meeting-info/meeting-info.component';


const appRoutes: Routes = [
  { path: '', component: MapComponent },
  { path: 'locate', component: LocateComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent},
  { path: 'relations', component: RelationsComponent},
  { path: 'meetings', component: MeetingsMapComponent}
];


@NgModule({
  entryComponents: [
    InfoComponent,
    MeetingCreateComponent,
    MeetingInfoComponent
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    LocateComponent,
    RegisterComponent,
    LoginComponent,
    MapComponent,
    InfoComponent,
    RelationsComponent,
    MeetingCreateComponent,
    MeetingsMapComponent,
    MeetingInfoComponent
  ],
  imports: [
    BrowserModule,
    ServicesModule,
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
    MatExpansionModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRouteInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

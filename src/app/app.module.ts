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
   MatIconModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule } from '@angular/material';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LocateComponent } from './location/locate/locate.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { MapComponent } from './map/map.component';
import { DialogComponent } from './dialog/dialog.component';
import { RelationsComponent } from './relations/relations.component';
import { MeetingDialogComponent } from './meeting-dialog/meeting-dialog.component';

import { environment } from '../environments/environment';

import { HttpRouteInterceptor } from './http-interceptors/http-route-interceptor';
import { HttpModule } from '@angular/http';


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
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRouteInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

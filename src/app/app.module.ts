import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LocateComponent } from './location/locate/locate.component';
import { LastKnownLocationComponent } from './location/last-known/last-known.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'locate', component: LocateComponent },
  { path: 'last', component: LastKnownLocationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LocateComponent,
    LastKnownLocationComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  // return document.getElementsByTagName('base')[0].href;
  return 'http://localhost:5000/';
}

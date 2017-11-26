import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LocationComponent } from './location/location.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LocationComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
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

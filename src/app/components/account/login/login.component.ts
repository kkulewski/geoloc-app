import { Component, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { ILoginModel } from '../../../models/login.model';
import { AccountService } from '../../../services/account.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../../services/notification.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private accountService: AccountService,
    private notificationService: NotificationService, private storageService: StorageService) {
  }

  loginUser({ value, valid }: { value: ILoginModel, valid: boolean }) {
    if (valid) {
      this.accountService.login(value.email, value.password)
        .subscribe(
          (response: ILoginSuccessful) => {
            this.storageService.authToken = response.auth_token;
            this.storageService.userId = response.id;
            this.getUserName(response.id);
            this.router.navigateByUrl('/');
            this.notificationService.showNotification('Logged in!');
          },
          (error: HttpErrorResponse) => {
            this.notificationService.showError();
          });
    }
  }

  getUserName(id: string) {
    this.accountService.getUserName(id)
      .subscribe(result =>  {
        this.storageService.userName = result;
      }, error => {
        this.notificationService.showError();
      });
  }

  logoutUser() {
    this.storageService.clear();
  }
}
export interface ILoginSuccessful {
  id: string;
  auth_token: string;
}

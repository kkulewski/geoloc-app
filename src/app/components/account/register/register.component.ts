import { Component, Inject } from '@angular/core';
import { IRegisterModel } from '../../../models/register.model';
import { AccountService } from '../../../services/account.service';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading = false;

  constructor(private router: Router,
      private notificationService: NotificationService,
      private accountService: AccountService) {
  }

  registerUser({ value, valid }: { value: IRegisterModel, valid: boolean }) {
    this.isLoading = true;
    if (valid) {
      this.accountService.register(value.email, value.password, value.firstName, value.lastName)
        .subscribe(() => {
          this.isLoading = false;
          this.router.navigate(['/login']);
          this.notificationService.showNotification('Register successful!');
        }, () => {
          this.isLoading = false;
          this.notificationService.showError();
        });
    }
  }
}

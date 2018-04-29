import { Component, Inject } from '@angular/core';
import { IRegisterModel } from '../../../models/register.model';
import { AccountService } from '../../../services/account.service';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor(private router: Router,
      private notificationService: NotificationService,
      private accountService: AccountService) {
  }

  registerUser({ value, valid }: { value: IRegisterModel, valid: boolean }) {
    if (valid) {
      this.accountService.register(value.email, value.password, value.firstName, value.lastName)
        .subscribe(() => {
          this.router.navigate(['/login']);
          this.notificationService.showNotification('Register successful!');
        }, () => {
          this.notificationService.showError();
        });
    }
  }
}

import { Component, Inject } from '@angular/core';
import { IRegisterModel } from '../models/register.model';
import { AccountService } from '../../services/account.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    isRequesting = false;
    resultMessage = '';
    accountService: AccountService;

    constructor(private http: HttpClient, private router: Router) {
        this.accountService = new AccountService(this.http);
    }

    registerUser({ value, valid }: { value: IRegisterModel, valid: boolean }) {
        this.isRequesting = true;
        if (valid) {
            this.accountService.register(value.email, value.password, value.firstName, value.lastName)
                .subscribe(
                (response: string) => {
                    this.resultMessage = `${response}`;
                    this.isRequesting = false;
                    this.router.navigate(['/login']);
                },
                (error: HttpErrorResponse) => {
                    this.resultMessage = `${error.status} - ${error.statusText}`;
                    this.isRequesting = false;
                });
        }
    }
}

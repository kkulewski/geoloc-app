import { Component, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { IRegisterModel } from '../models/register.model';
import { AccountService } from '../account.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    isRequesting = false;
    resultMessage = '';
    accountService: AccountService;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
        this.accountService = new AccountService(this.http, this.baseUrl);
    }

    registerUser({ value, valid }: { value: IRegisterModel, valid: boolean }) {
        this.isRequesting = true;
        if (valid) {
            this.accountService.register(value.email, value.password, value.firstName, value.lastName)
                .subscribe(
                    (response: Response) => {
                        this.resultMessage = ' ' + response;
                        this.isRequesting = false;
                    },
                    error => {
                        this.resultMessage = ' ' + error;
                        this.isRequesting = false;
                    });
        }
    }
}

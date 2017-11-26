import { Component, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { ILoginModel } from '../models/login.model';
import { AccountService } from '../account.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    isRequesting = false;
    resultMessage = '';
    accountService: AccountService;

    authToken() {
        return localStorage.getItem('auth_token');
    }

    userId() {
        return localStorage.getItem('user_id');
    }

    userName() {
        const name = localStorage.getItem('user_name');
        if (name == null) {
            this.getUserName();
        }
        return localStorage.getItem('user_name');
    }

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
        this.accountService = new AccountService(this.http, this.baseUrl);
    }

    loginUser({ value, valid }: { value: ILoginModel, valid: boolean }) {
        this.isRequesting = true;
        if (valid) {
            this.accountService.login(value.email, value.password)
                .subscribe(
                (response: ILoginSuccessful)  => {
                    localStorage.setItem('auth_token', response.auth_token);
                    localStorage.setItem('user_id', response.id);

                    this.resultMessage = `ID = ${response.id}`;
                    this.isRequesting = false;
                },
                (error: HttpErrorResponse) => {
                    this.resultMessage = `${error.status} - ${error.statusText}`;
                    this.isRequesting = false;
                });
        }
    }

    getUserName() {
        if (!this.isRequesting) {
            this.isRequesting = true;
            const id = this.userId();
            if (id != null) {
                this.accountService.getUserName(id)
                    .subscribe(
                    result => {
                        localStorage.setItem('user_name', result as string);
                        this.isRequesting = false;
                    },
                    error => {
                        console.error(error);
                        this.isRequesting = false;
                    });
            }
        }
    }

    logoutUser() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_name');
    }
}

export interface ILoginSuccessful {
    id: string;
    auth_token: string;
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

    constructor(private http: HttpClient) {}

    register(email: string, password: string, firstName: string, lastName: string) {
        const body = JSON.stringify({ email, password, firstName, lastName });
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('api/account/register', body, {headers});
    }

    login(userName: string, password: string) {
        const body = JSON.stringify({ userName, password });
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('api/account/login', body, {headers});
    }

    getUserName(id: string) {
        const body = JSON.stringify(id);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('api/account/username', body, {headers});
    }
}

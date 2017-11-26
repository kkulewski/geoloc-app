import { HttpClient, HttpHeaders } from '@angular/common/http';

export class AccountService {

    constructor(private http: HttpClient, private baseUrl: string) {}

    register(email: string, password: string, firstName: string, lastName: string) {
        const body = JSON.stringify({ email, password, firstName, lastName });
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.baseUrl + 'api/account/register', body, {headers});
    }
}

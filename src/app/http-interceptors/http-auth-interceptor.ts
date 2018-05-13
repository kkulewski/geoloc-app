import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../services/storage.service';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.storageService.authToken}`
            }
        });
        return next.handle(request).do((event: any) => event, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.clearLocalStorage();
                }
            }
        });
    }

    private clearLocalStorage(): void {
        this.storageService.clear();
    }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../services/storage.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    constructor(private storageService: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.storageService.authToken}`
            }
        });
        return next.handle(request);
    }
}

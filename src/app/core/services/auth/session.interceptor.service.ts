import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { KeycloakService } from './keycloak.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SessionInterceptorService implements HttpInterceptor {
    constructor(
        private ks : KeycloakService
    ) { } 

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.addTokenToHeader(request.headers).pipe(
            mergeMap(headersWithBearer => {
              const kcReq = request.clone({ headers: headersWithBearer });
              return next.handle(kcReq);
            })
          );
    }

    addTokenToHeader(headers: HttpHeaders = new HttpHeaders()): Observable<HttpHeaders> {
        return Observable.create(async (observer: Observer<any>) => {
          try {
            const token: string = await this.ks.getToken();
            headers = headers.set("Authorization", "Bearer " + token);
            observer.next(headers);
            observer.complete();
          } catch (error) {
            observer.error(error);
          }
        });
      }

}

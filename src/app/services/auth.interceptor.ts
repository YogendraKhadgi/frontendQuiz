import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login : LoginService){

  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add Jwt token to request

    let authRequest = httpRequest;
    const token = this.login.getToken();
    if (token != null) {
      authRequest = authRequest.clone({
        setHeaders:{Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(authRequest);
  }
}

export const authInterceptorProviders = [
  {
    provide : HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }
]

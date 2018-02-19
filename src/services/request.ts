import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RequestService {
    // PROD
    public prefix: string = 'http://twinsapi.mitto.usermd.net'
    // DEV
    // public prefix: string = 'http://localhost:8081';

    public process: EventEmitter<any> = new EventEmitter<any>();
    public authFailed: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        public http: HttpClient
    ) { }

    authMethod(url: string, requestData?: any): Observable<any> {
        return this.http.post(this.prefix + url, requestData.body);
    }

    postMethod(url: string, requestData?: any): Observable<any> {
        return this.http.post(this.prefix + url, requestData.body, {
            headers: new HttpHeaders().set('x-access-token', requestData.token)
        });
    }

    getMethod(url: string, requestData?: any): Observable<any> {
        return this.http.get(this.prefix + url, {
            headers: new HttpHeaders().set('x-access-token', requestData.token)
        });
    }

    // deleteMethod(url: string, options?): Observable<any> {
    //     return this.http.delete(this.prefix + url, options);
    // }

    deleteMethod(url: string, requestData?: any): Observable<any> {
        return this.http.delete(this.prefix + url, {
            headers: new HttpHeaders().set('x-access-token', requestData.token)
        });
    }

    putMethod(url: string, requestData?: any): Observable<any> {
        return this.http.put(this.prefix + url, requestData.body, {
            headers: new HttpHeaders().set('x-access-token', requestData.token)
        });
    }

}
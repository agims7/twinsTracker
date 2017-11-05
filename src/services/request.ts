import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RequestService {
    public prefix: string = 'http://twinsapi.mitto.usermd.net';

    process: EventEmitter<any> = new EventEmitter<any>();
    authFailed: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private http: HttpClient
    ) { }

    postMethod(url, requestData?): Observable<any> {
        return this.http.post(this.prefix + url, requestData.body, {
            headers: new HttpHeaders().set('x-access-token', requestData.token)
        });
    }

    getMethod(url, requestData?): Observable<any> {
        return this.http.get(this.prefix + url, {
            headers: new HttpHeaders().set('x-access-token', requestData.token)
        });
    }

    deleteMethod(url, requestData?): Observable<any> {
        return this.http.delete(this.prefix + url, {
            headers: new HttpHeaders().set('x-access-token', requestData.token)
        });
    }

    putMethod(url, requestData?): Observable<any> {
        return this.http.put(this.prefix + url, requestData.body, {
            headers: new HttpHeaders().set('x-access-token', requestData.token)
        });
    }

}
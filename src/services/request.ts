import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RequestService {
    public prefix: string = 'http://twinsapi.mitto.usermd.net';

    constructor(
        private http: HttpClient
    ) { }

    postMethod(url, body): Observable<any> {
        return this.http.post(this.prefix + url, body);
    }

    getMethod(url): Observable<any> {
        return this.http.get(this.prefix + url);
    }

    deleteMethod(url, body): Observable<any> {
        return this.http.delete(this.prefix + url, body);
    }

    putMethod(url, body): Observable<any> {
        return this.http.put(this.prefix + url, body);
    }

}
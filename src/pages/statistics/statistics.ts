import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  public prefix: string = 'http://mitto.usermd.net';
  public results

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpClient
  ) {
  }

  // test() {
  //   this.http.get('http://mitto.usermd.net/breast').subscribe(data => {
  //     // Read the result field from the JSON response.
  //     console.log(data)
  //   });
  // }

  // getHttpApiData(requestData): Observable<any> {
  //   return this.httpRequest(this.prefix, requestData, 'get');
  // }

  // httpRequest(prefix, requestData, type, body = {}): Observable<any> {
  //   let url = prefix;
  //   url = this.generateURL(url, requestData);
  //   console.log('[' + type.toUpperCase() + ']', url);
  //     return this.http[type](url).map(res => res.json());
  // }

  //   generateURL(url, requestData): string {
  //     if (typeof requestData === 'object' && requestData !== null) {
  
  //       if (requestData.segments) {
  //         for (let i = 0; i < requestData.segments.length; i++) {
  //           url += requestData.segments[i] + '/';
  //         }
  //         url = url.slice(0, -1);
  //       } else {
  //         console.warn('Brak segmentów w zapytaniu do api');
  //       }
  
  //       if (requestData.params) {
  //         let queryString = this.encodeQueryData(requestData.params);
  //         url += '?' + queryString;
  //       }
  
  //     } else if (typeof requestData === 'string') {
  //       url += requestData;
  //     } else {
  //       console.warn('Niezany typ danych w URLu');
  //     }
  //     return url;
  //   }
  
  //   encodeQueryData(data) {
  //     let ret = [];
  //     for (let d in data)
  //       ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  //     return ret.join('&');
  //   }

}

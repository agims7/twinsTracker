import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from "../../services/auth";
import { RequestService } from "../../services/request";
import { ChildrenService } from "../../services/children";

import * as _ from 'lodash';
import * as moment from 'moment';
import Chart from 'chart.js';

declare var AmCharts: any;

@IonicPage() @Component({
  selector: 'page-statistic-modal',
  templateUrl: 'statistic-modal.html',
})
export class StatisticModalPage {
  public loader: boolean = true;
  public paramData: any;
  public chart: any;
  public xaxis: any = [];
  public yaxis: any = [];

  @HostListener('init')
  handleInit() {
    this.chart.legend.addListener("rollOverItem", this.handleRollOver);
  }

  @HostListener('rollOverSlice', ['$event'])
  handleRollOver(event) {
    var wedge = event.dataItem.wedge.node;
    wedge.parentNode.appendChild(wedge);
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public requestService: RequestService,
    public authService: AuthService,
    public childrenService: ChildrenService
  ) {
  }

  ionViewDidEnter() {
    console.log(this.navParams.data)
    this.paramData = this.navParams.data;
    let requestData = {
      token: this.authService.userToken,
      body: {
        child_id: 60
      }
    }
    // //zapytanie o ilosc karmien
    // this.requestService.postMethod(this.setRequestUrl() + 'all', requestData).subscribe(data => {
    //   console.log(data, '?????????????????????????');
    //   // this.setAxis(data.data)
    //   // this.setBarChartExample();
    //   this.loader = false;
    // });
    //zapytanie o ilosc pieluchy
    this.requestService.postMethod(this.setRequestUrl() + 'all', requestData).subscribe(data => {
      console.log(data, '?????????????????????????');
      this.setAxis(data.data)
      this.setBarChartExample();
      this.loader = false;
    });
  }

  // setAxis(data) {
  //   for (let key of data) {
  //     this.xaxis.push(this.convertToDateTime(key.date));
  //     let childIndex = _.findIndex(this.childrenService.children, ['id', key.child_id]);
  //     console.log(childIndex, this.childrenService.children)
  //     this.yaxis.push(this.childrenService.children[childIndex].name);
  //   }
  //   console.log(this.xaxis, this.yaxis)
  // }

  setAxis(data) {
    for (let key of data) {
      this.xaxis.push(this.convertToDateTime(key.date));
      this.yaxis.push(key.sum);
    }
    console.log(this.xaxis, this.yaxis)
  }

  setRequestUrl() {
    switch (this.paramData.category) {
      case ('breast'): {
        return '/statistics/breast/'
      }
      case ('bottle'): {
        return '/statistics/bottle/'
      }
      case ('diaper'): {
        return '/statistics/diaper/'
      }
      case ('sleep'): {
        return '/statistics/sleep/'
      }
      case ('growth'): {
        return '/statistics/growth/'
      }
      case ('weight'): {
        return '/statistics/growth/'
      }
    }
  }

  setAxisDiaper(data) {
    for (let key of data) {
      this.xaxis.push(this.convertToDateTime(key.date));
      let childIndex = _.findIndex(this.childrenService.children, ['id', key.child_id]);
      console.log(childIndex, this.childrenService.children)
      this.yaxis.push(this.childrenService.children[childIndex].name);
    }
    console.log(this.xaxis, this.yaxis)
  }


  // setStepChart() {
  //   var ctx = document.getElementById("myChart");
  //   var myChart = new Chart(ctx, {
  //     type: 'line',
  //     labels: this.xaxis,
  //     data: {
  //       datasets: [{
  //         data: this.yaxis,
  //         borderColor: '#e6e6e6',
  //         steppedLine: true,
  //         fill: false
  //       }]
  //     },
  //     options: {
  //       title: {
  //         display: true,
  //         text: 'Wukres zmian pieluszek'
  //       },
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true,
  //             // max: 3,
  //             fontColor: '#e6e6e6'
  //           },
  //           gridLines: {
  //             show: true,
  //             color: "#8c8c8c",
  //           }
  //         }],
  //         xAxes: [{
  //           ticks: {
  //             autoSkip: true,
  //             maxRotation: 75,
  //             minRotation: 75,
  //             fontColor: '#e6e6e6'
  //           },
  //           gridLines: {
  //             show: true,
  //             color: "#8c8c8c",
  //           }
  //         }]
  //       },
  //       legend: {
  //         display: false
  //       },
  //     },
  //   });
  // }

  // setBarChart() {
  //   var ctx = document.getElementById("myChart");
  //   var myChart = new Chart(ctx, {
  //     type: 'bar',
  //     labels: this.xaxis,
  //     data: {
  //       datasets: [{
  //         data: this.yaxis,
  //         borderColor: '#e6e6e6',
  //         steppedLine: true,
  //         fill: false
  //       }]
  //     },
  //     options: {
  //       title: {
  //         display: true,
  //         text: 'Wukres zmian pieluszek'
  //       },
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true,
  //             // max: 3,
  //             fontColor: '#e6e6e6'
  //           },
  //           gridLines: {
  //             show: true,
  //             color: "#8c8c8c",
  //           }
  //         }],
  //         xAxes: [{
  //           ticks: {
  //             autoSkip: true,
  //             maxRotation: 75,
  //             minRotation: 75,
  //             fontColor: '#e6e6e6'
  //           },
  //           gridLines: {
  //             show: true,
  //             color: "#8c8c8c",
  //           }
  //         }]
  //       },
  //       legend: {
  //         display: false
  //       },
  //     },
  //   });
  // }
 

  //BAR CHART
  setBarChartExample() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.xaxis,
        // labels: ["Poniedziałek", "Wtorek", "Środa", "CZwartek", "Piątek", "Sobota", "Niedziela"],
        // datasets: [{
        //   label: 'Amelia',
        //   data: [2, 4, 1, 0, 4, 3, 4],
        //   backgroundColor: "#ffa64d"
        // }, {
        //   label: 'Emilia',
        //   data: [2, 1, 0, 2, 1, 2, 3],
        //   backgroundColor: "#b32d00"
        // }]
      datasets: [
        {
          label: 'dziecko',
          data: this.yaxis,
          backgroundColor: "#ffa64d"
        }
      ]
      },
      options: {
        title: {
          display: true,
          text: "Ilości zrobionych kupek",
          fontSize: 22,
          fontColor: "#fff"
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1,
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: false
            }
          }]
        }
      }
    });
  }

  // LINE
  setLineChartExample() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'apples',
          data: [12, 19, 3, 17, 6, 3, 7],
          backgroundColor: "rgba(153,255,51,0.6)"
        }, {
          label: 'oranges',
          data: [2, 29, 5, 5, 2, 3, 10],
          backgroundColor: "rgba(255,153,0,0.6)"
        }]
      }
    });
  }


  setPolarChartExample() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        datasets: [{
          backgroundColor: [
            "#2ecc71",
            "#3498db",
            "#95a5a6",
            "#9b59b6",
            "#f1c40f",
            "#e74c3c",
            "#34495e"
          ],
          data: [12, 19, 3, 17, 28, 24, 7]
        }]
      }
    });
  }



  setPieChartExample() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        datasets: [{
          backgroundColor: [
            "#2ecc71",
            "#3498db",
            "#95a5a6",
            "#9b59b6",
            "#f1c40f",
            "#e74c3c",
            "#34495e"
          ],
          data: [12, 19, 3, 17, 28, 24, 7]
        }]
      }
    });
  }

  convertToFullTime(date) {
    return moment(date).format('DD/MM/YYYY - HH:mm');
  }

  convertToDateTime(date) {
    return moment(date).format('DD/MM/YYYY');
  }

}

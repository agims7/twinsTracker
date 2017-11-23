import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from "../../services/auth";
import { RequestService } from "../../services/request";
import { ChildrenService } from "../../services/children";
import { TimerService } from "../../services/timer";

import * as _ from 'lodash';
import * as moment from 'moment';
import Chart from 'chart.js';

declare var AmCharts: any;

@IonicPage() @Component({
  selector: 'page-statistic-modal',
  templateUrl: 'statistic-modal.html',
})
export class StatisticModalPage {
  public isTogether: boolean = false;
  public noData: boolean = true;
  public loader: boolean = true;
  public paramData: any;
  public selectedCategory: any;
  public requestData: any = {};
  public requestUrl: string = null;
  public firstChild: any = {};
  public secondChild: any = {};
  public chart: any;
  public xaxis: any = [];
  public yaxisFirst: any = [];
  public yaxisSecond: any = [];
  public chartTitle: string = '';
  public chartStepSize: number = null;
  public selectedTyped: any;
  public selectedChart: any;
  public chartTogether: any;
  public isTime: boolean = false;

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
    public childrenService: ChildrenService,
    public timerService: TimerService,
  ) {
    moment.locale('pl');
  }

  ionViewWillEnter() {
    this.clear();
    this.countChildren();
    this.paramData = this.navParams.data;
    this.selectedCategory = this.paramData.category;
    console.log(this.paramData)
  }

  ionViewDidEnter() {
    this.setCategoryParameters();
    this.getData();
  }

  clear() {
    this.xaxis = [];
    this.yaxisFirst = [];
    this.yaxisSecond = [];
  }

  countChildren() {
    let kids = this.childrenService.children.length;
    switch (kids) {
      case (0): {
        this.isTogether = false;
        this.noData = true;
        break;
      }
      case (1): {
        this.isTogether = false;
        this.noData = false;
        this.firstChild.id = this.childrenService.children[0].id;
        this.requestData = {
          token: this.authService.userToken,
          body: {
            child_id: this.firstChild.id
          }
        };
        break;
      }
      case (2): {
        this.isTogether = true;
        this.noData = false;
        this.firstChild.id = this.childrenService.children[0].id;
        this.secondChild.id = this.childrenService.children[1].id;
        this.firstChild.name = this.childrenService.children[0].name;
        this.secondChild.name = this.childrenService.children[1].name;
        this.requestData = {
          token: this.authService.userToken,
          body: {
            first_child_id: this.firstChild.id,
            second_child_id: this.secondChild.id
          }
        };
        break;
      }
      default: {
        this.isTogether = false;
        this.noData = true;
      }
    }
  }

  setCategoryParameters() {
    switch (this.selectedCategory) {
      case ('breast'): {
        this.requestUrl = '/statistics/breast/';
        break;
      }
      case ('bottle'): {
        this.requestUrl = '/statistics/bottle/';
        break;
      }
      case ('diaper'): {
        this.requestUrl = '/statistics/diaper/';
        break;
      }
      case ('sleep'): {
        this.requestUrl = '/statistics/sleep/';
        break;
      }
      case ('growth'): {
        this.requestUrl = '/statistics/growth/';
        break;
      }
      case ('weight'): {
        this.requestUrl = '/statistics/growth/';
        break;
      }
    }
  }

  getData() {
    switch (this.selectedCategory) {
      case ('breast'): {
        this.selectBreastChart('weekcount')
        break;
      }
      case ('bottle'): {
        this.selectBottleChart('weekvolume')
        break;
      }
      case ('diaper'): {
        this.selectDiaperChart('week')
        break;
      }
      case ('sleep'): {
        this.selectSleepChart('week')
        break;
      }
      case ('growth'): {
        this.selectGrowthChart('week')
        break;
      }
      case ('weight'): {
        this.selectWeightChart('week')
        break;
      }
    }
  }

  setSingleAxis(data, time) {
    this.clear();
    for (let key of data) {
      this.xaxis.push(this.convertToDateTime(key.date));
      this.yaxisFirst.push(key.firstChild);
    }
    time ? this.setProperChart('time') : this.setProperChart('none');
  }

  setMutliAxis(data, time) {
    this.clear();
    for (let key of data) {
      this.xaxis.push(this.convertToDateTime(key.date));
      this.yaxisFirst.push(key.firstChild);
      this.yaxisSecond.push(key.secondChild);
    }
    time ? this.setProperChart('time') : this.setProperChart('none');

  }

  setProperChart(time) {
    switch (this.selectedCategory) {
      case ('breast'): {
        this.requestUrl = '/statistics/breast/';
        if (time === 'time') {
          this.yaxisFirst = this.yaxisFirst.map((key, value) => {
            return this.timerService.secondConvertToMinutes(key);
          });
          if (this.isTogether === true) {
            this.yaxisSecond = this.yaxisSecond.map((key, value) => {
              return this.timerService.secondConvertToMinutes(key);
            });
          }
        }
        break;
      }
      case ('bottle'): {
        this.requestUrl = '/statistics/bottle/';
        if (time === 'time') {
          this.yaxisFirst = this.yaxisFirst.map((key, value) => {
            return this.timerService.secondConvertToMinutes(key);
          });
          if (this.isTogether === true) {
            this.yaxisSecond = this.yaxisSecond.map((key, value) => {
              return this.timerService.secondConvertToMinutes(key);
            });
          }
        }
        break;
      }
      case ('diaper'): {
        this.requestUrl = '/statistics/diaper/';
        break;
      }
      case ('sleep'): {
        if (time === 'time') {
          this.yaxisFirst = this.yaxisFirst.map((key, value) => {
            return this.timerService.secondConvertToMinutes(key);
          });
          if (this.isTogether === true) {
            this.yaxisSecond = this.yaxisSecond.map((key, value) => {
              return this.timerService.secondConvertToMinutes(key);
            });
          }
        }
        break;
      }
      case ('growth'): {
        this.requestUrl = '/statistics/growth/';
        break;
      }
      case ('weight'): {
        this.requestUrl = '/statistics/growth/';
        break;
      }
    }
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


  //BAR CHART
  setBarChartExample() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      responsive: true,
      type: 'bar',
      data: {
        labels: this.xaxis,
        datasets: [{
          label: this.firstChild.name,
          data: this.yaxisFirst,
          backgroundColor: "#A2FFE0"
        }, {
          label: this.secondChild.name,
          data: this.yaxisSecond,
          backgroundColor: "#FFC0F3"
        }]
      },
      options: {
        title: {
          display: true,
          text: this.chartTitle,
          fontSize: 22,
          fontColor: "#fff"
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: this.chartStepSize,
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 0
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
      responsive: true,
      type: 'line',
      data: {
        labels: this.xaxis,
        datasets: [{
          label: this.firstChild.name,
          data: this.yaxisFirst,
          backgroundColor: "#A2FFE0",
          borderColor: "#A2FFE0",
          fill: false
        }, {
          label: this.secondChild.name,
          data: this.yaxisSecond,
          backgroundColor: "#FFC0F3",
          borderColor: "#FFC0F3",
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: this.chartTitle,
          fontSize: 22,
          fontColor: "#fff"
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: this.chartStepSize,
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 0
            }
          }]
        }
      }
    });
  }


  setPolarChartExample() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      responsive: true,
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
        }],
        title: {
          display: true,
          text: this.chartTitle,
          fontSize: 22,
          fontColor: "#fff"
        },
      }
    });
  }



  setPieChartExample() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      responsive: true,
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
        }],
        title: {
          display: true,
          text: this.chartTitle,
          fontSize: 22,
          fontColor: "#fff"
        },
      }
    });
  }

  setChart(type) {
    switch (type) {
      case ('line'): {
        this.setLineChartExample();
        break;
      }
      case ('bar'): {
        this.setBarChartExample();
        break;
      }
      case ('polar'): {
        this.setPolarChartExample();
        break;
      }
      case ('pie'): {
        this.setPieChartExample();
        break;
      }
    }
  }

  convertToFullTime(date) {
    return moment(date).format('DD/MM/YYYY - HH:mm');
  }

  convertToDateTime(date) {
    // return moment(date).format('DD/MM/YYYY');
    return moment(date).format('DD MMMM');
  }

  selectBreastChart(type) {
    if (this.isTogether === true) {
      this.chartTogether = "/together";
    } else {
      this.chartTogether = "";
    }
    switch (type) {
      case ('allcount'): {
        this.selectedTyped = "all";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniego ilości karmień";
        this.chartStepSize = 1;
        this.isTime = false;
        break;
      }
      case ('alltime'): {
        this.selectedTyped = "all/time";
        this.selectedChart = "line";
        this.chartTitle = "Wykres średniego czasu karmiena";
        this.chartStepSize = 5;
        this.isTime = true;
        break;
      }
      case ('weekcount'): {
        this.selectedTyped = "week";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniego ilości karmień";
        this.chartStepSize = 1;
        this.isTime = false;
        break;
      }
      case ('weektime'): {
        this.selectedTyped = "week/time";
        this.selectedChart = "line";
        this.chartTitle = "Wykres średniego czasu karmiena";
        this.chartStepSize = 5;
        this.isTime = true;
        break;
      }
      case ('monthcount'): {
        this.selectedTyped = "month";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniego ilości karmień";
        this.chartStepSize = 1;
        this.isTime = false;
        break;
      }
      case ('monthtime'): {
        this.selectedTyped = "month/time";
        this.selectedChart = "line";
        this.chartTitle = "Wykres średniego czasu karmiena";
        this.chartStepSize = 5;
        this.isTime = true;
        break;
      }
      case ('yearcount'): {
        this.selectedTyped = "year";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniego ilości karmień";
        this.chartStepSize = 1;
        this.isTime = false;
        break;
      }
      case ('yeartime'): {
        this.selectedTyped = "year/time";
        this.selectedChart = "line";
        this.chartTitle = "Wykres średniego czasu karmiena";
        this.chartStepSize = 5;
        this.isTime = true;
        break;
      }
    }
    /////// UNIWERSALNE
    this.requestService.postMethod(this.requestUrl + this.selectedTyped + this.chartTogether, this.requestData).subscribe(data => {
      console.log(data, '?????');
      if (this.isTogether === true) {
        this.setMutliAxis(data.data, this.isTime)
      } else {
        this.setSingleAxis(data.data, this.isTime)
      } this.setChart(this.selectedChart)
      this.loader = false;
    });
  }

  selectBottleChart(type) {
    if (this.isTogether === true) {
      this.chartTogether = "/together";
    } else {
      this.chartTogether = "";
    }
    switch (type) {
      case ('allvolume'): {
        this.selectedTyped = "all/volume";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniej ilości wypitego mleka";
        this.isTime = false;
        break;
      }
      case ('alltime'): {
        this.selectedTyped = "all/time";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniego czasu karmiena";
        this.isTime = true;
        break;
      }
      case ('weekvolume'): {
        this.selectedTyped = "week/volume";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniej ilości wypitego mleka";
        this.isTime = false;
        break;
      }
      case ('weektime'): {
        this.selectedTyped = "week/time";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniego czasu karmiena";
        this.isTime = true;
        break;
      }
      case ('monthvolume'): {
        this.selectedTyped = "month/volume";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniej ilości wypitego mleka";
        this.isTime = false;
        break;
      }
      case ('monthtime'): {
        this.selectedTyped = "month/time";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniego czasu karmiena";
        this.isTime = true;
        break;
      }
      case ('yearvolume'): {
        this.selectedTyped = "year/volume";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniej ilości wypitego mleka";
        this.isTime = false;
        break;
      }
      case ('yeartime'): {
        this.selectedTyped = "year/time";
        this.selectedChart = "bar";
        this.chartTitle = "Wykres średniego czasu karmiena";
        this.isTime = true;
        break;
      }
    }
    /////// UNIWERSALNE
    this.requestService.postMethod(this.requestUrl + this.selectedTyped + this.chartTogether, this.requestData).subscribe(data => {
      console.log(data, '?????');
      if (this.isTogether === true) {
        this.setMutliAxis(data.data, this.isTime)
      } else {
        this.setSingleAxis(data.data, this.isTime)
      } this.setChart(this.selectedChart)
      this.loader = false;
    });
  }

  selectDiaperChart(type) {
    this.chartTitle = "Wykres ilości zrobionych kupek";
    this.chartStepSize = 1;
    this.isTime = false;
    if (this.isTogether === true) {
      this.chartTogether = "/together";
    } else {
      this.chartTogether = "";
    }
    switch (type) {
      case ('all'): {
        this.selectedTyped = "all";
        this.selectedChart = "bar";
        break;
      }
      case ('week'): {
        this.selectedTyped = "week";
        this.selectedChart = "bar";
        break;
      }
      case ('month'): {
        this.selectedTyped = "month";
        this.selectedChart = "bar";
        break;
      }
      case ('year'): {
        this.selectedTyped = "year";
        this.selectedChart = "bar";
        break;
      }
    }
    /////// UNIWERSALNE
    this.requestService.postMethod(this.requestUrl + this.selectedTyped + this.chartTogether, this.requestData).subscribe(data => {
      console.log(data, '?????');
      if (this.isTogether === true) {
        this.setMutliAxis(data.data, this.isTime)
      } else {
        this.setSingleAxis(data.data, this.isTime)
      } this.setChart(this.selectedChart)
      this.loader = false;
    });
  }

  selectSleepChart(type) {
    this.chartTitle = "Wykres średniej długości spania";
    this.chartStepSize = null;
    this.isTime = true;
    if (this.isTogether === true) {
      this.chartTogether = "/together";
    } else {
      this.chartTogether = "";
    }
    switch (type) {
      case ('all'): {
        this.selectedTyped = "all";
        this.selectedChart = "bar";
        break;
      }
      case ('week'): {
        this.selectedTyped = "week";
        this.selectedChart = "bar";
        break;
      }
      case ('month'): {
        this.selectedTyped = "month";
        this.selectedChart = "bar";
        break;
      }
      case ('year'): {
        this.selectedTyped = "year";
        this.selectedChart = "bar";
        break;
      }
    }
    /////// UNIWERSALNE
    this.requestService.postMethod(this.requestUrl + this.selectedTyped + this.chartTogether, this.requestData).subscribe(data => {
      console.log(data, '?????');
      if (this.isTogether === true) {
        this.setMutliAxis(data.data, this.isTime)
      } else {
        this.setSingleAxis(data.data, this.isTime)
      } this.setChart(this.selectedChart)
      this.loader = false;
    });
  }

  selectWeightChart(type) {
    this.chartTitle = "Wykres zmian wagi";
    this.chartStepSize = 500;
    this.isTime = false;
    if (this.isTogether === true) {
      this.chartTogether = "/together";
    } else {
      this.chartTogether = "";
    }
    switch (type) {
      case ('all'): {
        this.selectedTyped = "all/weight";
        this.selectedChart = "line";
        break;
      }
      case ('week'): {
        this.selectedTyped = "week/weight";
        this.selectedChart = "line";
        break;
      }
      case ('month'): {
        this.selectedTyped = "month/weight";
        this.selectedChart = "line";
        break;
      }
      case ('year'): {
        this.selectedTyped = "year/weight";
        this.selectedChart = "line";
        break;
      }
    }
    /////// UNIWERSALNE
    this.requestService.postMethod(this.requestUrl + this.selectedTyped + this.chartTogether, this.requestData).subscribe(data => {
      console.log(data, '?????');
      if (this.isTogether === true) {
        this.setMutliAxis(data.data, this.isTime)
      } else {
        this.setSingleAxis(data.data, this.isTime)
      }
      this.setChart(this.selectedChart)
      this.loader = false;
    });
  }

  selectGrowthChart(type) {
    this.chartTitle = "Wykres zmian wzrostu";
    this.chartStepSize = 5;
    this.isTime = false;
    if (this.isTogether === true) {
      this.chartTogether = "/together";
    } else {
      this.chartTogether = "";
    }
    switch (type) {
      case ('all'): {
        this.selectedTyped = "all/length";
        this.selectedChart = "line";
        break;
      }
      case ('week'): {
        this.selectedTyped = "week/length";
        this.selectedChart = "line";
        break;
      }
      case ('month'): {
        this.selectedTyped = "month/length";
        this.selectedChart = "line";
        break;
      }
      case ('year'): {
        this.selectedTyped = "year/length";
        this.selectedChart = "line";
        break;
      }
    }
    /////// UNIWERSALNE
    this.requestService.postMethod(this.requestUrl + this.selectedTyped + this.chartTogether, this.requestData).subscribe(data => {
      console.log(data, '?????');
      if (this.isTogether === true) {
        this.setMutliAxis(data.data, this.isTime)
      } else {
        this.setSingleAxis(data.data, this.isTime)
      }
      this.setChart(this.selectedChart)
      this.loader = false;
    });
  }

}

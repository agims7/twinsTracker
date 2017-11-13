import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from "../../services/auth";
import { RequestService } from "../../services/request";

import * as _ from 'lodash';
import * as moment from 'moment';
import Chart from 'chart.js';

declare var AmCharts: any;

@IonicPage() @Component({
  selector: 'page-statistic-modal',
  templateUrl: 'statistic-modal.html',
})
export class StatisticModalPage {
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
    public authService: AuthService
  ) {
  }

  ionViewDidEnter() {
    console.log(this.navParams.data)
    this.paramData = this.navParams.data;
    let requestData = {
      token: this.authService.userToken,
    }
    this.requestService.getMethod('/diaper', requestData).subscribe(data => {
      console.log(data, '?????????????????????????');
      this.setAxis(data.data)
      this.setStepChart();
    });
  }

  setAxis(data) {
    for (let key of data) {

      this.xaxis.push(this.convertTime(key.date));
      this.yaxis.push(this.getDiaperType(key.type_id));
    }
    console.log( this.yaxis)
  }

  getDiaperType(data) {
    if (data === 1) {
      return 'kupka';
    } else {
      return 'siusu';
    }
  }

  setStepChart() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'line',
      labels: ['kupka', 'siku'],
      data: {
        datasets: [{
          data: this.yaxis,
          borderColor: '#e6e6e6',
          steppedLine: true,
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Wukres zmian pieluszek'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              // max: 3,
              fontColor: '#e6e6e6'
            },
            gridLines: {
              show: true,
              color: "#8c8c8c",
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: true,
              maxRotation: 75,
              minRotation: 75,
              fontColor: '#e6e6e6'
            },
            gridLines: {
              show: true,
              color: "#8c8c8c",
            }
          }]
        },
        legend: {
          display: false
        },
      },
    });
  }

  convertTime(date) {
    return moment(date).format('DD/MM/YYYY - HH:mm');
  }

}

import { Component, HostListener } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RequestService } from "../../services/request";

declare var AmCharts: any;

@Component({
  selector: 'page-statistic-modal',
  templateUrl: 'statistic-modal.html',
})
export class StatisticModalPage {
  public paramData: any;
  public chart: any;

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
    public requestService: RequestService
  ) {
  }

  ionViewDidEnter() {
    console.log(this.navParams.data)
    this.paramData = this.navParams.data;
    this.setChart();
    // this.requestService.getMethod('users').subscribe(data => {
    //   console.log(data, '?????????????????????????')
    //   data.data
    // });
  }

  setChart() {
    this.chart = AmCharts.makeChart("chartdiv", {
      "type": "pie",
      "theme": "light",
      "dataProvider": [{
        "country": "Lithuania",
        "litres": 501.9
      }, {
        "country": "Czech Republic",
        "litres": 301.9
      }, {
        "country": "Ireland",
        "litres": 201.1
      }, {
        "country": "Germany",
        "litres": 165.8
      }, {
        "country": "Australia",
        "litres": 139.9
      }, {
        "country": "Austria",
        "litres": 128.3
      }, {
        "country": "UK",
        "litres": 99
      }, {
        "country": "Belgium",
        "litres": 60
      }, {
        "country": "The Netherlands",
        "litres": 50
      }],
      "valueField": "litres",
      "titleField": "country",
      "balloon": {
        "fixedPosition": true
      },
      "export": {
        "enabled": true
      }
    });
  }

}

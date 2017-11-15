import { Injectable } from '@angular/core';

import { ChildrenService } from './children';

import * as moment from 'moment';

@Injectable()
export class TimerService {
    public breastFeedingInterval: any = [];
    public breastFeeding: any = [];
    public bottleFeedingInterval: any = [];
    public bottleFeeding: any = [];
    public sleepingInterval: any = [];
    public sleeping: any = [];
    public fecesDone = [];
    public urineDone = [];

    constructor(
        public childrenService: ChildrenService
    ) { }

    setTimerObjects() {
        for (let key in this.childrenService.children) {
            this.breastFeeding.push({
                running: false,
                miliseconds: 0,
                seconds: 0,
                minutes: 0,
                hours: 0,
            });
            this.bottleFeeding.push({
                running: false,
                miliseconds: 0,
                seconds: 0,
                minutes: 0,
                hours: 0,
            });
            this.sleeping.push({
                running: false,
                miliseconds: 0,
                seconds: 0,
                minutes: 0,
                hours: 0,
            });
        }
    }

    setDiaper() {
        this.fecesDone = [];
        this.urineDone = [];
        for (var key in this.childrenService.children) {
            this.urineDone.push(false);
            this.fecesDone.push(false);
        }
    }

    runBreastFeeding(index) {
        console.log('breast timer run ', this.breastFeeding[index].running);
        if (this.breastFeeding[index].running === false) {
            this.breastFeeding[index].running = true;
            this.breastFeedingInterval[index] = setInterval(() => {
                this.breastFeeding[index].miliseconds++;
                if (this.breastFeeding[index].miliseconds > 99) {
                    this.breastFeeding[index].miliseconds = 0;
                    this.breastFeeding[index].seconds++;
                    if (this.breastFeeding[index].seconds > 59) {
                        this.breastFeeding[index].seconds = 0;
                        this.breastFeeding[index].minutes++;
                        if (this.breastFeeding[index].minutes > 59) {
                            this.breastFeeding[index].minutes = 0;
                            this.breastFeeding[index].hours++;
                        }
                    }
                }
            }, 10);
        } else {
            clearInterval(this.breastFeedingInterval[index]);
            this.breastFeeding[index].running = false;
        }
    }

    clearBreastFeeding(index) {
        clearInterval(this.breastFeedingInterval[index]);
        this.breastFeeding[index].miliseconds = 0;
        this.breastFeeding[index].seconds = 0;
        this.breastFeeding[index].minutes = 0;
        this.breastFeeding[index].hours = 0;
    }

    runBottleFeeding(index) {
        console.log('bottle timer run ', this.bottleFeeding[index].running, 'index: ', index);
        if (this.bottleFeeding[index].running === false) {
            console.log('index runnin = false wiec trzeba uruchomic')
            this.bottleFeeding[index].running = true;
            this.bottleFeedingInterval[index] = setInterval(() => {
                this.bottleFeeding[index].miliseconds++;
                if (this.bottleFeeding[index].miliseconds > 99) {
                    this.bottleFeeding[index].miliseconds = 0;
                    this.bottleFeeding[index].seconds++;
                    if (this.bottleFeeding[index].seconds > 59) {
                        this.bottleFeeding[index].seconds = 0;
                        this.bottleFeeding[index].minutes++;
                        if (this.bottleFeeding[index].minutes > 59) {
                            this.bottleFeeding[index].minutes = 0;
                            this.bottleFeeding[index].hours++;
                        }
                    }
                }
            }, 10);
        } else {

            console.log('index runnin = true wiec trzeba zatrzymac')
            clearInterval(this.bottleFeedingInterval[index]);
            this.bottleFeeding[index].running = false;
        }
    }

    clearBottleFeeding(index) {
        clearInterval(this.bottleFeedingInterval[index]);
        this.bottleFeeding[index].miliseconds = 0;
        this.bottleFeeding[index].seconds = 0;
        this.bottleFeeding[index].minutes = 0;
        this.bottleFeeding[index].hours = 0;
    }

    runSleeping(index) {
        console.log('sleeping timer run ', this.sleeping[index].running, 'index: ', index);
        if (this.sleeping[index].running === false) {
            console.log('index runnin = false wiec trzeba uruchomic')
            this.sleeping[index].running = true;
            this.sleepingInterval[index] = setInterval(() => {
                this.sleeping[index].miliseconds++;
                if (this.sleeping[index].miliseconds > 99) {
                    this.sleeping[index].miliseconds = 0;
                    this.sleeping[index].seconds++;
                    if (this.sleeping[index].seconds > 59) {
                        this.sleeping[index].seconds = 0;
                        this.sleeping[index].minutes++;
                        if (this.sleeping[index].minutes > 59) {
                            this.sleeping[index].minutes = 0;
                            this.sleeping[index].hours++;
                        }
                    }
                }
            }, 10);
        } else {
            console.log('index runnin = true wiec trzeba zatrzymac')
            clearInterval(this.sleepingInterval[index]);
            this.sleeping[index].running = false;
        }
    }

    clearSleeping(index) {
        clearInterval(this.sleepingInterval[index]);
        this.sleeping[index].miliseconds = 0;
        this.sleeping[index].seconds = 0;
        this.sleeping[index].minutes = 0;
        this.sleeping[index].hours = 0;
    }

    toTime(date) {
        let newDate = new Date(date)
        return moment(newDate).format('HH:mm');
    }

    pad(num) {
        return ("0" + num).slice(-2);
    }

    secondConvert(date) {
        let minutes = Math.floor(date / 60);
        date = date % 60;
        let hours = Math.floor(minutes / 60)
        minutes = minutes % 60;
        if (hours > 0) {
            return this.pad(hours) + "h " + this.pad(minutes) + "m " + this.pad(date) + "s";
        } else if (minutes > 0) {
            return this.pad(minutes) + "m " + this.pad(date) + "s";
        } else {
            return this.pad(date) + "s";
        }
    }

}
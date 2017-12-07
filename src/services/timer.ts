import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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
        public childrenService: ChildrenService,
        public storage: Storage
    ) { }


    setTimerObjects() {
        let size = this.childrenService.children.length;
        for (let key in this.childrenService.children) {
            if (this.breastFeeding.length !== size) {
                this.breastFeeding.push({
                    running: false,
                    time: 0,
                });
            }
            if (this.bottleFeeding.length !== size) {
                this.bottleFeeding.push({
                    running: false,
                    time: 0,
                });
            }
            if (this.sleeping.length !== size) {
                this.sleeping.push({
                    running: false,
                    time: 0
                });
            }
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
        let stopTime = null;
        let startTime = null;
        let sumTime = null;
        if (this.breastFeeding[index].running === false) {
            this.storage.get(`breastFeedingTime[${index}]`).then((breastFeedingTime) => {
                if (breastFeedingTime !== null) {
                    console.log('breastFeedingTime ma wartość', breastFeedingTime)
                } else {
                    console.log('breastFeedingTime w bazie jest puste', breastFeedingTime)
                }
                startTime = new Date().getTime()
                this.storage.set(`breastFeedingStart[${index}]`, Number(startTime));
                this.breastFeeding[index].running = true;
                this.breastFeedingInterval[index] = setInterval(() => {
                    let time = (new Date().getTime() - startTime) / 1000;
                    this.breastFeeding[index].time = (time + breastFeedingTime).toFixed(2);
                }, 10);
            });
        } else {
            stopTime = new Date().getTime();
            this.storage.ready().then(() => {
                this.storage.get(`breastFeedingStart[${index}]`).then((breastFeedingStart) => {
                    let difference = ((new Date().getTime() - new Date(breastFeedingStart).getTime()) / 1000).toFixed(0);
                    this.storage.get(`breastFeedingTime[${index}]`).then((breastFeedingTime) => {
                        if (breastFeedingTime !== null) {
                            sumTime = Number(breastFeedingTime.toFixed(0)) + Number(difference);
                        } else {
                            sumTime = Number(difference);
                        }
                        this.storage.set(`breastFeedingTime[${index}]`, sumTime);
                    });
                });
            });
            clearInterval(this.breastFeedingInterval[index]);
            this.breastFeeding[index].running = false;
        }
    }

    clearBreastFeeding(index) {
        clearInterval(this.breastFeedingInterval[index]);
        this.breastFeeding[index].time = 0;
        this.storage.remove(`breastFeedingStart[${index}]`);
        this.storage.remove(`breastFeedingTime[${index}]`);
    }

    runBottleFeeding(index) {
        let stopTime = null;
        let startTime = null;
        let sumTime = null;
        if (this.bottleFeeding[index].running === false) {
            this.storage.get(`bottleFeedingTime[${index}]`).then((bottleFeedingTime) => {
                if (bottleFeedingTime !== null) {
                    console.log('bottleFeedingTime ma wartość', bottleFeedingTime)
                } else {
                    console.log('bottleFeedingTime w bazie jest puste', bottleFeedingTime)
                }
                startTime = new Date().getTime()
                this.storage.set(`bottleFeedingStart[${index}]`, Number(startTime));
                this.bottleFeeding[index].running = true;
                this.bottleFeedingInterval[index] = setInterval(() => {
                    let time = (new Date().getTime() - startTime) / 1000;
                    this.bottleFeeding[index].time = (time + bottleFeedingTime).toFixed(2);
                }, 10);
            });
        } else {
            stopTime = new Date().getTime();
            this.storage.ready().then(() => {
                this.storage.get(`bottleFeedingStart[${index}]`).then((bottleFeedingStart) => {
                    let difference = ((new Date().getTime() - new Date(bottleFeedingStart).getTime()) / 1000).toFixed(0);
                    this.storage.get(`bottleFeedingTime[${index}]`).then((bottleFeedingTime) => {
                        if (bottleFeedingTime !== null) {
                            sumTime = Number(bottleFeedingTime.toFixed(0)) + Number(difference);
                        } else {
                            sumTime = Number(difference);
                        }
                        this.storage.set(`bottleFeedingTime[${index}]`, sumTime);
                    });
                });
            });
            clearInterval(this.bottleFeedingInterval[index]);
            this.bottleFeeding[index].running = false;
        }
    }

    clearBottleFeeding(index) {
        clearInterval(this.bottleFeedingInterval[index]);
        this.bottleFeeding[index].time = 0;
        this.storage.remove(`bottleFeedingStart[${index}]`);
        this.storage.remove(`bottleFeedingTime[${index}]`);
    }

    runSleeping(index) {
        let stopTime = null;
        let startTime = null;
        let sumTime = null;
        if (this.sleeping[index].running === false) {
            this.storage.get(`sleepingTime[${index}]`).then((sleepingTime) => {
                if (sleepingTime !== null) {
                    console.log('sleepingTime ma wartość', sleepingTime)
                } else {
                    console.log('sleepingTime w bazie jest puste', sleepingTime)
                }
                startTime = new Date().getTime()
                this.storage.set(`sleepingStart[${index}]`, Number(startTime));
                this.sleeping[index].running = true;
                this.sleepingInterval[index] = setInterval(() => {
                    let time = (new Date().getTime() - startTime) / 1000;
                    this.sleeping[index].time = (time + sleepingTime).toFixed(2);
                }, 10);
            });
        } else {
            stopTime = new Date().getTime();
            this.storage.ready().then(() => {
                this.storage.get(`sleepingStart[${index}]`).then((sleepingStart) => {
                    let difference = ((new Date().getTime() - new Date(sleepingStart).getTime()) / 1000).toFixed(2);
                    this.storage.get(`sleepingTime[${index}]`).then((sleepingTime) => {
                        if (sleepingTime !== null) {
                            sumTime = Number(sleepingTime.toFixed(2)) + Number(difference);
                        } else {
                            sumTime = Number(difference);
                        }
                        this.storage.set(`sleepingTime[${index}]`, sumTime);
                    });
                });
            });
            clearInterval(this.sleepingInterval[index]);
            this.sleeping[index].running = false;
        }
    }

    clearSleeping(index) {
        clearInterval(this.sleepingInterval[index]);
        this.sleeping[index].time = 0;
        this.storage.remove(`sleepingStart[${index}]`);
        this.storage.remove(`sleepingTime[${index}]`);
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
        } else if (date > 0) {
            return this.pad(date) + "s";
        } else {
            return "----";
        }
    }

    miliSecondConvert(date) {
        let miliseconds = Number(((date % 1) * 10).toFixed(0));
        if (miliseconds == 10) {
            miliseconds = 0;
        }
        let seconds = Math.floor(date % 60);
        let minutes = Math.floor(date / 60);
        let hours = Math.floor(minutes / 60)
        minutes = minutes % 60;
        if (hours > 0) {
            return this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(seconds) + ":" + this.pad(miliseconds);
        } else if (minutes > 0) {
            return this.pad(minutes) + ":" + this.pad(seconds) + ":" + this.pad(miliseconds);
        } else if (seconds > 0) {
            return this.pad(seconds) + ":" + miliseconds;
        } else if (miliseconds > 0) {
            return miliseconds;
        } else {
            return "----";
        }
    }

    secondConvertToMinutes(date) {
        return Math.ceil(date / 60);
    }

}
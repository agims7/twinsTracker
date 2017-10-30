import { Injectable } from '@angular/core';

import { ChildrenService } from './children';

@Injectable()
export class TimerService {
    public breastFeedingInterval
    public breastFeeding = {
        running: false,
        miliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
    };
    public bottleFeedingInterval
    public bottleFeeding = {
        running: false,
        miliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
    };
    public sleepingInterval
    public sleeping = {
        running: false,
        miliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
    };
    public test: any = [];

    constructor(
        public childrenService: ChildrenService
    ) { }

    setTimerObjects() {
        console.log('test')
        for (let key in this.childrenService.children) {
            console.log(key)
            this.test.push({
                running: false,
                miliseconds: 0,
                seconds: 0,
                minutes: 0,
                hours: 0,
            });
        }
        console.log(this.test)
    }

    runBreastFeeding() {
        console.log('breast timer run ', this.breastFeeding.running);
        if (this.breastFeeding.running === false) {
            this.breastFeeding.running = true;
            this.breastFeedingInterval = setInterval(() => {
                this.breastFeeding.miliseconds++;
                if (this.breastFeeding.miliseconds > 99) {
                    this.breastFeeding.miliseconds = 0;
                    this.breastFeeding.seconds++;
                    if (this.breastFeeding.seconds > 59) {
                        this.breastFeeding.seconds = 0;
                        this.breastFeeding.minutes++;
                        if (this.breastFeeding.minutes > 59) {
                            this.breastFeeding.minutes = 0;
                            this.breastFeeding.hours++;
                        }
                    }
                }
            }, 10);
        } else {
            clearInterval(this.breastFeedingInterval);
            this.breastFeeding.running = false;
        }
    }

    clearBreastFeeding() {
        clearInterval(this.breastFeedingInterval);
        this.breastFeeding.miliseconds = 0;
        this.breastFeeding.seconds = 0;
        this.breastFeeding.minutes = 0;
        this.breastFeeding.hours = 0;
    }

    runBottleFeeding() {
        console.log('bottle timer run ', this.bottleFeeding.running);
        if (this.bottleFeeding.running === false) {
            this.bottleFeeding.running = true;
            this.bottleFeedingInterval = setInterval(() => {
                this.bottleFeeding.miliseconds++;
                if (this.bottleFeeding.miliseconds > 99) {
                    this.bottleFeeding.miliseconds = 0;
                    this.bottleFeeding.seconds++;
                    if (this.bottleFeeding.seconds > 59) {
                        this.bottleFeeding.seconds = 0;
                        this.bottleFeeding.minutes++;
                        if (this.bottleFeeding.minutes > 59) {
                            this.bottleFeeding.minutes = 0;
                            this.bottleFeeding.hours++;
                        }
                    }
                }
            }, 10);
        } else {
            clearInterval(this.bottleFeedingInterval);
            this.bottleFeeding.running = false;
        }
    }

    clearBottleFeeding() {
        clearInterval(this.bottleFeedingInterval);
        this.bottleFeeding.miliseconds = 0;
        this.bottleFeeding.seconds = 0;
        this.bottleFeeding.minutes = 0;
        this.bottleFeeding.hours = 0;
    }

    runSleeping() {
        console.log('sleeping timer run ', this.sleeping.running);
        if (this.sleeping.running === false) {
            this.sleeping.running = true;
            this.sleepingInterval = setInterval(() => {
                this.sleeping.miliseconds++;
                if (this.sleeping.miliseconds > 99) {
                    this.sleeping.miliseconds = 0;
                    this.sleeping.seconds++;
                    if (this.sleeping.seconds > 59) {
                        this.sleeping.seconds = 0;
                        this.sleeping.minutes++;
                        if (this.sleeping.minutes > 59) {
                            this.sleeping.minutes = 0;
                            this.sleeping.hours++;
                        }
                    }
                }
            }, 10);
        } else {
            clearInterval(this.sleepingInterval);
            this.sleeping.running = false;
        }
    }

    clearSleeping() {
        clearInterval(this.sleepingInterval);
        this.sleeping.miliseconds = 0;
        this.sleeping.seconds = 0;
        this.sleeping.minutes = 0;
        this.sleeping.hours = 0;
    }

}
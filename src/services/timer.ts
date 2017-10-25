import { Injectable } from '@angular/core';

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

    constructor(
    ) { }

    runBreastFeeding() {
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

    startBottleFeeding() {
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
        }, 1000);
    }

    pauseBottleFeeding() {
        clearInterval(this.bottleFeedingInterval);
    }

    clearBottleFeeding() {
        clearInterval(this.bottleFeedingInterval);
        this.bottleFeeding.seconds = 0;
        this.bottleFeeding.minutes = 0;
        this.bottleFeeding.hours = 0;
    }

    startSleeping() {
        this.sleepingInterval = setInterval(() => {
            this.sleeping.seconds++;
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
        }, 1000);
    }

    pauseSleeping() {
        clearInterval(this.sleepingInterval);
    }

    clearSleeping() {
        clearInterval(this.sleepingInterval);
        this.sleeping.seconds = 0;
        this.sleeping.minutes = 0;
        this.sleeping.hours = 0;
    }

}
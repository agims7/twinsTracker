import { Injectable } from '@angular/core';

import { ActivityPage } from "../pages/activity/activity";
import { BootleFeedingPage } from "../pages/bootle-feeding/bootle-feeding";
import { BreastFeedingPage } from "../pages/breast-feeding/breast-feeding";
import { DiaperPage } from "../pages/diaper/diaper";
import { GrowthPage } from "../pages/growth/growth";
import { MedicinePage } from "../pages/medicine/medicine";
import { SleepingPage } from "../pages/sleeping/sleeping";
import { StatisticsPage } from "../pages/statistics/statistics";
import { TimetablePage } from "../pages/timetable/timetable";

@Injectable()
export class CategoriesService {
    activityPage = ActivityPage;
    bootleFeedingPage = BootleFeedingPage;
    breastFeedingPage = BreastFeedingPage;
    diaperPage = DiaperPage;
    growthPage = GrowthPage;
    medicinePage = MedicinePage;
    sleepingPage = SleepingPage;
    statisticsPage = StatisticsPage;
    timetablePage = TimetablePage;

    public categories = [
        {
            name: this.breastFeedingPage,
            color: "#5ADBA9",
            text: "Karmienie piersią",
            icon: "./assets/images/breast.svg"
        },
        {
            name: this.bootleFeedingPage,
            color: "#CFF4FF",
            text: "Karmienie butelką",
            icon: "./assets/images/bootle.svg"
        },
        {
            name: this.diaperPage,
            color: "#F5CFB3",
            text: "Pieluszka",
            icon: "./assets/images/diaper.svg"
        },
        {
            name: this.medicinePage,
            color: "#E8E8E8",
            text: "Lekarstwa",
            icon: "./assets/images/medicine.svg"
        },
        {
            name: this.sleepingPage,
            color: "#FFFFCF",
            text: "Spanie",
            icon: "./assets/images/sleeping.svg"
        },
        {
            name: this.growthPage,
            color: "#5DC2A6",
            text: "Wzrost",
            icon: "./assets/images/growth.svg"
        },
        {
            name: this.activityPage,
            color: "#6ECEEB",
            text: "Aktywność",
            icon: "./assets/images/activity.svg"
        },
        {
            name: this.statisticsPage,
            color: "#E26A6A",
            text: "Statystyki",
            icon: "./assets/images/statistics.svg"
        },
        {
            name: this.timetablePage,
            color: "#D2F1D0",
            text: "Terminarz",
            icon: "./assets/images/timetable.svg"
        }
    ];

    constructor(
    ) { }


}
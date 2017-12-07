import { Injectable } from '@angular/core';

import { ActivityPage } from "../pages/activity/activity";
import { BottleFeedingPage } from "../pages/bottle-feeding/bottle-feeding";
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
    bottleFeedingPage = BottleFeedingPage;
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
            text: {
                pl: "Karmienie piersią",
                en: "Breast feeding"
            },
            icon: "./assets/images/breast.svg"
        },
        {
            name: this.bottleFeedingPage,
            color: "#CFF4FF",
            text: {
                pl: "Karmienie butelką",
                en: "Breast feeding"
            },
            icon: "./assets/images/bottle.svg"
        },
        {
            name: this.diaperPage,
            color: "#F5CFB3",
            text: {
                pl: "Pieluszka",
                en: "Diaper"
            },
            icon: "./assets/images/diaper.svg"
        },
        {
            name: this.medicinePage,
            color: "#E8E8E8",
            text: {
                pl: "Lekarstwa",
                en: "Medicines"
            },
            icon: "./assets/images/medicine.svg"
        },
        {
            name: this.sleepingPage,
            color: "#FFFFCF",
            text: {
                pl: "Spanie",
                en: "Sleeping"
            },
            icon: "./assets/images/sleeping.svg"
        },
        {
            name: this.growthPage,
            color: "#5DC2A6",
            text: {
                pl: "Wzrost",
                en: "Growth"
            },
            icon: "./assets/images/growth.svg"
        },
        {
            name: this.activityPage,
            color: "#6ECEEB",
            text: {
                pl: "Aktywność",
                en: "Activity"
            },
            icon: "./assets/images/activity.svg"
        },
        {
            name: this.statisticsPage,
            color: "#E26A6A",
            text: {
                pl: "Statystyki",
                en: "Statistics"
            },
            icon: "./assets/images/statistics.svg"
        },
        {
            name: this.timetablePage,
            color: "#D2F1D0",
            text: {
                pl: "Terminarz",
                en: "Timetable"
            },
            icon: "./assets/images/timetable.svg"
        }
    ];

    constructor(
    ) { }


}
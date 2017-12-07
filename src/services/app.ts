import { Injectable } from '@angular/core';


@Injectable()
export class AppService {
    public object: any = {
        pl: {
            monday: false,
            weekdays: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
            months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
        },
        en: {
            monday: false,
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
    };

    constructor() { }

    safeUnsubscribe(subscription) {
        try {
            subscription.unsubscribe();
        }
        catch (err) {
            if (typeof subscription !== 'undefined') {
                console.log('unsubscribe error: ', err);
            }
        }
    }

}
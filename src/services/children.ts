import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class ChildrenService {
    public children: any = [];

    constructor(
    ) { }

    getChildNameFromId(id) {
        let childIndex = _.findIndex(this.children, { 'id': id });
        return this.children[childIndex].name;
    }

    getChildPhotoFromId(id) {
        let childIndex = _.findIndex(this.children, { 'id': id });
        let photo = this.children[childIndex].photo;
        if (!photo || photo == null) {
            return "http://via.placeholder.com/150x150";
        } else {
            return photo;
        }
    }

}
import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class ChildrenService {
    public children: any[] = [];

    constructor(
    ) { }

    getChildNameFromId(id: number): string {
        let childIndex = _.findIndex(this.children, { 'id': id });
        return this.children[childIndex].name;
    }

    getChildPhotoFromId(id: number): string {
        let childIndex = _.findIndex(this.children, { 'id': id });
        if (this.children[childIndex].photo) {
            let photo = this.children[childIndex].photo;
            if (!photo || photo == null) {
                return "http://via.placeholder.com/150x150";
            } else {
                return photo;
            }
        } else {
            return "http://via.placeholder.com/150x150";
        }
    }

}
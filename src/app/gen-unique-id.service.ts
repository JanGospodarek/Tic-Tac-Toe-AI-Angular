import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenUniqueIdService {
  constructor() {}
  getUniqueId(): string {
    const stringArr = [];
    for (let i = 0; i < 2; i++) {
      const S4 = (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
  }

  getItem(item: string): any {
    console.log('getItem');
    return JSON.parse(localStorage.getItem(item));
  }

  setItem(key: string, item: any): void {
    console.log('setItem');
    localStorage.setItem(key, JSON.stringify(item));
  }
}

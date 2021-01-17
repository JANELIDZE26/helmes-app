import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem(item: string): any {
    return JSON.parse(localStorage.getItem(item));
  }

  setItem(key: string, item: any): void {
    localStorage.setItem(key, JSON.stringify(item));
  }
}

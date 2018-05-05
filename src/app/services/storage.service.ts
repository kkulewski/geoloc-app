import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  private static readonly TOKEN = 'auth_token';
  private static readonly ID = 'user_id';
  private static readonly NAME = 'user_name';

  public get authToken() {
    return localStorage.getItem(StorageService.TOKEN);
  }

  public set authToken(token: string) {
    localStorage.setItem(StorageService.TOKEN, token);
  }

  public get userId() {
    return localStorage.getItem(StorageService.ID);
  }

  public set userId(id: string) {
    localStorage.setItem(StorageService.ID, id);
  }

  public get userName() {
    return localStorage.getItem(StorageService.NAME);
  }

  public set userName(name: string) {
    localStorage.setItem(StorageService.NAME, name);
  }

  public clear() {
    localStorage.removeItem(StorageService.TOKEN);
    localStorage.removeItem(StorageService.ID);
    localStorage.removeItem(StorageService.NAME);
  }
}

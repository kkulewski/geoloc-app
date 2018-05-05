import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  public get authToken() {
    return localStorage.getItem('auth_token');
  }

  public set authToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  public get userId() {
    return localStorage.getItem('user_id');
  }

  public set userId(id: string) {
    localStorage.setItem('user_id', id);
  }

  public get userName() {
    return localStorage.getItem('user_name');
  }

  public set userName(name: string) {
    localStorage.setItem('user_name', name);
  }

  public clear() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
  }
}

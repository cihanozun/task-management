import { Injectable } from '@angular/core';


const TOKEN ='token';
const USER ='user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any {
   return JSON.parse(window.localStorage.getItem(USER));
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : null;
  }

  static isAdminLoggedIn(): boolean {
    if(this.getToken() === null ){
      return false;
    }
    const role = this.getUserRole();
    return role === 'ADMIN';
  }

  static isEmployeeLoggedIn(): boolean {
    if(this.getToken() === null ){
      return false;
    }
    const role = this.getUserRole();
    return role === 'EMPLOYEE';
  }

  static getUserId(): number {
    const user = this.getUser();
    return user ? user.id : null;
  }

  static logOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}

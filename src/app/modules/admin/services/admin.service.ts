import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const API_URL = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<any> {
    return this.http.get(API_URL + "api/admin/users", {
      headers: this.createAuthorizationHeader()
    })
  }

  postTask(taskDTO):Observable<any> {
    return this.http.post(API_URL + "api/admin/task",taskDTO, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllTasks():Observable<any> {
    return this.http.get(API_URL + "api/admin/tasks", {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteTask(id: number):Observable<any> {
    return this.http.delete(API_URL + "api/admin/task/"+id, {
      headers: this.createAuthorizationHeader()
    })
  }

  getTaskById(id: number):Observable<any> {
    return this.http.get(API_URL + "api/admin/task/"+id, {
      headers: this.createAuthorizationHeader()
    })
  }

  updateTask(id: number, taskDTO: any):Observable<any> {
    return this.http.put(API_URL + `api/admin/task/${id}`,taskDTO, {
      headers: this.createAuthorizationHeader()
    })
  }

  searchTask(title: number):Observable<any> {
    return this.http.get(API_URL + `api/admin/tasks/search/${title}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): any {
    return new HttpHeaders().set('Authorization', 'Bearer ' + StorageService.getToken());
  }
}

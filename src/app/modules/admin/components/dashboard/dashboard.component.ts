import { Component, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent {
  listofTasks: any[] = [];
  searchForm!: FormGroup;
  isClearVisible: boolean = false;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ){
    this.getTasks();
    this.searchForm = this.fb.group({
      title: ['']
    });
    
  }


  getTasks() {
    this.adminService.getAllTasks().subscribe(res => {
      this.listofTasks = res;
      console.log(res);
      
    })
  }

  deleteTask(id: number) {
    this.adminService.deleteTask(id).subscribe( res =>{
      this.snackBar.open("Task deleted successfully", "OK", {duration: 2000,});
      this.getTasks();
    })
  }

  searchTask() {
    this.listofTasks = [];
    this.isClearVisible = true;
    const title = this.searchForm.value.title;
    this.adminService.searchTask(title).subscribe(res => {
      this.listofTasks = res;
      console.log(res);
    })
  }

  clearSearch() {
    this.getTasks();
    this.isClearVisible = false;
  }
}

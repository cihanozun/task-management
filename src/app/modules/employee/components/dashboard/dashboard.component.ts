import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  listofTasks: any[] = [];

  constructor(private employeeService: EmployeeService,
              private snackBar: MatSnackBar,
  ) {

    this.getTasks();
  }

  getTasks(){
    this.employeeService.getEmployeeTasksById().subscribe(res => {
      this.listofTasks = res;
      console.log(this.listofTasks);
    })
  }

  updateStatus(id:number, status:string){
    this.employeeService.updateStatus(id,status).subscribe(res => {
      if(res.id != null){
        this.snackBar.open("Status Updated Successfully", "OK", {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        this.getTasks();
      }else{
        this.snackBar.open("Error in Updating Status", "OK", {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })
  }


}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-task-details',
  templateUrl: './view-task-details.component.html',
  styleUrls: ['./view-task-details.component.scss']
})
export class ViewTaskDetailsComponent {
    taskId: number= this.route.snapshot.params['id'];
    taskData: any;
    comments: any;
    commentForm!: FormGroup

  constructor(private service : EmployeeService,
      private route : ActivatedRoute,
      private fb: FormBuilder,
      private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
      this.getTaskById();
      this.getComments();
      this.commentForm = this.fb.group({
        content: [null, Validators.required]
      })
    }
  
    getTaskById(){
      this.service.getTaskById(this.taskId).subscribe(res => {
        this.taskData = res;
      })  
    }
  
    getComments(){
      this.service.getCommentsByTask(this.taskId).subscribe(res => {
        this.comments = res;
      })
  }

  publishComment(){
    this.service.createComment(this.taskId, this.commentForm.get('content')?.value).subscribe(res => {
      if(res.id != null){
        this.snackBar.open("Comment Published Successfully", "OK", {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        this.getTaskById();
        this.getComments();
      }else {
        this.snackBar.open("Error in Publishing Comment", "OK", {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    }
    )
  }
}

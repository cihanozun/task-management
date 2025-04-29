import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form : FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
          email: [null,[Validators.required, Validators.email]],
          password: [null,[Validators.required, Validators.minLength(5)]],
        })
  }
  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }
  toggleConfirmPasswordVisibility(){
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit(){
    console.log(this.form.value);
    this.authService.login(this.form.value).subscribe((res) => {
      if(res.userId !== null){
        const user = {
          id: res.userId,
          role: res.userRole
        }
        StorageService.saveUser(user);
        StorageService.setToken(res.jwt);

        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard');

        }else if(StorageService.isEmployeeLoggedIn()){
          this.router.navigateByUrl('employee/dashboard');

        }

        this.snackBar.open('Login successfully!', 'Close', {
          duration: 3000,})
      }
      else {
        this.snackBar.open('Invalid credentials!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    })
  }
}

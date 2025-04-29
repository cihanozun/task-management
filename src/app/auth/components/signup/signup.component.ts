import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  form: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router
            )
          {
      this.form = this.fb.group({
        name: [null,[Validators.required]],
        email: [null,[Validators.required, Validators.email]],
        password: [null,[Validators.required, Validators.minLength(6)]],
        confirmPassword: [null,[Validators.required, Validators.minLength(6)]]
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
    const confirmPassword = this.form.get('confirmPassword')?.value;
    const password = this.form.get('password')?.value;
    if(confirmPassword !== password){
      this.snackBar.open('Passwords do not match', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }
    this.authService.signup(this.form.value).subscribe((res) => {
      if(res.id !== null){
        this.snackBar.open('Sign up successfully!', 'Close', {
          duration: 3000,})
          this.router.navigateByUrl('login');
      }else{
        this.snackBar.open('Sign up failed, Try Again!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    })
  }
}

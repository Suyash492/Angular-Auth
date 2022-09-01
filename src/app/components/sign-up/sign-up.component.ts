import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

import { AuthenticationService } from 'src/app/services/authentication.service';


export function passwordsMatchValidators(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
  const password =control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if(password && confirmPassword && password !== confirmPassword){
    return{
      passwordsDonMatch: true
    }; }
    else {
      return null;
    }
  
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required)
  }, {validators:passwordsMatchValidators()})
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
  ) { }

  ngOnInit(): void {}
    get name(){
      return this.signUpForm.get('name');
    }

    get email(){
      return this.signUpForm.get('email')
    }
    get password() {
      return this.signUpForm.get('password');
    }
  
    get confirmPassword() {
      return this.signUpForm.get('confirmPassword');
    }

    submit() {
      if (!this.signUpForm.valid ) 
        return;
        const {name,email,password} =this.signUpForm.value;

      this.authService.signUp(name as string,email as string,password as string).pipe(
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing up...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

    }
  
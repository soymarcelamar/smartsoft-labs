import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email.valid && this.password.valid) {
      let loginForm: Object = [
        { email: this.email.value },
        { password: this.password.value },
      ]
      this.loginService.login(loginForm as LoginRequest).subscribe({
        next: (userInfo: any) => {
          console.log(userInfo);
        },
        error: (errors: any) => {
          console.log(errors);
        },
        complete: () => {
          console.info('Login completo');
          this.router.navigateByUrl('/inicio');
          this.email.reset();
          this.password.reset();
        }
      });
    }
    else {
      this.email.markAllAsTouched();
      this.password.markAllAsTouched();
    }
  };

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un correo válido';
    }
    return this.email.hasError('email') ? 'El correo no es válido' : '';
    
  }
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Debes ingresar una contraseña' : '';
  }
};

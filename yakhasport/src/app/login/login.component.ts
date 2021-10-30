import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../shared/user.service';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  createUserForm: FormGroup;

  isLogged: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly userService: UserService
  ) {
    // vérifier si  loggé?
    // this.isLogged = false;
    console.log(this.userService.isLogged());
    this.isLogged = this.userService.isLogged() === undefined ? false : true;

    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      mdp: new FormControl('', Validators.required),
    });

    this.createUserForm = this.fb.group({
      username: new FormControl('', Validators.required),
      mdp: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
    });
  }

  ngOnInit(): void {
    // this.buildForm();
  }

  buildForm(): void {}

  LogIn(): void {
    const { username, mdp } = this.loginForm.value;

    this.loginService
      .login(username, mdp)
      .toPromise()
      .then((res) => {
        console.log(res);
        localStorage.setItem('ACCESS_TOKEN', res.access_token);
        this.isLogged = true;
      });
  }

  createUser(): void {
    console.log(this.createUserForm.value);

    const { username, mdp, nom, prenom, email } = this.createUserForm.value;
    this.loginService
      .createUser(username, mdp, nom, prenom, email)
      .toPromise()
      .then((res) => {
        console.log(res);
        localStorage.setItem('ACCESS_TOKEN', res.access_token);
      })
      .catch((err) => {
        console.log(err.message);
        this.isLogged = false;
        switch (err.error.message) {
          case `Ce nom d'utilisateur est déjà utilisé`:
            this.createUserForm.get('username').setErrors({ notUnique: true });
            break;

          case `Cet email est déjà utilisé`:
            this.createUserForm.get('email').setErrors({ notUnique: true });
            break;

          default:
            break;
        }
        // this.createUserForm.get('username').hasError('notUnique')
      });
  }

  deconnexion(): void {
    localStorage.removeItem('ACCESS_TOKEN');
    this.isLogged = false;
  }
}

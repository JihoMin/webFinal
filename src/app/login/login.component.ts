import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  afAuth: AngularFireAuth;

  constructor( private authService: AuthService,
            ) { }

  ngOnInit() {
    this.afAuth = this.authService.afAuth;
  }
  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }

}

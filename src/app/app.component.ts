import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';

import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heros';
  afAuth: AngularFireAuth;
  userEmail: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  
  ngOnInit(){
    this.afAuth = this.authService.afAuth;
    this.userEmail = this.authService.userEmail;
    console.log(this.userEmail);
  }

  goMypage(){
    this.userEmail = this.authService.userEmail;
    this.router.navigate([`/${this.userEmail}`], { relativeTo: this.route });
  }

  logout() {
    this.authService.logout();
    this.router.navigate([`/dashboard`], {relativeTo: this.route});
  }
}

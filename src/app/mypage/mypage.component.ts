import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../User';
import { Like } from '../like';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { QuerySnapshot, DocumentSnapshot } from '@firebase/firestore-types';


import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {
  @Input() user: User;
 
  displayedColumns = ['name', 'timestamp'];
  
  afAuth: AngularFireAuth;

  userC: Observable<firebase.User>;
  userDetails: firebase.User;
  userEmail: string;

  userCol: AngularFirestoreCollection<any> = this.afs.collection('User');
  userDoc: AngularFirestoreDocument<User>;

  likeCol: AngularFirestoreCollection<Like>;
  likes: Observable<Like[]>;
  dataSource: Like[];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    this.afAuth = this.authService.afAuth;
    this.getUser();
    this.getLikes();
  }

  getUser(){
    const id = this.route.snapshot.paramMap.get('id');
    this.authService.getUser(id)
        .subscribe(user => this.user = user);
    console.log(this.user);
  }

  getLikes(){
    this.userC = this.afAuth.authState;
    this.userC.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.userEmail = this.userDetails.email;
          console.log(this.userEmail);
          this.likeCol = this.userCol.doc(this.userEmail).collection('Like');
          this.likes = this.likeCol.valueChanges();
          this.likes.subscribe(likes => {
            this.dataSource = likes as Like[];
            
          })
        }
      }
    );
    
  }
  save(){
    this.authService.update(this.user);
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
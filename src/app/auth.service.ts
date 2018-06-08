import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { QuerySnapshot, DocumentSnapshot } from '@firebase/firestore-types';

import { User } from './User';
import { Hero } from './hero';
import { Like } from './like';
import { hmrModule } from '@angularclass/hmr';

import { Component, OnInit, Input, OnChanges } from '@angular/core';


@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  userDetails: firebase.User;
  userEmail: string;

  userCol: AngularFirestoreCollection<any> = this.afs.collection('User');
  userDoc: AngularFirestoreDocument<User>;
  userObj: Observable<User>;
  userobs = this.userCol.valueChanges();

  likeCol: AngularFirestoreCollection<Like>;
  likes: Observable<Like[]>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.user = this.afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.userEmail = this.userDetails.email;
          console.log(this.userEmail);
          this.initUserInfo(this.userEmail);
        }
      }
    );
  }
  ngOnInit(){
    this.user = this.afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.userEmail = this.userDetails.email;
          console.log(this.userEmail);
          this.initUserInfo(this.userEmail);
        }
      }
    );
  }
  ngAfterViewInit(){
    this.user = this.afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.userEmail = this.userDetails.email;
          console.log(this.userEmail);
          this.initUserInfo(this.userEmail);
        }
      }
    );
  }

  getLikes(){
    console.log(this.userEmail);
  }

  addToUserLike(hero: Hero){

    console.log(this.userEmail);
    console.log(this.userDetails);
    this.userCol.doc(this.userEmail).collection('Like').doc(hero.id)
      .set({
        name: hero.name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  update(user: User){
    this.userCol.doc(user.userID).update({
      age: user.age,
      nickname: user.nickname
    })
  }

  getUser(id: string): Observable<User>{
    let user: User = new User();
    this.userCol.doc(id).ref
      .get()
      .then((doc)=>{
          user.userID = doc.data().userID;
          user.age = doc.data().age;
          user.nickname = doc.data().nickname;
      })

    return of(user);
  }
  login() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    this.afAuth.auth.signInWithPopup(provider);
    this.user = this.afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.userEmail = this.userDetails.email;
          console.log(this.userEmail);
          this.initUserInfo(this.userEmail);
        }
      }
    );
  }

  initUserInfo(userEmail: string){
    var userRef = this.userCol.doc(userEmail).ref
    .get()
    .then((doc)=>{
      if(!doc.exists){
        console.log("empty");
        this.userCol.doc(userEmail).set({
          userID: userEmail,
          nickname: 'default',
          age: 0
        })
      }
    })
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}

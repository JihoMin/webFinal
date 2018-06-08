import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class MessageService {
  messages: string[] = [];
  constructor(public snackBar: MatSnackBar){}
  add(message: string){
    this.snackBar.open(message, 'Yaho', {
      duration: 2000,
    })
  }
  clear(){
    this.messages=[];
  }
}

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HeroService }  from '../hero.service';

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Hero } from '../hero';
import { AngularFireStorage, 
         AngularFireStorageReference,
         AngularFireUploadTask,
         } from 'angularfire2/storage';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})


export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  ngOnChanges(){
  }
  
  downloadURL: Observable<string>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  url: string;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private afStorage: AngularFireStorage
  ) { }
  upload(event){
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(randomId);
    this.task = this.ref.put(event.target.files[0]);
    this.downloadURL = this.task.downloadURL();
    this.downloadURL.subscribe(value => {
      this.hero.imgURL = value;
    })
  }
  updateHero(){
    this.heroService.updateHero(this.hero);
    this.location.back();
  }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }

}

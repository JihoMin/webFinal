import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';
import { Hero } from '../hero';
@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.css']
})

 
export class HeroAddComponent implements OnInit {

  hero: Hero;

  constructor(
    private heroService: HeroService,
    private location: Location,
    
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }
  addHero(name: string, subtitle: string, content: string): void {
    this.hero = new Hero();
    this.hero.name=name;
    this.hero.subtitle=subtitle;
    this.hero.content=content;
    this.hero.imgURL='https://material.angular.io/assets/img/examples/shiba2.jpg';
    this.heroService.addHero(this.hero);
    
    this.location.back();
  }

}

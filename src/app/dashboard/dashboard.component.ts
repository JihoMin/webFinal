import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  afAuth: AngularFireAuth;
 
  constructor(private heroService: HeroService,
              private authService: AuthService
            ) { }
 
  ngOnInit() {
    this.getHeroes();
    this.afAuth = this.authService.afAuth;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  deleteHero(id: string, name: string): void{
    this.heroService.deleteHero(id, name);
    this.getHeroes();
  }

  addToUserLike(hero: Hero){
    console.log(hero.id);
    this.authService.addToUserLike(hero);
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { QuerySnapshot, DocumentSnapshot } from '@firebase/firestore-types';

@Injectable()
export class HeroService {

  herocollection: AngularFirestoreCollection<any> = this.afs.collection('Hero');
  heroobs = this.herocollection.valueChanges();


  constructor(public messageService: MessageService,
              private afs: AngularFirestore
            ) { }
  
  getHeroes(): Observable<Hero[]> {
    
    var heroes: Hero[] = [];
    this.herocollection.ref.get().then((QuerySnapshot)=>{
      QuerySnapshot.forEach((doc) => {
        var hero: Hero = new Hero();
        hero.id = doc.id;
        hero.name = doc.data().name;
        hero.subtitle = doc.data().subtitle;
        hero.content = doc.data().content;
        hero.imgURL = doc.data().imgURL;
        
        heroes.push(hero);
      });
    });
    /*
    this.heroCol = this.afs.collection('Hero');
    this.heroes = this.heroCol.valueChanges();
    */
    return of(heroes);
  }

  getHero(id: string): Observable<Hero> {
    let hero: Hero = new Hero();
    this.herocollection.doc(id).ref.get().then( (doc) =>{
      hero.id = doc.id;
      hero.name = doc.data().name;
      hero.subtitle = doc.data().subtitle;
      hero.content = doc.data().content;
      hero.imgURL = doc.data().imgURL;
    });
    return of(hero);
  }

  addHero(hero: Hero){
    this.messageService.add(`HeroService: add Hero: ${hero.name}`);
    this.herocollection.add({
      'name': hero.name,
      'subtitle': hero.subtitle,
      'content': hero.content,
      'imgURL': hero.imgURL
    })
  }

  updateHero(hero: Hero){
    this.herocollection.doc(hero.id).update({
      'name': hero.name,
      'subtitle': hero.subtitle,
      'content': hero.content,
      'imgURL': hero.imgURL
    })
  }

  deleteHero(id: string, name: string){
    this.messageService.add(`HeroService: delete Hero: ${name}`);
    this.herocollection.doc(id).delete().then(()=>{
      console.log("deleted");
    })
  }
}

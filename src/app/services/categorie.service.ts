import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Categorie } from '../models/categorie';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private _baseUrl = 'http://localhost:3000/categories'
  public categories$ = new BehaviorSubject<Categorie[]>([])
  public categorie$ = new BehaviorSubject<Categorie>({})
  
  constructor(private _http:HttpClient) { }
  
  findAll(): Observable<Categorie[]>{
    return this._http
      .get<Categorie[]>(this._baseUrl)
      .pipe(
         tap(categories => this.categories$.next(categories)),
        
      );
  }

//  Faire if pour vérifier si categorie existe déjà ...
  createOne(todo: Todo){
    let newCategorie:Categorie = {id : this.categories$.value.length+1, libelle: todo.categorie  }
      return this._http
        .post<Categorie>(this._baseUrl, newCategorie)
        .pipe(
          tap(newCategorie => this.categories$.value.push(newCategorie))
        )
        .subscribe()
    }
}

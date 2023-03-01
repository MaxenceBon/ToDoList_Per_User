import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private _baseUrl = 'http://localhost:3000/utilisateurs'

  public utilisateurs$ = new BehaviorSubject<Utilisateur[]>([])
  constructor(private _http:HttpClient) { }

  findAll(): Observable<Utilisateur[]>{
    return this._http
      .get<Utilisateur[]>(this._baseUrl)
      .pipe(tap(users => this. utilisateurs$.next(users)),
      );
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

utilisateurs$: BehaviorSubject<Utilisateur[]> = this._utilisateurService.utilisateurs$;
@Output() utilisateurSelected = new EventEmitter<Utilisateur>() 

constructor(private _utilisateurService :UtilisateurService){}

  ngOnInit(): void {
    this._utilisateurService.findAll().subscribe();
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categories$: BehaviorSubject<Categorie[]> = this._categorieService.categories$;
  @Output() categorieSelected = new EventEmitter<Categorie>() 
constructor(private _categorieService :CategorieService){}



  ngOnInit(): void {
    this._categorieService.findAll().subscribe();
  }

}

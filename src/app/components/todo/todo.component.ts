import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Categorie } from 'src/app/models/categorie';
import { Todo } from 'src/app/models/todo';
import { Utilisateur } from 'src/app/models/utilisateur';
import { CategorieService } from 'src/app/services/categorie.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  todos$: BehaviorSubject<Todo[]> = this._todoService.todos$
  categories$ :  BehaviorSubject<Categorie[]> = this._categorieService.categories$
  toCreate: Todo = {};
  categorieSelected: Categorie = {libelle:"all"}
  utilisateurSelected:Utilisateur = {id:0}
  
  constructor(
    private _todoService: TodoService,
    private _categorieService: CategorieService
    
    ) {}
    
  ngOnInit() {
   this._todoService.findAll().subscribe()
  }
  

  changeStateOfTodo(todo: Todo) {
    todo.done = !todo.done;
    this._todoService.editOne(todo).subscribe();
  }


  createTodo() {
      if (this.toCreate.texte) {
        this.toCreate.utilisateurId=this.utilisateurSelected.id
        this._categorieService.createOne(this.toCreate)
        this._todoService
          .createOne(this.toCreate)
          .subscribe(() => {
            this.toCreate.texte = '';
            this.toCreate.categorie = '';
          });
      }
  };
  
  
  editTodo(todo: Todo) {
    todo.isEditable = !todo.isEditable;
    if (!todo.isEditable) {
      this._categorieService.createOne(todo)
      this._todoService
        .editOne(todo)
        .subscribe((updated) => {
          const index = this.todos.findIndex(t => t.id == updated.id);
          this.todos.splice(index, 1, updated);
        });
      }
  }


  onDelete(id?: string) {
    if (id) {
      this._todoService
      .deleteOne(id)
      .subscribe(() =>{this.ngOnInit()})
    }
  }

}

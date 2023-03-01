import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _baseUrl = 'http://localhost:3000/todos'

  public todos$ = new BehaviorSubject<Todo[]>([])
  public todo$ =new BehaviorSubject<Todo>({}) 
  constructor(private _http:HttpClient) { }

  findAll(): Observable<Todo[]>{
    return this._http
      .get<Todo[]>(this._baseUrl)
      .pipe(
      tap(todos => this.todos$.next(todos))
    );
  }

  findById(id:string): Observable<Todo>{
    return this._http
    .get<Todo>(`${this._baseUrl}/${id}`)
    .pipe(
      tap(todo => this.todo$.next(todo))
    );
  }

  createOne(todo: Todo): Observable<Todo>{
    return this._http
    .post<Todo>(this._baseUrl, todo)
    .pipe(
      tap(todoCreated => this.todos$.next(
        [ todoCreated, ...this.todos$.value ]))
    );    
  }

  editOne(todo: Todo): Observable<Todo>{
   return this._http
   .put<Todo>(`${this._baseUrl}/${todo.id}`, todo)
   .pipe(
    tap(todoUpdated =>{
      const todos = this.todos$.value;
      todos.splice(
        this.todos$.value.findIndex(t => t.id == todo.id),
        1,
        todoUpdated
      );
      this.todos$.next([...todos]);
    })
   );
  }


  deleteOne(id: string): Observable<Todo> {
    return this._http
      .delete<Todo>(`${this._baseUrl}/${id}`)
      .pipe(
        tap(() => this.todos$.next(
          this.todos$.value.filter(t => t.id != id)
        ))
      )
  }
}

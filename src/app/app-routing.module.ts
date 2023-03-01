import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from 'src/app/components/todo/todo.component';
import { UtilisateurComponent } from 'src/app/components/utilisateur/utilisateur.component';

const routes: Routes = [
 
  {path: 'home', component: TodoComponent},
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: '**', redirectTo:'home'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports :
  [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrammarComponent } from './component/grammar/grammar.component';


const routes: Routes = [
  {
    path: 'grammar/:word',
    component: GrammarComponent
  },
  {
    path: '',
    component: GrammarComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
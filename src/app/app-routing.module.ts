import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ReviewComponent } from './review/review.component';
import { Component } from '@angular/core';

const routes: Routes = [
 { path: 'list', component: ListComponent },
 { path: '', component: ReviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


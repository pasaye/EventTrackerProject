import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoryComponent } from './components/category/category.component';
import { ConventionComponent } from './components/convention/convention.component';
import { ImageComponent } from './components/image/image.component';
import { LocationComponent } from './components/location/location.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'category' },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:categoryId', component: ConventionComponent },
  { path: 'convention', component: ConventionComponent },
  { path: 'image', component: ImageComponent },
  { path: 'location', component: LocationComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

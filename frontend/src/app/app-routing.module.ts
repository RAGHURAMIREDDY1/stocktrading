import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './client/navbar/navbar.component';
import { CarouselComponent } from './client/carousel/carousel.component';

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'carousel', component: CarouselComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

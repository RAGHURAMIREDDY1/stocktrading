import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './client/navbar/navbar.component';
import { CarouselComponent } from './client/carousel/carousel.component';
import { RegisterComponent } from './client/register/register.component';
import { StockdataComponent } from './client/stockdata/stockdata.component';
import { WatchlistComponent } from './client/watchlist/watchlist.component';
import { PortfolioComponent } from './client/portfolio/portfolio.component';

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stocks', component: StockdataComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'portfolio', component: PortfolioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}

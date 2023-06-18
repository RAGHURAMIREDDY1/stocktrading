import { Component } from '@angular/core';

interface Stock {
  symbol: string;
  companyName: string;
  price: number;
}
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent {
  watchlist: Stock[] = [
    { symbol: 'AAPL', companyName: 'Apple Inc.', price: 135.62 },
    { symbol: 'GOOGL', companyName: 'Alphabet Inc.', price: 2423.94 },
    { symbol: 'MSFT', companyName: 'Microsoft Corporation', price: 251.36 },
    { symbol: 'AMZN', companyName: 'Amazon.com, Inc.', price: 3286.58 },
    { symbol: 'FB', companyName: 'Facebook, Inc.', price: 318.0 },
  ];

  removeFromWatchlist(stock: Stock) {
    const index = this.watchlist.indexOf(stock);
    if (index !== -1) {
      this.watchlist.splice(index, 1);
    }
  }
}

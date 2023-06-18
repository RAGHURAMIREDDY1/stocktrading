import { Component } from '@angular/core';
interface Stock {
  symbol: string;
  companyName: string;
  quantity: number;
  value: number;
}
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent {
  portfolio: Stock[] = [
    { symbol: 'AAPL', companyName: 'Apple Inc.', quantity: 10, value: 1356.2 },
    {
      symbol: 'GOOGL',
      companyName: 'Alphabet Inc.',
      quantity: 5,
      value: 1211.97,
    },
    {
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      quantity: 8,
      value: 2010.88,
    },
  ];
}

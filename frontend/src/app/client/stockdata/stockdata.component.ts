import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
@Component({
  selector: 'app-stockdata',
  templateUrl: './stockdata.component.html',
  styleUrls: ['./stockdata.component.css'],
})
//polygon apikey:kJydZdojEsj5AKZQYghm_wURHpqpn5NC
// KGQKD6W74CBISPFO.
export class StockdataComponent implements OnInit {
  stocks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStocks();
  }

  fetchStocks() {
    const apiKey = 'KGQKD6W74CBISPFO';
    const apiUrl =
      'https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=' +
      apiKey;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response && response['Status'] === 'Success' && response['Data']) {
          const companies = response['Data'];
          this.stocks = companies.map((company: any) => {
            return {
              name: company.name,
              symbol: company.symbol,
            };
          });
        }
      },
      (error: any) => {
        console.error('Error fetching stock data:', error);
      }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from './Models/Stock';
import { DataStock } from './Models/DataStock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'https://localhost:7200/'; // Replace with your Web API URL

  constructor(private http: HttpClient) {}

  getAllStocks(): Observable<DataStock[]> {
    return this.http.get<DataStock[]>(this.apiUrl+"api/Stock/4");
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../Models/Stock';
import { ChartData,HistoricalData } from '../Models/Historical';
import {Chart,ChartModule} from 'angular-highcharts'
@Injectable({
  providedIn: 'root'
})
export class MarketapiService {

  base_url='https://financialmodelingprep.com/api/v3/'
  key='apikey=c459c7cfabeb1db6d4efccded268ae65'
  constructor(private http:HttpClient){

  }

  getStockInfo(sym:string){
    
    return this.http.get<Stock[]>(this.base_url + `quote/${sym}?` + this.key)

    // setTimeout(() => {
    //   // console.log('data ', this.data[0]["symbol"],this.data[0]["name"],this.data[0]["price"],this.data[0]["dayLow"])
    //   // return this.data
    // }, 2000);
  }

  getHistorical(sym:string){
    // https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?serietype=line&apikey=8c51d79921ca367256c7362720a0bf53

    return this.http.get<ChartData>(this.base_url + `historical-price-full/${sym}?` + this.key)

  }
}

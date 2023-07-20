import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Stock } from './Models/Stock';
import { MarketapiService } from './Services/marketapi.service';
import { ChartData, HistoricalData } from './Models/Historical';

import { Chart } from 'angular-highcharts';
import { StockService } from './stock.service';
import { DataStock } from './Models/DataStock';
import { mergeMap, Observable, map } from 'rxjs';
import { compileNgModule } from '@angular/compiler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'testapi';
  
  // data!:Stock[]
  data: any
  dbstocks!:DataStock[]
  // chartData: ChartData = {
  //   historical: [],
  //   symbol: ''
  // };

  chartData: any
  
  lineChart!:Chart
  constructor(private market:MarketapiService,private stockdb:StockService){
    
  }

  ngOnInit() {
    this.getStockinfo('AAPL')

    //this.getHistorical('AAPL')
    this.getAllStocksfromdb()
  }


 async getAllStocksfromdb() {
    this.stockdb.getAllStocks().subscribe(async res=>{
          console.log("dbresponse",res)
          
          this.dbstocks=res

          await this.fetchprices(this.dbstocks)
          .then(data => {
            console.log('fetch', data)
          })

       })

      //  setTimeout(async() => {
      //   console.log("saved",this.dbstocks);
        
      //     await this.fetchprices(this.dbstocks)
      //     .then(data => {
      //       console.log('fetchprice ', data)
      //     })
      //     }, 2000);  
      
      console.log('this.dbres ', this.dbstocks)
} 






async fetchprices(dbstocks:DataStock[]): Promise<any>{
    
    dbstocks.forEach(async (obj) => {
      // obj.CurrPrice = await this.getStockinfo(obj.stockSymbol)
      
      await this.getStockinfo(obj.stockSymbol)
          .then(data => {
            console.log("added price", data, dbstocks)
            dbstocks.map(stock => {
              console.log('stock ', stock)
              obj["CurrPrice"] = data
            })
            return data;
    })

  })
    
  }





  // getAllStocksfromdb(){
  //   this.stockdb.getAllStocks().subscribe(res=>{
  //     console.log(res);
      
  //     this.dbstocks=res
  //   })

    


  //   setTimeout(() => {
  //     this.dbstocks.forEach(stock => {
  //       stock.CurrPrice=this.getStockinfo(stock.stockSymbol)
  //     });
  //   }, 10000);

  //   // console.log(this.dbstocks);
  //   setTimeout(() => {
  //     console.log(this.dbstocks);
  //   }, 3000);
  // }
  
  
  
  
  
async getStockinfo(sym:string):Promise<number>{
  let curr = 0;

  await this.getStock(sym).then(data => {
    console.log('datag ', data)
    curr = data
  })

  //  this.market.getStockInfo(sym).subscribe(res=>{
  //     this.data=res
  //     curr = this.data[0]["price"]
  //     console.log('curr', curr)
  //   })
    
    // let curr=0
    // setTimeout(() => {
      //   // console.log('data ', this.data[0]["symbol"],this.data[0]["name"],this.data[0]["price"],this.data[0]["dayLow"])
      //  curr = this.data[0]["price"]
      // //  console.log(curr);
      
      // }, 3000)
      
      console.log('returncurr', curr)
    return curr
  }
  
  // async getStock(sym: any) {
  //   let curr = 0;
  //   this.market.getStockInfo(sym).subscribe(res=>{
  //     this.data=res
  //     curr = this.data[0]["price"]
  //     console.log('curr', curr)
  //   })
  //   return curr;
  // }

  async getStock(sym: any): Promise<number> {
    try {
      const res = await this.market.getStockInfo(sym).toPromise();
      this.data = res;
      const curr = this.data[0]["price"];
      console.log('curr', curr);
      return curr;
    } 
    catch (error) {
      console.error('Error fetching stock data:', error);
      return 0; 
    }
  }
  
  
  // getHistorical(sym:string){
  //   this.market.getHistorical(sym).subscribe(res=>{
  //     this.chartData=res
  //   })
    
  //   setTimeout(() => {
  //     console.log('chartData ', this.chartData)
  //     // return this.data
  //     this.generateLineChart(this.chartData);
  //   }, 2000);
  // }
  
  // generateLineChart(chartData: any){
  //   console.log(this.chartData.historical)
  //   const seriesData = this.chartData.historical.map((item: { date: string | number | Date; close: any; }) => [
  //     new Date(item.date).getDate(),
  //     item.close
  //   ]);
  //   console.log('chartData ', this.chartData)
  //   console.log('seriesData ', seriesData)
  //   this.lineChart=new Chart({
  //     chart: {
  //       type: 'line'
  //     },
  //     title: {
  //       text: 'Linechart'
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //   xAxis: {
  //     type: 'category',
  //     title: {
  //       text: 'Date'
  //     }
  //   },
  //   yAxis: {
  //     title: {
  //       text: 'Close Price'
  //     }
  //   },
  //     series: [
  //       {
  //         type:'line',
  //         name: 'Line 1',
  //         data: seriesData
  //       }
  //     ]
  //   })
  // }
}

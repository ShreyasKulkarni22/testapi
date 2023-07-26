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

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment, Margins } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
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

  generate_PDF() {
    // Set the virtual file system with the provided fonts
    pdfMake.createPdf(this.getDocumentDefinition()).download('stock_portfolio.pdf');
  }

 


  getDocumentDefinition() {
    
    const content = [
      { text: 'Stock Portfolio', style: 'header' },
      { text: ' ', style: 'subheader' },
      this.getTableData(),
    ];

    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center' as Alignment,
        margin: [0, 0, 0, 10] as Margins,
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 20, 0, 10] as Margins,
      },
      tableHeader: {
        bold: true,
        fillColor: '#f2f2f2',
      },
      tableRow: {
        fillColor: '#ffffff',
      },
    };

    return { content, styles };
  }

  getTableData() {
    const tableHeader = [
      { text: 'Stock Name', style: 'tableHeader' },
      { text: 'Symbol', style: 'tableHeader' },
      { text: 'Quantity', style: 'tableHeader' },
      { text: 'Price', style: 'tableHeader' },
      { text: 'Current Price', style:'tableHeader'},
      { text: 'Total Value Invested', style: 'tableHeader' },
      { text: 'Current Portfolio Value', style: 'tableHeader' }
    ];

    const tableRows = this.dbstocks.map(stock => [
      stock.stockName,
      stock.stockSymbol,
      stock.stockQuantity.toString(),
      `$${stock.stockPrice.toFixed(2)}`,
      `$${stock.CurrPrice.toFixed(2)}`,
      `$${(stock.stockQuantity * stock.stockPrice).toFixed(2)}`,
      `$${(stock.stockQuantity * stock.CurrPrice).toFixed(2)}`,
    ]);

    return {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*', '*', '*'],
        body: [tableHeader, ...tableRows],
      },
      layout: 'lightHorizontalLines',
    };
  }
}

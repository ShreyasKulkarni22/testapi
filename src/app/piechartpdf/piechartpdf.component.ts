import { Component, AfterViewInit, ElementRef,OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import { Alignment, Margins } from 'pdfmake/interfaces';


@Component({
  selector: 'app-pie-chart-pdf',
  templateUrl: './piechartpdf.component.html',
  styleUrls: ['./piechartpdf.component.css']
})
export class PieChartPdfComponent implements OnInit {
  
  constructor(private elementRef: ElementRef) {
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
  }

  chart: any; // Chart object

  ngOnInit() {
    const chartData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        data: [1, 10, 60, 25, 1, 3],
        backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
      }]
    };

    this.chart = new Chart(this.elementRef.nativeElement.querySelector('canvas'), {
      type: 'pie',
      data: chartData,
    });
  }

  generatePDF() {
    


    // Convert the chart to an image using html2canvas
    html2canvas(this.elementRef.nativeElement).then((canvas) => {
      // Generate the PDF with the embedded pie chart image
      const chartDataUrl = canvas.toDataURL();
      const documentDefinition = this.getDocumentDefinition(chartDataUrl);

      pdfMake.createPdf(documentDefinition).open(); // Open the PDF in a new window for export
    });
  }

  getDocumentDefinition(chartDataUrl: string) {
    const content = [
      { text: 'PDF with Embedded Pie Chart', style: 'header' },
      { text: 'Sample Pie Chart:', style: 'subheader' },
      { image: chartDataUrl, width: 350 },
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
    };

    return { content, styles };
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PieChartPdfComponent } from './piechartpdf/piechartpdf.component';

const routes: Routes = [
  {
  path:"piechart",
  component:PieChartPdfComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

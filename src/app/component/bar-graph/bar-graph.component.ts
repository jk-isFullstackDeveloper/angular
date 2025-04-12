import { Component } from '@angular/core';
import { IconModuleModule } from '../../icon-module/icon-module.module';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-bar-graph',
  standalone: true,
  imports: [IconModuleModule, PieChartComponent,BarChartComponent],
  templateUrl: './bar-graph.component.html',
  styleUrl: './bar-graph.component.scss'
})
export class BarGraphComponent {

}

import { Component, Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  template: `
    <div class="chart-wrapper">
      <highcharts-chart
        [Highcharts]="Highcharts"
        [options]="chartOptions"
        style="width: 100%; display: block;">
      </highcharts-chart>
      <div class="center-label">
        {{ value }}
      </div>
    </div>
  `,
  styles: [`
    .chart-wrapper {
      position: relative;

    }

    .center-label {
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 25px;
      font-weight: 700;
      color:black;
    }
  `]
})
export class PieChartComponent implements OnChanges {
  @Input() value: number = 0;
  @Input() max: number = 100;
  @Input() color: string = '#7D4AEA';

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnChanges(): void {
    const percentage = (this.value / this.max) * 100;

    this.chartOptions = {
      chart: {
        type: 'pie',
        height: 200,
        animation: false,
        spacing: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
      },
      title: { text: '' },
      tooltip: { enabled: false },
      plotOptions: {
        pie: {
          innerSize: '80%',
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '90%'],
          dataLabels: { enabled: false },
          borderWidth: 0

        }
      },
      credits: { enabled: false },
      series: [{
        type: 'pie',
        data: [
          { y: percentage, color: this.color },
          { y: 100 - percentage, color: '#E5E7EB' }
        ]
      }]
    };
  }
}

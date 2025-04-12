


import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  template: `
    <highcharts-chart
      [Highcharts]="Highcharts"
      [options]="chartOptions"
      style="width: 100%; height: 300px; display: block;">
    </highcharts-chart>
  `,
})
export class BarChartComponent {
  Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      height: 300,
      type: 'column',
      backgroundColor: 'transparent',
      borderColor: "#FFFFFF"
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: 'Month'
      },
      lineColor: '#ccc',
      labels: {
        style: {
          color: '#6b7280',
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Security rating',
      },
      gridLineColor: '#eee',
      labels: {
        style: {
          color: '#6b7280',
        }
      }
    },
    tooltip: {
      shared: true,
      valueSuffix: ''
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        borderRadius: 4,
        pointPadding: 0.2,
        groupPadding: 0.1
      }
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'High',
        type: 'column',
        data: [20, 25, 15, 25, 18, 25, 20, 22, 22, 24, 26, 20],
        color: '#E5E7EB',
      },
      {
        name: 'Medium',
        type: 'column',
        data: [25, 30, 20, 30, 20, 30, 28, 28, 28, 28, 30, 25],
        color: '#A78BFA',
      },
      {
        name: 'Low',
        type: 'column',
        data: [25, 35, 20, 30, 22, 35, 28, 30, 29, 32, 36, 28],
        color: '#6D28D9',
      },

    ]
  };
}

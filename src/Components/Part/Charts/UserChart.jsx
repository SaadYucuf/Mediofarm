import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { dataset, valueFormatter } from './weather';

const chartSetting = {
  xAxis: [
    {
      label: 'Rainfall (mm)',
    },
  ],
  width: 350,
  height: 300,
};

export default function HorizontalBars() {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { 
          dataKey: 'seoul',  
          valueFormatter,
          color: '#3f48cc', // Color for Seoul
        },
        {
          dataKey: 'busan', 
          valueFormatter,
          color: '#36A2EB', // Color for Busan
        },
        {
          dataKey: 'incheon',
          valueFormatter,
          color: '#3f48cc', // Color for Incheon
        }
      ]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}

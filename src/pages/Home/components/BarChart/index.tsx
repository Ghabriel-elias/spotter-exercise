import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: any[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const filteredData = data.filter(item => item.out_of_service_date);
  const chartData = {
    labels: [...new Set(filteredData.map(item => item.created_dt))],
    datasets: [
      {
        label: 'Out of Service per Month',
        data: filteredData.map(item => item.power_units),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <Bar data={chartData} />
  );
};

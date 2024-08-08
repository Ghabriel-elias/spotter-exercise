import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { TableData } from '../../../../models/sheetData';

Chart.register(...registerables);

interface BarChartProps {
  data: TableData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    // Agrupar dados por mês e contar o número de empresas "Out of Service"
    const counts: { [key: string]: number } = {};

    data.forEach((item) => {
      if (item.out_of_service_date) {
        const date = new Date(item.out_of_service_date);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`; // MM/YYYY

        if (!counts[monthYear]) {
          counts[monthYear] = 0;
        }
        counts[monthYear] += 1;
      }
    });

    // Preparar os dados para o gráfico
    const labels = Object.keys(counts);
    const values = Object.values(counts);

    return {
      labels,
      datasets: [
        {
          label: 'Out of Service Companies',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  return (
    <div>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month/Year',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Companies',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;

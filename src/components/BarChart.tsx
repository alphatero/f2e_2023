import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  raw: any[];
};

const options = {
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const BarChart = ({ raw }: Props) => {
  const labels = raw.map((item: any) => item.year);
  const data = {
    labels,
    datasets: [
      {
        label: raw[0].list[0].name,

        data: raw.map((item: any) => item.list[0].votes),
        backgroundColor: '#FBBF24',
        stack: 'Stack 0',
      },
      {
        label: raw[0].list[1].name,
        data: raw.map((item: any) => item.list[1].votes),
        backgroundColor: '#A78BFA',
        stack: 'Stack 1',
      },
      {
        label: raw[0].list[2].name,
        data: raw.map((item: any) => item.list[2].votes),
        backgroundColor: '#34D399',
        stack: 'Stack 2',
      },
    ],
  };

  return (
    <div className="flex gap-x-12">
      <div className="text-cyan-700 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

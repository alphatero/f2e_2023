import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import bn from 'bignumber.js';

type Props = {
  validTickets: number;
  invalidTickets: number;
  validPercentage: string;
  invalidPercentage: string;
  total: number;
};

ChartJS.register(ArcElement, Tooltip, Legend);

export const PercentageChart = ({
  validPercentage,
  invalidPercentage,
  validTickets,
  invalidTickets,
  total,
}: Props) => {
  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart: ChartJS, args: any, pluginOptions: any) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = 'bold 16px noto-sans';
      ctx.fillStyle = '#06B6D4';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        data.datasets[0].data[0] + '%',
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y,
      );
    },
  };

  return (
    <div className="flex gap-x-12">
      <div className="text-cyan-700 w-48 h-48">
        <Doughnut
          data={{
            labels: ['有效票', '無效票'],
            datasets: [
              {
                label: 'My First Dataset',
                data: [validPercentage, invalidPercentage],
                backgroundColor: ['#06B6D4', '#E5E5E5'],
                hoverOffset: 4,
                weight: 0.5,
              },
            ],
          }}
          options={{
            cutout: '70%',
            plugins: {
              legend: {
                display: false,
                // position: 'bottom',
              },
            },
          }}
          plugins={[textCenter]}
        />
      </div>
      <div className="flex flex-col gap-y-6 text-slate-700 items-center justify-center">
        <div className="flex flex-col gap-y-2 w-full">
          <span className="text-cyan-700 text-xl font-medium">投票數</span>
          <span className="text-2xl">{bn(total).toFormat()}</span>
        </div>
        <div className="flex gap-x-10 flex-wrap">
          <div className="flex flex-col gap-y-2">
            <span className="text-cyan-700 text-xl font-medium">有效票數</span>
            <span className="text-2xl">{bn(validTickets).toFormat()}</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="text-cyan-700 text-xl font-medium">無效票數</span>
            <span className="text-2xl">{bn(invalidTickets).toFormat()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

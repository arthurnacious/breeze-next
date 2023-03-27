import {
  CategoryScale,
  Chart as ChartJS,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

export function getChartBackgroundPlugin(color) {
  return {
    id: "custom_canvas_background_color",
    beforeDraw: (chart: Chart) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };
}

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  title: {
    display: true,
    text: "Chart.js Line Chart",
  },
};

export function ChartInit() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  ChartJS.defaults.color = "white";
  ChartJS.defaults.plugins.legend.display = false;
}

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useReadCypher } from "use-neo4j";
import { Card, CardHeader, Typography, CardContent } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const colors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(230, 216, 173, 0.2)",
  "rgba(106, 146, 197, 0.2)",
  "rgba(142, 188, 137, 0.2)",
  "rgba(204, 128, 149, 0.2)",
  "rgba(200, 128, 128, 0.2)",
];

const options = {
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        var dataset = data.datasets[tooltipItem.datasetIndex];
        var meta = dataset._meta[Object.keys(dataset._meta)[0]];
        var total = meta.total;
        var currentValue = dataset.data[tooltipItem.index];
        var percentage = parseFloat(((currentValue / total) * 100).toFixed(1));
        return currentValue + " (" + percentage + "%)";
      },
      title: function (tooltipItem, data) {
        return data.labels[tooltipItem[0].index];
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
  },
};

function CardBarChart({ title, query }) {
  const [data, setData] = useState([]);
  const { run } = useReadCypher(query);

  useEffect(() => {
    const fetchData = async () => {
      const results = await run();
      setData(
        results.records.map((record) => ({
          label: record.get("label"),
          value: record.get("count").low,
        }))
      );
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map((la) => la.label),
    datasets: [
      {
        data: data.map((val) => val.value),
        backgroundColor: data.map((_, index) => colors[index % colors.length]),
        borderColor: "rgba(0, 0, 0, 3)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card sx={{ height: "17rem", width: "25,5rem" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h7" }}
        title={title}
        sx={{
          bgcolor: "#86ACFF",
          color: "white",
          fontFamily: "Avenir Next Cyr",
        }}
      />
      <CardContent>
        {data?.length > 0 ? (
          <Bar options={options} data={chartData} />
        ) : (
          <p>Loading data from Neo4j...</p>
        )}
      </CardContent>
    </Card>
  );
}

export default CardBarChart;

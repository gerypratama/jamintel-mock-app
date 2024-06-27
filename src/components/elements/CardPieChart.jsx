import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useReadCypher } from "use-neo4j";
import { Card, CardHeader, Typography, CardContent } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

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
  "rgba(128, 128, 128, 0.2)",
];

function CardBarChart({ title, query }) {
  const [data, setData] = useState([]);
  const { run, loading, error } = useReadCypher(query);
  useEffect(() => {
    const fetchData = async () => {
      const results = await run();
      if (!results) return;

      setData(
        results.records.map((record) => ({
          label: record.get("label"),
          value: record.get("count").low,
          persen: record.get("persen"),
        }))
      );
    };

    fetchData();
  }, []);

  useEffect(() => {
    run({ query });
  }, [query]);
  const options = {
    useBorderRadius: true,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          beforeTitle: (context) => {
            const dataIndex = context[0].dataIndex;
            const persen = data[dataIndex]?.persen;
            const persenString =
              typeof persen === "string" ? persen : `${persen}%`;

            return persenString;
          },
        },
      },
    },
  };

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
    <div>
      <Card sx={{ height: "50%", width: "100%" }}>
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
          {loading ? (
            <p>Loading data from Neo4j...</p>
          ) : error ? (
            <p>Error fetching data: {error.message}</p>
          ) : data?.length > 0 ? (
            <Pie options={options} data={chartData} />
          ) : (
            <p>No data found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CardBarChart;

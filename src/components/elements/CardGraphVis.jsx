import { useEffect, useState } from "react";
import Graph from "react-vis-network-graph";
import { Card, CardHeader, Container, Typography, colors } from "@mui/material";
import Cookies from "js-cookie";

const CardGraphVis = ({
  service,
  height,
  title,
  bgCol = undefined,
  headerCol = undefined,
}) => {
  const [data, setData] = useState(null);
  const [network, setNetwork] = useState(null);

  const graph = {
    nodes:
      data &&
      data.nodes.map((node) => ({
        id: node.id,
        name: node.properties.nama,
        label: 
        node.properties.nama ||
        node.properties.ttl ||
        node.properties.kk ||
        node.properties.nik ||
        node.properties.no_cc ||
        typeof node.properties.no_hp ||
        node.properties.no_rekening ||
        node.properties.npwp ||
        node.properties.number ||
        typeof node.properties.email,
        title: node.label[0],
        shape: "circularImage",
        color: node.color,
        image: node.icon,
      })),
    edges: data && data.edges,
  };

  useEffect(() => {
    const fetchGraph = async () => {
      const url = import.meta.env.VITE_BACKEND_BASE + "/" + service;
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nik: "3174010102700009",
          no_hp: "081181234455",
          no_rek: "2907991604",
          start_date: "2020-01",
          end_date: "2021-12",
          email1: "harunmasiku@example.com",
          n_kontak1: "086899169400",
          tgl_cctv: "2020-11-23",
        }),
      })
        .then((res) => res.json())
        .then((obj) => obj && setData(obj));
    };
    fetchGraph();
    console.log(data);
  }, []);

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
      font: {
        color: "rgba(0,0,0,0)",
        size: 1,
      },
    },
    nodes: {
      size: 30,
      font: {
        color: "rgb(51, 51, 51)",
        size: 12,
        face: "Nunito Sans, sans-serif",
      },
      imagePadding: 18,
    },
    height: height,
  };

  return (
    <Card width="100%" sx={{ bgcolor: bgCol ? bgCol : "#f8fcfe" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h7" }}
        title={title}
        sx={{
          fontWeight: 700,
          color: headerCol ? headerCol : "#028f41",
        }}
      />
      <Container sx={{ width: "100%" }}>
        {data ? (
          <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={(network) => setNetwork(network)}
          />
        ) : (
          <Typography mb={2}>Fetching graph failed</Typography>
        )}
        {/* <img
          src="/graph_placeholder_white.png"
          alt="placeholder"
          style={{ height: 500 }}
        /> */}
      </Container>
    </Card>
  );
};

export default CardGraphVis;

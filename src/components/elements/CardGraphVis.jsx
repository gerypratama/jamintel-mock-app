import { useEffect, useState } from "react";
import Graph from "react-vis-network-graph";
import { Card, CardHeader, Container } from "@mui/material";
import { useReadCypher } from "use-neo4j";

const CardGraphVis = () => {
  const query =
    "match p=(n)--(m) where n.suspect is not null and m.suspect is not null return p";

  const { run, records, first, result } = useReadCypher(query);
  const [graph, setGraph] = useState({
    // nodes: records.get("nodes"),
    // edges: records.get("relationships"),
  });

  useEffect(() => {
    run();
  }, []);

  useEffect(() => {
    setGraph();
  }, [records]);

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  const options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: "#000000",
    },
    height: "500px",
  };

  return (
    <Card height="100%" width="100%">
      <CardHeader
        titleTypographyProps={{ variant: "h7" }}
        title="Suspect Journey"
        sx={{ fontWeight: 700, color: "#282d33" }}
      />
      <Container sx={{ width: "100%", bgcolor: "#f9fdfe", overflow: "hidden" }}>
        <img
          src="/graph_placeholder_white.png"
          alt="graph placeholder"
          style={{
            objectFit: "contain",
            width: "100%",
          }}
        />
      </Container>
      {/* <Graph graph={graph} options={options} events={events} /> */}
    </Card>
  );
};

export default CardGraphVis;

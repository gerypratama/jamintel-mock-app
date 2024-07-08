import React, { useEffect, useState } from "react";
import Graph from "react-vis-network-graph";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, Container, Typography, Box } from "@mui/material";
import Cookies from "js-cookie";
import ToggleOptionGraph from "./ToogleOptionGraph";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../../assets/style/stylegraph.css";
import {
  selectGraphData,
  setGraphData,
  setSelectedNode,
  setSelectedEdge,
  selectSelectedNode,
  selectSelectedEdge,
} from "../../slice/graphSlice";
import CardNodeClick from "./CardNodeClick";
import CardEdgeClick from "./CardEdgeClick";
import DefaultCard from "./DefaultCard";

const CardGraphVis = ({
  service,
  height,
  title,
  bgCol = undefined,
  headerCol = undefined,
}) => {
  const dispatch = useDispatch();
  const selectedNode = useSelector(selectSelectedNode);
  const selectedEdge = useSelector(selectSelectedEdge);
  const [network, setNetwork] = useState(null);
  const [physicsEnabled, setPhysicsEnabled] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const graphData = useSelector(selectGraphData);
  console.log("selected node=", selectedNode, "selected edge=", selectedEdge);

  useEffect(() => {
    const fetchGraph = async () => {
      const url = import.meta.env.VITE_BACKEND_BASE + "/" + service;
      await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((obj) => {
          if (obj) {
            console.log(obj)
            dispatch(setGraphData(obj));
          }
        })
        .catch((error) => {
          console.error("Error fetching graph data:", error);
        });
    };
    fetchGraph();
  }, []);

  const options = {
    autoResize: true,
    layout: {
      hierarchical: false,
      improvedLayout: true,
    },
    edges: {
      smooth: false,
      length: 200,
      color: {
        color: "#191919",
        hover: "#ff1919",
      },
      font: {
        size: 10,
        face: "Nunito Sans, sans-serif",
        color: "rgb(51, 51, 51)",
        align: "middle",
      },
      width: 0.5,
    },
    nodes: {
      shape: "circularImage",
      size: 25,
      borderWidth: 1.5,
      font: {
        color: "rgb(51, 51, 51)",
        size: 12,
        face: "Nunito Sans, sans-serif",
      },
      imagePadding: 10,
    },
    interaction: {
      hideEdgesOnZoom: true,
      hideEdgesOnDrag: true,
      zoomView: true,
      hover: true,
      hoverConnectedEdges: true,
      tooltipDelay: 300,
      navigationButtons: true,
      zoomSpeed: 0.5,
    },
    physics: {
      enabled: physicsEnabled,
      solver: "forceAtlas2Based",
      forceAtlas2Based: {
        gravitationalConstant: -80,
        centralGravity: 0.0125,
        springLength: 1000,
        springConstant: 0.05,
        damping: 2,
        avoidOverlap: 2,
      },
      maxVelocity: 200,
      minVelocity: 0.5,
      timestep: 0.3,
    },
    height: height,
  };

  const togglePhysics = () => {
    setPhysicsEnabled((prev) => !prev);
  };

  const handleNodeClick = (event) => {
    if (event.nodes.length === 0 && event.edges.length === 0) {
      dispatch(setSelectedNode(null));
      dispatch(setSelectedEdge(null));
    } else {
      const clickedElement = event.nodes.length > 0 ? "node" : "edge";
      const clickedElementId =
        clickedElement === "node" ? event.nodes[0] : event.edges[0];

      if (clickedElement === "node") {
        dispatch(setSelectedNode(clickedElementId));
        dispatch(setSelectedEdge(null));
      } else {
        dispatch(setSelectedEdge(clickedElementId));
        dispatch(setSelectedNode(null));
      }
    }
  };

  const handleNodeDoubleClick = (event) => {
    if (event.nodes.length > 0) {
      const nodeId = event.nodes[0];
      network.focus(nodeId, {
        scale: 1.5,
        animation: {
          duration: 1000,
          easingFunction: "easeInOutQuart",
        },
      });
    }
  };

  useEffect(() => {
    console.log(network);
    if (network) {
      network.on("hoverNode", function () {
        network.canvas.body.container.style.cursor = "pointer";
      });

      network.on("oncontext", function (params) {
        console.log(params, "---->>");
        if (network.canvas.body.container.style.cursor === "pointer") {
          let { x, y } = params.pointer.DOM;
          const nodeId = network.getNodeAt({ x, y });

          if (nodeId !== undefined) {
            console.log("Node ID:", nodeId);
            params.event.preventDefault();
          }

          params.event.preventDefault();
        }
      });

      network.on("blurNode", function () {
        network.canvas.body.container.style.cursor = "default";
      });
    }
  }, [network, dispatch]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
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
        {graphData ? (
          <>
            <Box position="relative">
              <Graph
                graph={graphData}
                events={{ click: handleNodeClick, doubleClick: handleNodeDoubleClick }}
                options={options}
                getNetwork={(network) => setNetwork(network)}
              />
              <Box position="absolute" top="0" left="0">
                <ToggleOptionGraph
                  togglePhysics={togglePhysics}
                  checked={physicsEnabled}
                />
              </Box>
              <Box
                position="absolute"
                top="0"
                right="0"
                width={collapsed ? "300px" : "30px"}
                height={collapsed ? "430px" : "30px"}
                bgcolor="white"
                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                display="flex"
              // justifyContent="center"
              // alignItems="center"
              >
                <Box
                  position="absolute"
                  top="0"
                  right="0"
                  width="30px"
                  height="30px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  onClick={handleCollapse}
                  style={{ cursor: "pointer" }}
                >
                  {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </Box>
                {collapsed && selectedNode && (
                  <CardNodeClick />
                )}
                {collapsed && selectedEdge && (
                  <CardEdgeClick />
                )}
                {collapsed && !selectedNode && !selectedEdge && (
                  <DefaultCard />
                )}
              </Box>
            </Box>
          </>
        ) : (
          <Typography mb={2}>Fetching graph failed</Typography>
        )}
      </Container>
    </Card>
  );
};

export default CardGraphVis;

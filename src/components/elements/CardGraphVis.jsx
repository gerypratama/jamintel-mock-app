import { useEffect, useState } from "react";
import Graph from "react-vis-network-graph";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import axios from "axios";
import ToggleOptionGraph from "./ToogleOptionGraph";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import "../../assets/style/stylegraph.css";
import {
  selectGraphData,
  setGraphData,
  setSelectedNode,
  setSelectedEdge,
  setRightClickNode,
} from "../../slice/graphSlice";
import CardNodeClick from "./CardNodeClick";
import CardEdgeClick from "./CardEdgeClick";
import DefaultCard from "./DefaultCard";
import CardRightNodeClick from "./CardRightNodeClick";

const CardGraphVis = ({
  service,
  id = "graph",
  height,
  title,
  bgCol = undefined,
  headerCol = undefined,
}) => {
  const dispatch = useDispatch();
  const [network, setNetwork] = useState(null);
  const [physicsEnabled, setPhysicsEnabled] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { graph } = useSelector(selectGraphData);
  const graphId = graph[id]?.graphData;
  const selectedNode = graph[id]?.selectedNode;
  const selectedRightClickNode = graph[id]?.rightClickNodeId;
  const selectedRightClickNodePosition = graph[id]?.rightClickPosition;
  const selectedEdge = graph[id]?.selectedEdge;
  console.log(selectedNode);

  const fetchGraph = async () => {
    const url = import.meta.env.VITE_BACKEND_BASE + "/" + service;
    console.log(url);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      if (response.data) {
        // console.log(response.data);
        setPhysicsEnabled(true);
        dispatch(setGraphData({ data, id }));

        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching graph data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, [service]);

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
      dispatch(setSelectedNode({ id, nodeId: null }));
      dispatch(setSelectedEdge({ id, edgeId: null }));
      dispatch(
        setRightClickNode({ id, nodeId: null, position: { x: 0, y: 0 } })
      );
    } else {
      const clickedElement = event.nodes.length > 0 ? "node" : "edge";
      const clickedElementId =
        clickedElement === "node" ? event.nodes[0] : event.edges[0];

      if (clickedElement === "node") {
        // dispatch(setSelectedNode(clickedElementId));
        dispatch(setSelectedNode({ id, nodeId: clickedElementId }));
        dispatch(setSelectedEdge({ id, egdeId: null }));
        dispatch(
          setRightClickNode({ id, nodeId: null, position: { x: 0, y: 0 } })
        );
      } else {
        dispatch(setSelectedEdge({ id, edgeId: clickedElementId }));
        dispatch(setSelectedNode({ id, nodeId: null }));
        dispatch(
          setRightClickNode({ id, nodeId: null, position: { x: 0, y: 0 } })
        );
      }
    }
  };

  const handleNodeDoubleClick = (event) => {
    if (event.nodes.length > 0) {
      const nodeId = event.nodes[0];
      network.focus(nodeId, {
        scale: 1.5,
        animation: {
          duration: 500,
          easingFunction: "easeInOutQuart",
        },
      });
    }
  };

  useEffect(() => {
    // console.log(network);
    if (network) {
      network.on("hoverNode", function () {
        network.canvas.body.container.style.cursor = "pointer";
      });

      network.on("oncontext", function (params) {
        // console.log(params, "---->>");
        if (network.canvas.body.container.style.cursor === "pointer") {
          let { x, y } = params.pointer.DOM;
          const nodeId = network.getNodeAt({ x, y });

          if (nodeId !== undefined) {
            // console.log("Node ID:", nodeId);
            dispatch(setRightClickNode({ id, nodeId, position: { x, y } }));
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
      <Box sx={{ p: 2, pb: 0 }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={height}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box position="relative">
              <Graph
                graph={graphId}
                events={{
                  click: handleNodeClick,
                  doubleClick: handleNodeDoubleClick,
                }}
                options={options}
                getNetwork={(network) => setNetwork(network)}
              />
              <Box
                position="absolute"
                top="0"
                left="0"
                onClick={fetchGraph}
                style={{ cursor: "pointer" }}
              >
                <RestartAltIcon sx={{ fontSize: 20, color: "#1976d2" }} />
              </Box>
              <Box position="absolute" top="2px" left="30px">
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
                height={collapsed ? "95%" : "30px"}
                bgcolor="white"
                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                display="flex"
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
                {collapsed && selectedNode && <CardNodeClick id={id} />}
                {collapsed && selectedEdge && <CardEdgeClick id={id} />}
                {collapsed && !selectedNode && !selectedEdge && (
                  <DefaultCard id={id} />
                )}
              </Box>
              {selectedRightClickNode && (
                <div
                  style={{
                    position: "absolute",
                    top: selectedRightClickNodePosition?.y + "px",
                    left: selectedRightClickNodePosition?.x + "px",
                  }}
                >
                  <CardRightNodeClick id={id} />
                </div>
              )}
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
};

export default CardGraphVis;

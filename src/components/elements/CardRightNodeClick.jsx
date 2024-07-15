import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import { expandGraphData, selectRightClickNodeId, setRightClickNode, shortestPathGraphData } from "../../slice/graphSlice";

const CardRightNodeClick = () => {
  const selectedRightClickNode = useSelector(selectRightClickNodeId);
  const dispatch = useDispatch();
  const [relationships, setRelationships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showExpandRelationships, setShowExpandRelationships] = useState(false);
  const [showPathSubMenu, setShowPathSubMenu] = useState(false);
  const [id1, setId1] = useState(null);
  const [id2, setId2] = useState(null);

  useEffect(() => {
    if (selectedRightClickNode && showExpandRelationships) {
      const fetchRelationships = async () => {
        const url = `${import.meta.env.VITE_BACKEND_BASE}/informasi-buronan/graph-profil-buron/expand?id=${selectedRightClickNode}`;
        setLoading(true);
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
              "Content-Type": "application/json",
            },
          });
          console.log(response.data);

          if (response.data.length > 0) {
            setRelationships(response.data);
          } else {
            console.warn("Response data is empty or not in expected format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRelationships();
    }
  }, [selectedRightClickNode, showExpandRelationships]);

  useEffect(() => {
    if (selectedRightClickNode && id1 && selectedRightClickNode !== id1) {
      setId2(selectedRightClickNode);
    }
  }, [selectedRightClickNode, id1]);

  const handleRelationshipClick = async (relationship) => {
    const url = `${import.meta.env.VITE_BACKEND_BASE}/informasi-buronan/graph-profil-buron/expand?id=${selectedRightClickNode}&rel=${relationship}`
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      const newData = response.data;
      console.log(newData);

      dispatch(expandGraphData(newData));
      setShowExpandRelationships(false);
      dispatch(setRightClickNode({ nodeId: null, position: { x: 0, y: 0 } }));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSetSourceClick = () => {
    setId1(selectedRightClickNode);
    setShowPathSubMenu(false);
  };

  const handleRunShortestPathClick = async () => {
    const url = `${import.meta.env.VITE_BACKEND_BASE}/informasi-buronan/graph-profil-buron/shortest-path?id1=${id1}&id2=${id2}`
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      const newDataShortestPath = response.data;
      dispatch(shortestPathGraphData(newDataShortestPath));
      console.log(newDataShortestPath);

      setShowPathSubMenu(false);
      dispatch(setRightClickNode({ nodeId: null, position: { x: 0, y: 0 } }));
    } catch (error) {
      console.error("Error fetching shortest path:", error);
    }
  };

  const toggleSubMenu = (menu) => {
    if (menu === 'expand') {
      setShowExpandRelationships((prev) => !prev);
      setShowPathSubMenu(false);
    } else if (menu === 'path') {
      setShowPathSubMenu((prev) => !prev);
      setShowExpandRelationships(false);
    }
  };

  return (
    <nav style={{backgroundColor:"white",justifyContent:"center",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",}}>
      <div
        onClick={() => toggleSubMenu('expand')}
        style={{
          paddingLeft: 4,
          borderRadius: 1,
          position: "relative",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 8, justifyContent: "space-between" }}
        >
          <HubOutlinedIcon sx={{ fontSize: 25 }} />
          <Typography variant="h6" style={{ fontSize: "16px", flexGrow: 1, textAlign: "center" }}>Expand</Typography>
          <ArrowRightIcon sx={{ fontSize: 30 }} />
        </div>
        {showExpandRelationships && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "102%",
              backgroundColor: "white",
              padding: "8px",
              zIndex: 1000,
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              maxHeight: "200px",
              overflowY: "auto"
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Loading...
              </div>
            ) : (
              relationships.map((rel, index) => (
                <button
                  key={index}
                  onClick={() => handleRelationshipClick(rel.Relationship)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "4px 8px",
                    backgroundColor: "white",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "4px"
                  }}
                >
                  <span style={{ marginRight: "8px" }}>{rel.Relationship}</span>
                  <span>({rel.Jumlah})</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
      <div
        onClick={() => toggleSubMenu('path')}
        style={{
          paddingLeft: 4,
          borderRadius: 1,
          position: "relative",
          marginTop: 8
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 8, justifyContent: "space-between" }}
        >
          <TimelineIcon sx={{ fontSize: 25 }} />
          <Typography variant="h6" style={{ fontSize: "16px", flexGrow: 1, textAlign: "center" }}>{"Path"}</Typography>
          <ArrowRightIcon sx={{ fontSize: 30 }} />
        </div>
        {showPathSubMenu && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "102%",
              backgroundColor: "white",
              padding: "8px",
              zIndex: 1000,
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
            }}
          >
            {id1 && id2 ? (
              <button
                onClick={handleRunShortestPathClick}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "white",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: "4px",
                  minWidth:"100px"
                }}
              >
                <span>Run Shortest Path</span>
              </button>
            ) : (
              <button
                onClick={handleSetSourceClick}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "white",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: "4px",
                  minWidth:"100px"
                }}
              >
                <span>Set Source Shortest Path</span>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default CardRightNodeClick;

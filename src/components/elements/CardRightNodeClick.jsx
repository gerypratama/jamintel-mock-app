import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import { expandGraphData, selectRightClickNodeId, setRightClickNode } from "../../slice/graphSlice";

const CardRightNodeClick = () => {
  const selectedRightClickNode = useSelector(selectRightClickNodeId);
  const dispatch = useDispatch();
  const [relationships, setRelationships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRelationships, setShowRelationships] = useState(false);

  useEffect(() => {
    if (selectedRightClickNode) {
      const fetchRelationships = async () => {
        const url = `http://127.0.0.1:5174/api/informasi-buronan/graph-profil-buron/expand?id=${selectedRightClickNode}`;
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
  }, [selectedRightClickNode]);

  const handleRelationshipClick = async (relationship) => {
    const url = `http://127.0.0.1:5174/api/informasi-buronan/graph-profil-buron/expand?id=${selectedRightClickNode}&rel=${relationship}`
    try {
        const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
              "Content-Type": "application/json",
            },
          });
      const newData = response.data;
      console.log(newData)

      dispatch(expandGraphData(newData));
      setShowRelationships(false);
      dispatch(setRightClickNode({ nodeId: null, position: { x: 0, y: 0 } }));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleSubMenu = () => {
    setShowRelationships((prev) => !prev);
  };

  return (
    <nav>
      <div
        onClick={toggleSubMenu}
        style={{
          padding: 4,
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          backgroundColor: "white",
          borderRadius: 1,
          position: "relative",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 8, justifyContent: "center" }}
        >
          <HubOutlinedIcon sx={{fontSize:25}}/>
          <h6 style={{fontSize:"16px"}}>Expand</h6>
          <ArrowRightIcon sx={{fontSize:30}}/>
        </div>
        {showRelationships && (
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
    </nav>
  );
};

export default CardRightNodeClick;

import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectEdgeLabelCount, selectEdgesCount, selectGraphData, selectNodeLabelCount, selectNodesCount, selectSelectedNode } from "../../slice/graphSlice";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const CardNodeClick = () => {
  const graphData = useSelector(selectGraphData);
  const selectedNode = useSelector(selectSelectedNode);
  const node = graphData.nodes.find((n) => n.id === selectedNode);
  const nodePropertiesRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(null);


  if (!node) return null;

  const { label, properties, color } = node;

  useEffect(() => {
    const containerHeight = nodePropertiesRef.current?.parentElement?.clientHeight;
    if (containerHeight) {
      const calculatedMaxHeight = containerHeight * 0.95;
      setMaxHeight(calculatedMaxHeight);
    }
  }, [selectedNode]);

  return (
    <div ref={nodePropertiesRef} style={{ maxHeight: maxHeight ? `${maxHeight}px` : '100%', overflowY: 'auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', fontFamily: 'Arial, sans-serif', padding:'8px' }}>
      <span style={{ marginLeft: "12px", color: '#333' }}>Node Properties</span>
      <div style={{ fontSize: '1.1rem', color: '#333', padding: '0.5rem', borderRadius: '4px', borderColor: 'GrayText', fontWeight: 'bold' }}>
        <button style={{ marginTop: "2px", fontSize: "12px", backgroundColor: color || "#B6C0D0", color: '#fff', border: 'none', padding: '0.25rem 1rem', borderRadius: '24px', cursor: 'pointer', height: '28px', marginRight: '0.5rem' }}>
          {label}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', overflowX: 'hidden', padding: '0 1rem 0 0.5rem', gap: '0.25rem'}}>
        {Object.entries(properties).map(([key, value], index) => (
          <div key={key} style={{ display: 'grid', gridTemplateColumns: '50% 50%', fontSize: '13px', backgroundColor: index % 2 === 0 ? '#ffffff' : '#f2f2f2', borderRadius: '4px', color: '#495057', whiteSpace: 'normal', wordWrap: 'break-word', padding: '0.5rem', alignItems: 'center' }}>
            <div style={{ flex: "50%", fontWeight: "bold", paddingLeft: '8px' }}>{key}</div>
            <div style={{ flex: "50%", paddingLeft: '8px' }}>
              {typeof value === "object"
                ? Array.isArray(value)
                  ? `[${value.join(", ")}]`
                  : `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')}`
                : value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardNodeClick;

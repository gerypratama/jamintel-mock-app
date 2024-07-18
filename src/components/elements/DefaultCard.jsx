import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectEdgeLabelCount, selectEdgesCount, selectGraphData, selectNodeLabelCount, selectNodesCount } from '../../slice/graphSlice';

const DefaultCard = ({id}) => {
  
  const {graph} = useSelector(selectGraphData);
  const nodeCount = graph?.[id]?.nodesCount;
  const edgeCount = graph?.[id]?.edgesCount;
  const meta = graph?.[id]?.graphData.meta
  console.log(meta)
  const nodeLabelCount = graph?.[id]?.nodelabelCount
  const edgeLabelCount = graph?.[id]?.edgelabelCount
  const nodeColors = meta?.node_color || {};
  const defaultCardRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(null);

  useEffect(() => {
    const containerHeight = defaultCardRef.current?.parentElement?.clientHeight;
    if (containerHeight) {
      const calculatedMaxHeight = containerHeight * 0.95;
      setMaxHeight(calculatedMaxHeight);
    }
  }, [meta]);

  return (
    <div ref={defaultCardRef} style={{ maxHeight: maxHeight ? `${maxHeight}px` : '100%', overflowY: 'auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', fontFamily: 'Arial, sans-serif',padding:'8px' }}>
      <div
        style={{
          fontSize: '16px',
          color: '#333',
          borderRadius: '4px',
          fontFamily: 'Arial, sans-serif',
          top: 0,
          backgroundColor: 'white',
          marginLeft: "10px",
        //   marginTop: "8px"
        }}
      >
        <span>Overview</span>
      </div>
      <div
        style={{
          maxWidth: '100%',
          overflowX: 'hidden',
          overflowY: 'auto',
          marginLeft: '10px',
          marginTop: '16px',
          maxHeight: '90%',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Node labels
          </div>
          <div style={{ height:"100%", display: 'flex', flexWrap: 'wrap', overflowY: 'auto' }}>
            <button
              style={{
                backgroundColor: 'rgb(165, 171, 182)',
                color: '#fff',
                borderRadius: '16px',
                fontSize: '12px',
                textTransform: 'none',
                marginTop: '8px',
                marginRight: '3px',
                cursor: 'pointer',
                padding: '6px 14px',
                textAlign: 'center',
                border: 'none'
              }}
            >
              <strong>{`* (${nodeCount})`}</strong>
            </button>
            {Object.entries(nodeLabelCount).map(([label, count]) => (
              <button
                key={label}
                style={{
                  color: '#fff',
                  borderRadius: '16px',
                  fontSize: '12px',
                  textTransform: 'none',
                  marginTop: '8px',
                  marginRight: '3px',
                  cursor: 'pointer',
                  padding: '6px 14px',
                  textAlign: 'center',
                  backgroundColor: nodeColors[label] || '#B6C0D0',
                  border: 'none'
                }}
              >
                <strong>{`${label} (${count})`}</strong>
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '4px',
            }}
          >
            Relationship types
          </div>
          <div style={{ height: '100%', display: 'flex', flexWrap: 'wrap', overflowY: 'auto' }}>
            <button
              style={{
                color: '#fff',
                // borderRadius: '16px',
                borderRadius: '4px',
                fontSize: '12px',
                textTransform: 'none',
                marginTop: '8px',
                marginRight: '3px',
                cursor: 'pointer',
                padding: '6px 14px',
                textAlign: 'center',
                backgroundColor: 'rgb(165, 171, 182)',
                border: 'none'
              }}
            >
              <strong>{`* (${edgeCount})`}</strong>
            </button>
            {Object.keys(edgeLabelCount).map((type, index) => (
              <button
                key={index}
                style={{
                  color: '#fff',
                  // borderRadius: '16px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  textTransform: 'none',
                  marginTop: '8px',
                  marginRight: '3px',
                  cursor: 'pointer',
                  padding: '6px 14px',
                  textAlign: 'center',
                  backgroundColor: 'rgb(165, 171, 182)',
                  border: 'none'
                }}
              >
                <strong>{`${type} (${edgeLabelCount?.[type] || 0})`}</strong>
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            fontSize: '14px',
            marginBottom: '16px',
            paddingLeft: '4px',
          }}
        >
          Displaying {nodeCount} nodes, {edgeCount} relationships.
        </div>
      </div>
    </div>
  );
};

export default DefaultCard;

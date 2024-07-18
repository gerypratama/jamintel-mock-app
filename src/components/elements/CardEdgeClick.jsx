import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { selectGraphData, selectSelectedEdge } from "../../slice/graphSlice";
import { useRef, useState, useEffect } from "react";

const CardEdgeClick = ({id}) => {
  const {graph} = useSelector(selectGraphData);
  const graph1 = graph[id]?.graphData
  const selectedEdge1 = graph[id]?.selectedEdge
  const selectedEdge = useSelector(selectSelectedEdge);
  const edge = graph1.edges.find((n) => n.id === selectedEdge1);
  console.log(edge)
  const edgePropertiesRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(null);

  if (!edge) return null;

  const { label, properties} = edge;
  const color = edge.color.color
  console.log(color)

  useEffect(() => {
    const containerHeight = edgePropertiesRef.current?.parentElement?.clientHeight;
    if (containerHeight) {
      const calculatedMaxHeight = containerHeight * 0.95;
      setMaxHeight(calculatedMaxHeight);
    }
  }, [selectedEdge]);

  return (
    <div ref={edgePropertiesRef} style={{ maxHeight: maxHeight ? `${maxHeight}px` : '100%', overflowY: 'auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', fontFamily: 'Arial, sans-serif',padding:'8px' }}>
      <span style={{ marginLeft: "10px", color: '#333' }}>Relationship Properties</span>
      <div style={{ fontSize: '1.1rem', color: '#333', padding: '0.5rem', borderRadius: '4px', borderColor: 'GrayText', fontWeight: 'bold' }}>
        <button style={{ marginTop: "2px", fontSize: "12px", backgroundColor: "rgb(165, 171, 182)", color: '#fff', border: 'none', padding: '0.25rem 1rem', borderRadius: '4px', cursor: 'pointer', height: '28px', marginRight: '0.5rem' }}>
          {label}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', overflowX: 'hidden', padding: '0 1rem 0 0.5rem', gap: '0.25rem'}}>
        {properties && Object.keys(properties).length > 0 ? (
          Object.entries(properties).map(([key, value], index) => (
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
          ))
        ) : (
          <Typography variant="body2" style={{ padding: '0.5rem', color: '#777' }}></Typography>
        )}
      </div>
    </div>
  );
};

export default CardEdgeClick;

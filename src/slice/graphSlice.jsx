import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  graphData: null,
  selectedNode: null,
  selectedEdge: null,
  nodesCount: 0,
  edgesCount: 0,
  nodelabelCount: {},
  edgeLabelCount: {},
};

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setGraphData: (state, action) => {
      const data = action.payload;
      console.log(data);
      
      // Hitung nodesCount dan nodelabelCount
      const nodesCount = data.nodes.length;
      const nodelabelCount = data.nodes.reduce((acc, node) => {
        const label = node.label[0]; // Mengambil label pertama dari array label
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});

      // Hitung edgesCount dan edgeLabelCount
      const edgesCount = data.edges.length;
      const edgeLabelCount = data.edges.reduce((acc, edge) => {
        const label = edge.label; // Mengambil label edge
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});

      // Mapping nodes
      const mappedNodes = data.nodes.map((node) => ({
        id: node.id,
        label: node.title,
        shape: "circularImage",
        color: node.color,
        image: node.icon,
        properties: node.properties,
      }));

      state.graphData = {
        nodes: mappedNodes,
        edges: data.edges,
        meta: data.meta,
      };
      state.nodesCount = nodesCount;
      state.edgesCount = edgesCount;
      state.nodelabelCount = nodelabelCount;
      state.edgeLabelCount = edgeLabelCount;
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    setSelectedEdge: (state, action) => {
      state.selectedEdge = action.payload;
    },
  },
});

export const { setGraphData, setSelectedNode, setSelectedEdge } = graphSlice.actions;
export const selectGraphData = (state) => state.graph.graphData;
export const selectSelectedNode = (state) => state.graph.selectedNode;
export const selectSelectedEdge = (state) => state.graph.selectedEdge;
export const selectNodesCount = (state) => state.graph.nodesCount;
export const selectEdgesCount = (state) => state.graph.edgesCount;
export const selectNodeLabelCount = (state) => state.graph.nodelabelCount;
export const selectEdgeLabelCount = (state) => state.graph.edgeLabelCount;

export default graphSlice.reducer;

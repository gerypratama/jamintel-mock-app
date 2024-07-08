import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  graphData: null,
  selectedNode: null,
  selectedEdge: null,
  nodesCount: 0,
  edgesCount: 0,
  nodelabelCount: {},
  edgeLabelCount: {},
  rightClickNodeId: null,
  rightClickPosition: { x: 0, y: 0 },
};

const applyEdgeStyles = (edges) => {
  const edgesGroup = {};

  edges.forEach((edge) => {
    const groupId = `${edge.from}_${edge.to}`;
    if (!edgesGroup[groupId]) {
      edgesGroup[groupId] = [edge];
    } else {
      edgesGroup[groupId].push(edge);
    }
  });

  Object.keys(edgesGroup).forEach((key) => {
    const groupEdges = edgesGroup[key];
    const reverseKey = key.split('_').reverse().join('_');

    if (edgesGroup[reverseKey] && edgesGroup[reverseKey].length === groupEdges.length) {
      const totalEdges = groupEdges.length + edgesGroup[reverseKey].length;
      const combinedEdges = [...groupEdges, ...edgesGroup[reverseKey]];

      combinedEdges.forEach((edge, index) => {
        let roundness;
        if (totalEdges % 2 === 1) {
          roundness = index % 2 === 0 ? -2 - 0.1 * Math.floor(index / 2) : 0.1 * Math.floor(index / 2) + 0.1;
        } else {
          roundness = index % 2 === 0 ? 0.1 * Math.floor((index + 1) / 2) + 0.1 : -2 + (-0.1 * Math.floor(index / 2) - 0.1);
        }
        edge.length = 400;
        edge.smooth = {
          enabled: true,
          type: "curvedCCW",
          roundness: parseFloat(roundness.toFixed(2)),
        };
      });
    } else if (groupEdges.length > 2) {
      groupEdges.forEach((edge, index) => {
        let roundness;
        if (groupEdges.length % 2 === 1) {
          roundness = index % 2 === 0 ? -2 - 0.1 * Math.floor(index / 2) : 0.1 * Math.floor(index / 2) + 0.1;
        } else {
          roundness = index % 2 === 0 ? 0.1 * Math.floor((index + 1) / 2) + 0.1 : -2 + (-0.1 * Math.floor(index / 2) - 0.1);
        }
        edge.length = 400;
        edge.smooth = {
          enabled: true,
          type: "curvedCCW",
          roundness: parseFloat(roundness.toFixed(2)),
        };
      });
    } else if (groupEdges.length === 2) {
      groupEdges.forEach((edge, index) => {
        const roundness = index % 2 === 0 ? -2.6 : 0.6;
        edge.length = 100;
        edge.smooth = {
          enabled: true,
          type: "curvedCCW",
          roundness,
        };
      });
    }
  });

  return edges;
};

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setGraphData: (state, action) => {
      const data = action.payload;

      const mappedNodes = data.nodes.map((node) => ({
        id: node.id,
        label: node.title,
        shape: "circularImage",
        color: node.color || "#B6C0D0",
        image: node.icon || "/default.svg",
        properties: node.properties,
      }));

      const styledEdges = applyEdgeStyles(data.edges);

      state.graphData = {
        nodes: mappedNodes,
        edges: styledEdges,
        meta: data.meta,
      };

      state.nodesCount = data.nodes.length;
      state.edgesCount = data.edges.length;
      state.nodelabelCount = data.nodes.reduce((acc, node) => {
        const label = node.label[0];
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});

      state.edgeLabelCount = data.edges.reduce((acc, edge) => {
        const label = edge.label;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    setSelectedEdge: (state, action) => {
      state.selectedEdge = action.payload;
    },
    setRightClickNode: (state, action) => {
      state.rightClickNodeId = action.payload.nodeId;
      state.rightClickPosition = action.payload.position;
    },
    expandGraphData: (state, action) => {
        const newData = action.payload;
      
        const newNodes = newData.nodes.filter(newNode => (
          !state.graphData.nodes.some(existingNode => existingNode.id === newNode.id)
        ));
      
        const mappedNodes = newNodes.map((node) => ({
          id: node.id,
          label: node.title,
          shape: "circularImage",
          color: node.color || "#B6C0D0",
          image: node.icon || "/default.svg",
          properties: node.properties,
        }));
      
        const newEdges = newData.edges.filter(newEdge => (
          !state.graphData.edges.some(existingEdge => existingEdge.id === newEdge.id)
        ));
      
        const styledEdges = applyEdgeStyles([...state.graphData.edges, ...newEdges]);
      
        newNodes.forEach(node => {
          const label = node.title;
          state.nodelabelCount[label] = (state.nodelabelCount[label] || 0) + 1;
        });
      
        newEdges.forEach(edge => {
          const label = edge.label;
          state.edgeLabelCount[label] = (state.edgeLabelCount[label] || 0) + 1;
        });
      
        state.graphData = {
          nodes: [...state.graphData.nodes, ...mappedNodes],
          edges: styledEdges,
          meta: newData.meta,
        };
      
        state.nodesCount += newNodes.length;
        state.edgesCount += newEdges.length;
      },
  },
});

export const { setGraphData, setSelectedNode, setSelectedEdge, setRightClickNode, expandGraphData } = graphSlice.actions;
export const selectGraphData = (state) => state.graph.graphData;
export const selectSelectedNode = (state) => state.graph.selectedNode;
export const selectSelectedEdge = (state) => state.graph.selectedEdge;
export const selectNodesCount = (state) => state.graph.nodesCount;
export const selectEdgesCount = (state) => state.graph.edgesCount;
export const selectNodeLabelCount = (state) => state.graph.nodelabelCount;
export const selectEdgeLabelCount = (state) => state.graph.edgeLabelCount;
export const selectRightClickNodeId = (state) => state.graph.rightClickNodeId;
export const selectRightClickPosition = (state) => state.graph.rightClickPosition;

export default graphSlice.reducer;

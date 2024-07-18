import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  graph: {},
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
      const { data, id } = action.payload;
      const mappedNodes = data.nodes.map((node) => ({
        id: node.id,
        label: node.title,
        shape: "circularImage",
        color: node.color || "#B6C0D0",
        image: node.icon || "/default.svg",
        properties: node.properties,
      }));
      const mappedEdges = data.edges.map((edge) => ({
        ...edge,
        color: { color: "#191919", hover: "#ff1919" },
        width: 0.5,
      }));

      const styledEdges = applyEdgeStyles(mappedEdges);
      const nodelabelCount = data.nodes.reduce((acc, node) => {
        const label = node.title;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});
      const edgelabelCount = data.edges.reduce((acc, edge) => {
        const label = edge.label;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});

      state.graph[id] = {
        graphData: {
          nodes: mappedNodes,
          edges: styledEdges,
          meta: data.meta,
        },
        selectedNode: null,
        selectedEdge: null,
        nodesCount: mappedNodes.length,
        edgesCount: styledEdges.length,
        nodelabelCount: nodelabelCount,
        edgelabelCount: edgelabelCount,
        rightClickNodeId: null,
        rightClickPosition: { x: 0, y: 0 },
      };
    },
    setSelectedNode: (state, action) => {
      const { id, nodeId } = action.payload;
      state.graph[id].selectedNode = nodeId;
    },
    setSelectedEdge: (state, action) => {
      const { id, edgeId } = action.payload;
      state.graph[id].selectedEdge = edgeId;
    },
    setRightClickNode: (state, action) => {
      const { id, nodeId, position } = action.payload;
      state.graph[id].rightClickNodeId = nodeId;
      state.graph[id].rightClickPosition = position;
    },
    expandGraphData: (state, action) => {
      const { newData, id } = action.payload;
      const graphData = state.graph[id].graphData;

      const newNodes = newData.nodes.filter(newNode => (
        !graphData.nodes.some(existingNode => existingNode.id === newNode.id)
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
        !graphData.edges.some(existingEdge => existingEdge.id === newEdge.id)
      ));

      const styledEdges = applyEdgeStyles([...graphData.edges, ...newEdges]);

      newNodes.forEach(node => {
        const label = node.title;
        state.graph[id].nodelabelCount[label] = (state.graph[id].nodelabelCount[label] || 0) + 1;
      });

      newEdges.forEach(edge => {
        const label = edge.label;
        state.graph[id].edgelabelCount[label] = (state.graph[id].edgelabelCount[label] || 0) + 1;
      });

      state.graph[id].graphData = {
        nodes: [...graphData.nodes, ...mappedNodes],
        edges: styledEdges,
        meta: newData.meta,
      };

      state.graph[id].nodesCount += newNodes.length;
      state.graph[id].edgesCount += newEdges.length;
    },
    shortestPathGraphData: (state, action) => {
      const { newDataShortestPath, id } = action.payload;
      const graphData = state.graph[id].graphData;

      const newNodes = newDataShortestPath.nodes.filter(newNode => (
        !graphData.nodes.some(existingNode => existingNode.id === newNode.id)
      ));

      const mappedNodes = newNodes.map((node) => ({
        id: node.id,
        label: node.title,
        shape: "circularImage",
        color: node.color || "#B6C0D0",
        image: node.icon || "/default.svg",
        properties: node.properties,
      }));

      const newEdges = newDataShortestPath.edges.filter(newEdge => (
        !graphData.edges.some(existingEdge => existingEdge.id === newEdge.id)
      )).map((edge) => ({
        ...edge,
        length: 300,
        color: { color: '#0080ff' },
        width: 4,
      }));

      const updatedExistingEdges = graphData.edges.map((edge) => {
        if (newDataShortestPath.edges.some(newEdge => newEdge.id === edge.id)) {
          return {
            ...edge,
            color: { color: '#0080ff' },
            length: 300,
            width: 4,
          };
        }
        return edge;
      });

      const styledEdges = applyEdgeStyles([...updatedExistingEdges, ...newEdges]);

      newNodes.forEach(node => {
        const label = node.title;
        state.graph[id].nodelabelCount[label] = (state.graph[id].nodelabelCount[label] || 0) + 1;
      });

      newEdges.forEach(edge => {
        const label = edge.label;
        state.graph[id].edgelabelCount[label] = (state.graph[id].edgelabelCount[label] || 0) + 1;
      });

      state.graph[id].graphData = {
        nodes: [...graphData.nodes, ...mappedNodes],
        edges: styledEdges,
        meta: newDataShortestPath.meta,
      };

      state.graph[id].nodesCount += newNodes.length;
      state.graph[id].edgesCount += newEdges.length;
    },
  },
});

export const { setGraphData, setSelectedNode, setSelectedEdge, setRightClickNode, expandGraphData, shortestPathGraphData } = graphSlice.actions;
export const selectGraphData = (state) => state.graph;
export const selectSelectedNode = (state, id) => state.graph[id]?.selectedNode;
export const selectSelectedEdge = (state, id) => state.graph[id]?.selectedEdge;
export const selectNodesCount = (state, id) => state.graph[id]?.nodesCount;
export const selectEdgesCount = (state, id) => state.graph[id]?.edgesCount;
export const selectNodeLabelCount = (state, id) => state.graph[id]?.nodelabelCount;
export const selectEdgeLabelCount = (state, id) => state.graph[id]?.edgelabelCount;
export const selectRightClickNodeId = (state, id) => state.graph[id]?.rightClickNodeId;
export const selectRightClickPosition = (state, id) => state.graph[id]?.rightClickPosition;

export default graphSlice.reducer;

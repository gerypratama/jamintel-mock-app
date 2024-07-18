import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import countries from '../../data/indonesia-province.json';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

const provinceWeights = {
    "IRIAN JAYA TIMUR": 505,
    "NUSATENGGARA BARAT": 305,
    "BENGKULU": 255,
    "SUMATERA SELATAN": 205,
    "DKI JAKARTA": 155,
    "JAWA BARAT": 105,
    "BALI": 55,
  };

function getColor(weight) {
  return weight > 500 ? '#ff0000' :
        weight > 300 ? '#ff4c4c' :
        weight > 250 ? '#ffa500' :
        weight > 200 ? '#ffc04c' :
        weight > 150 ? '#ffdb99' :
        weight > 100 ? '#FFFF00' :
        weight > 50 ? '#FFFF7F' :
        '#FF0000';
  }

function HeatMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(117.5);
  const [lat, setLat] = useState(-2.5);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(6));
        setLat(map.current.getCenter().lat.toFixed(6));
        setZoom(map.current.getZoom().toFixed(2));
      });

      map.current.on("load", () => {
        map.current.addSource("provinces", {
          type: "geojson",
          data: countries,
        });

        map.current.addLayer({
            id: "provinces-layer",
            type: "fill",
            source: "provinces",
            paint: {
              "fill-color": [
                "match",
                ["get", "Propinsi"],
                ...Object.keys(provinceWeights).flatMap(key => [
                  key,
                  getColor(provinceWeights[key])
                ]),
                '#008000'
              ],
              "fill-opacity": 1
            }
          });

      });
    }

    return () => map.current.remove();
  }, []);

  return (
    <Card height="100%" width="100%" sx={{ bgcolor: "whitesmoke" }}>
      <CardHeader
        title="Heatmap"
        sx={{
          fontWeight: 600,
          color: "#028f41",
        }}
      />

      <Box width="100%" height={600} position="relative">
        <div
          ref={mapContainer}
          className="map-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%",
          }}
        />
      </Box>
    </Card>
  );
}

export default HeatMap;

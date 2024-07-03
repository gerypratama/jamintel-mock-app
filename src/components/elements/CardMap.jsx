import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent, colors, Box } from "@mui/material";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

function CardMap({ width, height }) {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(106.816);
  const [lat, setLat] = useState(-6.271);
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(6));
      setLat(map.getCenter().lat.toFixed(6));
      setZoom(map.getZoom().toFixed(2));
    });

    console.log(map);

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <Card height="100%" width="100%" sx={{ bgcolor: "whitesmoke" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h7" }}
        title="Peta Deteksi"
        sx={{
          fontWeight: 600,
          color: "#028f41",
        }}
      />

      <Box width={width} height={600} position="relative">
        <div
          ref={mapContainer}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "full",
          }}
        />
      </Box>
    </Card>
  );
}

export default CardMap;

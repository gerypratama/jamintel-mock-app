import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent, colors, Box } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import Cookies from "js-cookie";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

function CardMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(115);
  const [lat, setLat] = useState(-1);
  const [zoom, setZoom] = useState(4);
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_BACKEND_BASE
    }/perjalanan-buronan/suspect-journey`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        const callsData = res.data;
        setData(callsData.nodes);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      if (map.current) return;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      // Add markers and line
      const markers = [];
      data &&
        data.forEach((marker) =>
          markers.push({
            lng: marker.properties.longitude,
            lat: marker.properties.latitude,
            msg: marker.properties.content,
          })
        );
      
      console.log(markers)

      markers.forEach((marker) => {
        // Create a DOM element for the marker
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundColor = "red";
        el.style.width = "10px";
        el.style.height = "10px";
        el.style.borderRadius = "50%";

        // Create the popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(marker.msg);

        // Create the marker
        new mapboxgl.Marker(el)
          .setLngLat([marker.lng, marker.lat])
          .setPopup(popup)
          .addTo(map.current);
      });

      // Add a line connecting the markers
      map.current.on("load", () => {
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: markers.map((m) => [m.lng, m.lat]),
            },
          },
        });
        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
      });

      // Add navigation control (the +/- zoom buttons)
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(6));
        setLat(map.current.getCenter().lat.toFixed(6));
        setZoom(map.current.getZoom().toFixed(2));
      });

      console.log(map);

      // Clean up on unmount
      return () => map.current.remove();
    }
  }, [data]);

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
            height: "full",
          }}
        />
      </Box>
    </Card>
  );
}

export default CardMap;

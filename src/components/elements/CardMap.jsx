import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardHeader, CardContent } from "@mui/material";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import { useReadCypher } from "use-neo4j";

const position = [-2.4, 117.6];

function CardMap() {
  const [data, setData] = useState([]);
  const query =
    "MATCH (n:Kab_Kota) RETURN n.longitude as lon, n.latitude as lat";
  const { run } = useReadCypher(query);

  useEffect(() => {
    const fetchData = async () => {
      const results = await run();
      setData(
        results.records.map((record) => ({
          longitude: record.get("lon"),
          latitude: record.get("lat"),
          intensity: 1,
        }))
      );
    };

    fetchData();
  }, []);

  const points = data.map((point) => [
    point.longitude,
    point.latitude,
    point.intensity,
  ]);
  
  return (
    <Card height="100%" width="100%">
      <CardHeader
        titleTypographyProps={{ variant: "h7" }}
        title="Peta Deteksi"
        sx={{
          bgcolor: "#5f5228",
          color: "white",
          fontFamily: "Avenir Next Cyr",
        }}
      />

      <MapContainer
        center={position}
        zoom={4}
        style={{ height: "480px", width: "960px", maxWidth: '' }}
      >
        <HeatmapLayer
          points={points}
          longitudeExtractor={(m) => m[0]}
          latitudeExtractor={(m) => m[1]}
          intensityExtractor={(m) => m[2]}
        />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Card>
  );
}

export default CardMap;

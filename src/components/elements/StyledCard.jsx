import { Card, CardContent, CardHeader } from "@mui/material";

export default function StyledCard({ title, children }) {
  return (
    <Card sx={{ bgcolor: "#33714E" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h7" }}
        title={title}
        sx={{
          fontWeight: 700,
          color: "white",
        }}
      />
      <CardContent sx={{pt: 1}}>{children}</CardContent>
    </Card>
  );
}

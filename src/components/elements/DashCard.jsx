import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

export default function DashCard({ bgCol, txtCol, title, content }) {
  return (
    <Card sx={{ bgcolor: bgCol, color: txtCol }}>
      <CardHeader
        title={title}
        sx={{
          fontSize: 20,
          fontWeight: 700,
          textAlign: "center",
          pt: 4,
        }}
      />
      <CardContent
        sx={{
          fontSize: 60,
          fontWeight: 700,
          textAlign: "center",
          mb: 1,
        }}
      >
        {content}
      </CardContent>
    </Card>
  );
}

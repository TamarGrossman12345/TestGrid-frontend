import { Typography, Box } from "@mui/material";

const EmptyNotice = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      py: 10,
      opacity: 0.6,
    }}
  >
    <Typography variant="h6" fontWeight="600">
      {title}
    </Typography>
    <Typography variant="body2">{description}</Typography>
  </Box>
);

export default EmptyNotice;

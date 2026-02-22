// src/components/dashboard/StatsFooter.tsx
import { Box, Paper, Typography } from "@mui/material";

interface StatsFooterProps {
  total: number;
  pass: number;
  fail: number;
  inProgress: number;
}

export const StatsFooter = ({ total, pass, fail, inProgress }: StatsFooterProps) => (
  <Paper elevation={0} sx={{ borderTop: "1px solid", borderColor: "divider", px: 4, py: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Total: <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>{total}</Box>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pass: <Box component="span" sx={{ color: "success.main", fontWeight: 600 }}>{pass}</Box>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fail: <Box component="span" sx={{ color: "error.main", fontWeight: 600 }}>{fail}</Box>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          In Progress: <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>{inProgress}</Box>
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">Last updated: Just now</Typography>
    </Box>
  </Paper>
);
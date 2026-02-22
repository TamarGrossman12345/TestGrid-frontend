// src/components/dashboard/FilterBar.tsx
import {
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { Search, Filter, Upload, Download } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
}

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
}: FilterBarProps) => (
  <Paper
    elevation={0}
    sx={{
      borderBottom: "2px solid",
      borderColor: "primary.light",
      p: 2,
      bgcolor: "#ffffff",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
        <TextField
          size="small"
          placeholder="Search test cases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "100%",
            maxWidth: 500,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "primary.main" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="#db2777" />
              </InputAdornment>
            ),
          }}
        />

        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          size="small"
          sx={{
            minWidth: 140,
            color: "primary.main",
            borderColor: "primary.main",
        
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "primary.50",
             
            },
          }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="pass">Pass</MenuItem>
          <MenuItem value="fail">Fail</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
        </Select>

      </Box>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Button
          variant="text"
          size="small"
          startIcon={<Upload size={18} />}
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Import
        </Button>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ height: 24, my: "auto", mx: 0.5 }}
        />

        <Button
          variant="text"
          size="small"
          startIcon={<Download size={18} />}
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Export
        </Button>
      </Box>
    </Box>
  </Paper>
);

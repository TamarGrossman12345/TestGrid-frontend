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
import {
  Search,
  Filter,
  Upload,
  Download,
  FileSpreadsheet,
} from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  activeFolderId: string | undefined;
}

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  activeFolderId,
}: FilterBarProps) => {
  const buttonDisableStyle = {
    "&.Mui-disabled": {
      color: "secondary.main",
      opacity: 0.7,
    },
  };

  return (
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
            disabled={activeFolderId === undefined}
            size="small"
            placeholder="Search test cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: "100%",
              maxWidth: 500,
              borderColor: "grey.300",
              "& .MuiOutlinedInput-root": {
                "&.Mui-disabled": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#db2777 !important",
                    opacity: 0.5,
                  },
                },
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "primary.main",
                },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search
                    size={18}
                    // משנה את שקיפות האייקון לפי המצב
                    style={{
                      color: "#db2777",
                      opacity: activeFolderId === undefined ? 0.5 : 1,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <Select
            disabled={activeFolderId === undefined}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="small"
            sx={{
              minWidth: 140,
              color: "primary.main",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey.300",
              },

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
              "&.Mui-disabled": {
                "& .MuiSelect-select": {
                  WebkitTextFillColor: "secondary.main",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main",
                  opacity: 0.5,
                },
              },
            }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="pass">Pass</MenuItem>
            <MenuItem value="fail">Fail</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
          </Select>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Button
            disabled={activeFolderId === undefined}
            variant="text"
            size="small"
            startIcon={<FileSpreadsheet size={16} />}
            sx={buttonDisableStyle}
          >
            Bulk Edit
          </Button>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 24, my: "auto", mx: 0.9 }}
          />

          <Button
            variant="text"
            disabled={activeFolderId === undefined}
            size="small"
            startIcon={<Upload size={18} />}
            sx={{
              ...buttonDisableStyle,
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            Import
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 24, my: "auto", mx: 0.9 }}
          />

          <Button
            variant="text"
            size="small"
            disabled={activeFolderId === undefined}
            startIcon={<Download size={18} />}
            sx={{
              ...buttonDisableStyle,
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            Export
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FilterBar;

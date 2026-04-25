import {
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Search,
  Filter,
  Upload,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import { TestCase } from "../../types";
import { handleExportToExcel } from "../../utils/excelActions";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  activeFolderId: string | undefined;
  currentTestCases: TestCase[];
}

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  activeFolderId,
  currentTestCases,
}: FilterBarProps) => {
  const theme = useTheme();
  const isControlDisabled = activeFolderId === undefined;

  const buttonDisableStyle = {
    textTransform: "none",
    fontWeight: 600,
    "&.Mui-disabled": {
      color: "secondary.main",
      opacity: 0.7,
      borderColor: "secondary.main",
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderBottom: "2px solid",
        borderColor: "primary.light",
        p: 1.5,
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
            disabled={isControlDisabled}
            size="small"
            placeholder="Search test cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: "100%",
              maxWidth: 500,
              "& .MuiOutlinedInput-root": {
                "&.Mui-disabled": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search
                    size={18}
                    style={{
                      color: theme.palette.secondary.main,
                      opacity: activeFolderId === undefined ? 0.5 : 1,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <Select
            disabled={isControlDisabled}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="small"
            sx={{
              minWidth: 140,
              color: "grey.600",
              "&.Mui-disabled": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main",
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
            disabled={isControlDisabled}
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
            disabled={isControlDisabled}
            size="small"
            startIcon={<Upload size={18} />}
            sx={{
              ...buttonDisableStyle,
              color: theme.palette.primary.main,
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
            disabled={isControlDisabled || currentTestCases.length === 0}
            startIcon={<Download size={18} />}
            onClick={() => handleExportToExcel(currentTestCases)}
            sx={{
              ...buttonDisableStyle,
              color: theme.palette.primary.main,
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

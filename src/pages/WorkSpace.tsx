// src/pages/Dashboard.tsx
import React, { useState, useMemo } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { RefreshCw, Plus } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import { StatsFooter } from "../components/Workspace/StatsFooter";
import { FilterBar } from "../components/Workspace/FilterBar";
import { TestCase, User, Project } from "../types";
import { TestGrid } from "../components/Workspace/TestGrid";

interface WorkSpaceProps {
  testCases: TestCase[];
  users: User[];
  projects: Project[];
}

export const WorkSpace = ({ testCases, users, projects }: WorkSpaceProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // לוגיקת סינון - משתמשים ב-useMemo כדי לא לחשב מחדש סתם
  const filteredTestCases = useMemo(() => {
    return testCases.filter((tc) => {
      const matchesSearch =
        tc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tc.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || tc.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [testCases, searchQuery, filterStatus]);

  const stats = useMemo(() => {
    return {
      total: testCases.length,
      pass: testCases.filter((t) => t.status === "pass").length,
      fail: testCases.filter((t) => t.status === "fail").length,
      inProgress: testCases.filter((t) => t.status === "in-progress").length,
    };
  }, [testCases]);

  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      <Sidebar projects={projects} />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 1,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Test Cases
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredTestCases.length} test cases found
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button variant="outlined" startIcon={<RefreshCw size={16} />}>
              Sync
            </Button>

            <Button variant="contained" startIcon={<Plus size={16} />}>
              New Test
            </Button>
          </Box>
        </Box>

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>
          <TestGrid testCases={filteredTestCases} />
        </Box>

        <StatsFooter {...stats} />
      </Box>
    </Box>
  );
};

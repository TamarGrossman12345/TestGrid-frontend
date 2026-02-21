import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  MoreVertical,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';

import { TestCase, User, Project } from '../types';
import { Sidebar } from './Sidebar';
// import { TestGrid } from './TestGrid';
// import { UserManagementModal } from './UserManagementModal';

interface DashboardProps {
  testCases: TestCase[];
  users: User[];
  projects: Project[];
  onLogout: () => void;
}

export function Dashboard({ testCases, users, projects, onLogout }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTestCases = testCases.filter((tc) => {
    const matchesSearch =
      tc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tc.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === 'all' || tc.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const passCount = testCases.filter((t) => t.status === 'pass').length;
  const failCount = testCases.filter((t) => t.status === 'fail').length;
  const inProgressCount = testCases.filter((t) => t.status === 'in-progress').length;

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      <Sidebar
        projects={projects}
        onOpenUserManagement={() => setShowUserManagement(true)}
        onLogout={onLogout}
      />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <Paper elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="h4">Test Cases</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                iOS Authentication • {filteredTestCases.length} test cases
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button variant="outlined" startIcon={<RefreshCw size={16} />}>
                Sync
              </Button>
              <Button variant="contained" startIcon={<Plus size={16} />}>
                New Test
              </Button>
            </Box>
          </Box>

          {/* Search and Filters */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search test cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                size="small"
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pass">Pass</MenuItem>
                <MenuItem value="fail">Fail</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>

              <Button variant="outlined" startIcon={<Filter size={16} />}>
                More Filters
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Toolbar */}
        <Paper elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 3, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button variant="outlined" size="small" startIcon={<Upload size={16} />}>
                Import Excel
              </Button>
              <Button variant="outlined" size="small" startIcon={<Download size={16} />}>
                Export Excel
              </Button>
              <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
              <Button variant="text" size="small" startIcon={<FileSpreadsheet size={16} />}>
                Bulk Edit
              </Button>
            </Box>

            <Button variant="text" size="small">
              <MoreVertical size={16} />
            </Button>
          </Box>
        </Paper>

        {/* Grid Container */}
        {/* <Box sx={{ flexGrow: 1, overflow: 'auto', bgcolor: 'background.paper' }}>
          <TestGrid testCases={filteredTestCases} users={users} />
        </Box> */}

        {/* Footer Stats */}
        <Paper elevation={0} sx={{ borderTop: '1px solid', borderColor: 'divider', px: 3, py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Total: <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>{testCases.length}</Box>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pass: <Box component="span" sx={{ color: 'success.main', fontWeight: 600 }}>{passCount}</Box>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fail: <Box component="span" sx={{ color: 'error.main', fontWeight: 600 }}>{failCount}</Box>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Progress: <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>{inProgressCount}</Box>
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Last updated: Just now
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* {showUserManagement && (
        <UserManagementModal users={users} onClose={() => setShowUserManagement(false)} />
      )} */}
      
    </Box>
  );
}
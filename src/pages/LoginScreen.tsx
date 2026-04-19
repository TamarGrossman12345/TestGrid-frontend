import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  Container,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { LogIn, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/common/Logo";

export const LoginScreen = () => {
  const navigate = useNavigate();
  //   const { login } = useAuth(); // מושכים את פונקציית ההתחברות מה-Context

  const [tabValue, setTabValue] = useState(0);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamRole, setTeamRole] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // כאן בעתיד תבוא הקריאה האמיתית ל-Backend (axios.post...)
    // console.log("מנסה להתחבר עם:", { username, password });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #fdf2f8 0%, #ffffff 50%, #fce7f3 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="800"
            gutterBottom
            sx={{ color: "grey.900" }}
          >
            TestGrid
          </Typography>
          <Typography variant="body2" color="text.secondary">
            מערכת לניהול בדיקות התוכנה הצוותיות
          </Typography>
        </Box>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "grey.200",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            sx={{ mb: 4 }}
          >
            <Tab label="התחברות" sx={{ fontWeight: 600 }} />
            <Tab label="הרשמה" sx={{ fontWeight: 600 }} />
          </Tabs>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {tabValue === 1 && (
                <>
                  <TextField
                    fullWidth
                    label="צוות"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GroupsIcon sx={{ fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="תפקיד"
                    value={teamRole}
                    onChange={(e) => setTeamRole(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}

              <TextField
                fullWidth
                label="שם משתמש"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DriveFileRenameOutlineIcon sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="סיסמה"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
              >
                {tabValue === 0 ? "כניסה למערכת" : "צור חשבון חדש"}
              </Button>
            </Box>
          </form>
        </Paper>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 4 }}
        >
          תיעוד - ניהול - אוטומציה
        </Typography>
      </Container>
    </Box>
  );
};

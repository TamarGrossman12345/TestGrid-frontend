import { Alert, AlertColor, Slide, Snackbar } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";

interface NotificationContextType {
  showNotification: (message: string, severity?: AlertColor) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as AlertColor,
  });

  const showNotification = (
    message: string,
    severity: AlertColor = "success",
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => setSnackbar((prev) => ({ ...prev, open: false }));
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "12px",
            fontWeight: 600,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            "&.MuiAlert-filledSuccess": { bgcolor: "primary.main" },
            "& .MuiAlert-icon": { fontSize: 22 },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};

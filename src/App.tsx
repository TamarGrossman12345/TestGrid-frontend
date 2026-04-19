import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAllProjects } from "./services/api";
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider, useAuth } from "./context/AuthContext"; // הנחת יסוד שיצרת את הקובץ
import { WorkSpace } from "./pages/WorkSpace";
import { LoginScreen } from "./pages/LoginScreen";

// קומפוננטה ששומרת על הנתיבים המוגנים
// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated } = useAuth();

//   // אם המשתמש לא מחובר, הוא נזרק לדף ההתחברות
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };

function App() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <BrowserRouter>
      {/* <AuthProvider>  */}
      <NotificationProvider>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />

          <Route
            path="/workspace"
            element={
              // <ProtectedRoute>
              <WorkSpace
                projects={projects}
                onRefreshProjects={fetchProjects}
              />
              // </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </NotificationProvider>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import RedirectToHomeIfAuthenticated from "./routes/RedirectToHomeIfAuthenticated";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectToHomeIfAuthenticated />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

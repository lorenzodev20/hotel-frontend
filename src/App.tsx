import { BrowserRouter, Route, Routes } from "react-router";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RedirectToHomeIfAuthenticated from "./routes/RedirectToHomeIfAuthenticated";
import { AuthProvider } from "./context/AuthContext";
import HotelsPage from "./pages/hotel/HotelsPage";
import HotelUpdatePage from "./pages/hotel/HotelUpdatePage";
import HotelsCreate from "./pages/hotel/HotelsCreate";
import HotelsEdit from "./pages/hotel/HotelsEdit";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectToHomeIfAuthenticated />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<AuthenticatedLayout />}>
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/hotels/create" element={<HotelsCreate />} />
            <Route path="/hotels/:hotelId/edit" element={<HotelsEdit />} />
            <Route path="/hotels/:hotelId/availability" element={<HotelUpdatePage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

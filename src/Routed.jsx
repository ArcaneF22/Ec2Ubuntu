import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { HomePage } from "./pages/home";
import { NotFound } from "./pages/notFound";
import { AuthProvider } from "./components/authenticate/auth";


export default function AllRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

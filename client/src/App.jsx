import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Board from "./components/Board";
import AuthForm from "./components/AuthForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board" element={<Board />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import UpdatePasswordForm from "./components/UpdatePasswordForm/UpdatePasswordForm";
import UpdateUserNameForm from "./components/UpdateUserNameForm/UpdateUserNameForm";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/update-password-form" element={<UpdatePasswordForm />} />
        <Route path="/update-username-form" element={<UpdateUserNameForm />} />
      </Routes>
    </Layout>
  );
}

export default App;

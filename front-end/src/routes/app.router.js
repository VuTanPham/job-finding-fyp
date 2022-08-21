import { Routes, Route } from "react-router-dom";
import AppContainer from "../containers/app.container";
import HomePage from "../features/landing-page/home";
import LoginPage from "../features/login-page/login";
import RegisterPage from "../features/register-page/register";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AppContainer>
            <LoginPage />
          </AppContainer>
        }
      />
      <Route
        path="/register"
        element={
          <AppContainer>
            <RegisterPage />
          </AppContainer>
        }
      />
      <Route
        path="/"
        element={
          <AppContainer>
            <HomePage />
          </AppContainer>
        }
      />
    </Routes>
  );
};

export default AppRouter;

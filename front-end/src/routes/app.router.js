import { Routes, Route } from "react-router-dom";
import AppContainer from "../containers/app.container";
import LoginPage from "../features/login-page/login";
import RegisterPage from "../features/register-page/register";

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<AppContainer>
                <LoginPage />
            </AppContainer>} />
            <Route path="/register" element={<AppContainer>
                <RegisterPage />
            </AppContainer>} />
        </Routes>
    )
}

export default AppRouter;
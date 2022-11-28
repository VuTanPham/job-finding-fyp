import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AppContainer from "../containers/app.container";
import LandingPage from "../features/landing-page/home";
import LoginPage from "../features/login-page/login";
import RegisterPage from "../features/register-page/register";
import { authContext } from "../cores/context/auth";
import HomePage from "../features/home-page/home";
import NotFound from "../features/not-found/not-found";
import UserProfile from "../features/user-profile/profile";
import ManagePosts from "../features/manage-posts";
import JobApplied from "../features/job-applied";
import PostDetail from "../features/detail";
import Connections from "../features/connection";

const AppRouter = () => {
  const {
    state: { isAuthenticated, user },
  } = useContext(authContext);

  return (
    <Routes>
      <Route path='/' element={<AppContainer />}>
        {!isAuthenticated && (
          <>
            <Route path='' element={<LandingPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
          </>
        )}
        {isAuthenticated && (
          <>
            <Route path='' element={<HomePage />} />
            <Route path='/connections' element={<Connections />} />
            <Route path='detail/:id' element={<PostDetail />} />
            <Route path='user-profile/:id' element={<UserProfile />} />
            {user.accountType === "company" && (
              <>
                <Route path='manage-posts' element={<ManagePosts />} />
              </>
            )}
            {user.accountType === "employee" && (
              <>
                <Route path='applied-posts' element={<JobApplied />} />
              </>
            )}
          </>
        )}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

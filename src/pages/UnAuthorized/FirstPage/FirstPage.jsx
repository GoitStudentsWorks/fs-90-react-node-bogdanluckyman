import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Layout } from '../../../components/Layout/Layout';
import { RestrictedRoute } from '../../../RestrictedRoute';
import { PrivateRoute } from '../../../PrivateRoute';
import { LoadingMessage } from '../../../App.styled';
import { refreshUser } from '../../../redux/auth/operation';

const HomePage = lazy(() => import('../../../pages/Home/Home'));
const RegisterPage = lazy(() => import('../SignUp/SignUp'));
const LoginPage = lazy(() => import('../SignIn/SignIn'));
const ProfilePage = lazy(() =>
  import('../../Authorized/ProfilePage/ProfilePage')
);

const FirstPage = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <LoadingMessage>Refreshing...</LoadingMessage>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/signup"
            element={
              <RestrictedRoute
                redirectTo="/profile"
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute
                redirectTo="/profile"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute redirectTo="/profile" component={<ProfilePage />} />
            }
          />
          <Route path="*" element={<Navigate to="/error" />} />
        </Route>
      </Routes>
    </>
  );
};
export default FirstPage;

import { Navigate, Route, Routes } from 'react-router-dom';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import { AppWrapper } from './App.styled';
import { useAuth } from './hooks/useAuth';
import { useDispatch } from 'react-redux';
import { Suspense, lazy, useEffect, useState } from 'react';
import { refreshUser } from './redux/auth/operation';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import { ExercisesSubcategoriesList } from './components/ExercisesSubcategoriesList/ExercisesSubcategoriesList';
import { ExercisesList } from './components/ExercisesList/ExercisesList';
import { Loader } from './components/Loader/Loader';

const FirstPage = lazy(() =>
  import('./pages/UnAuthorized/FirstPage/FirstPage')
);

const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'));

const DiaryPage = lazy(() => import('./pages/Authorized/DiaryPage/DiaryPage'));

const ProfilePage = lazy(() =>
  import('./pages/Authorized/ProfilePage/ProfilePage')
);

const ProductsPage = lazy(() =>
  import('./pages/Authorized/ProductsPage/ProductsPage')
);

const ExercisesPage = lazy(() =>
  import('./pages/Authorized/ExercisesPage/ExercisesPage')
);

const SignUp = lazy(() => import('./pages/UnAuthorized/SignUp/SignUp'));

const Login = lazy(() => import('./pages/UnAuthorized/SignIn/SignIn'));

function App() {
  const { isLoggedIn, isUserParams } = useAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(refreshUser());
    setLoading(false);
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(true);
      dispatch(refreshUser());
      setLoading(false);
    }
  }, [isLoggedIn, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <AppWrapper>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={isLoggedIn ? <ProfilePage /> : <FirstPage />}
            />
            <Route path="/welcome" element={<FirstPage />} />
            <Route
              path="/signup"
              element={
                <RestrictedRoute redirectTo="/profile" component={<SignUp />} />
              }
            />
            <Route
              path="/signin"
              element={
                !isUserParams ? (
                  <RestrictedRoute redirectTo="/diary" component={<Login />} />
                ) : (
                  <RestrictedRoute
                    redirectTo="/profile"
                    component={<Login />}
                  />
                )
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute redirectTo="/" component={<ProfilePage />} />
              }
            />
            <Route
              path="/diary"
              element={
                isUserParams ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <PrivateRoute redirectTo="/" component={<DiaryPage />} />
                )
              }
            />
            <Route
              path="/products"
              element={
                isUserParams ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <PrivateRoute redirectTo="/" component={<ProductsPage />} />
                )
              }
            />
            <Route
              path="/exercises"
              element={
                isUserParams ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <PrivateRoute redirectTo="/" component={<ExercisesPage />} />
                )
              }
            >
              <Route
                index
                element={<Navigate to="/exercises/Body parts" replace />}
              />
              <Route
                path="/exercises/:filter"
                element={<ExercisesSubcategoriesList />}
              />
              <Route
                path="/exercises/:filter/:filterList"
                element={<ExercisesList />}
              />
            </Route>
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/error" />} />
          </Route>
        </Routes>
      </Suspense>
    </AppWrapper>
  );
}
export default App;

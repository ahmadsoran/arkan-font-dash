import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import DashboardApp from './pages/DashboardApp';
import UploadFonts from './components/UploadFonts';
import { useDispatch } from 'react-redux';
import { removeToken } from './feature/tokenSlice';
import { useProfileQuery } from './app/appApi';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function Router() {
  const { error } = useProfileQuery()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    if (error?.data?.error === 'invalid token') {
      dispatch(removeToken())
      navigate('/login')
    }
  }, [error]) // eslint-disable-line react-hooks/exhaustive-deps
  return useRoutes([
    {

      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'uploadFonts', element: <UploadFonts /> },
        { path: 'fonts', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

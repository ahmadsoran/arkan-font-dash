import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import DashboardApp from './pages/DashboardApp';
import { useProfileQuery } from './app/appApi';
import UploadFonts from './components/UploadFonts';

// ----------------------------------------------------------------------

export default function Router() {
  const { data } = useProfileQuery()
  return useRoutes([
    {

      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: data && <DashboardApp /> },
        { path: 'user', element: data && <User /> },
        { path: 'uploadFonts', element: data && <UploadFonts /> },
        { path: 'fonts', element: data && <Blog /> },
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

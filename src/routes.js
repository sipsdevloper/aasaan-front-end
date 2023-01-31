import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardMain from './layouts/dashboard/DashboardMain';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import DashboardAllApp from './pages/DashboardAllApp';

import Vehicle from './pages/Vehicle';
import VehicleAdd from './pages/VehicleAdd';
import User from './pages/User';
import UserAdd from './pages/UserAdd';
import UserEdit from './pages/UserEdit';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Allocatoin from './pages/Allocation';
import AllocationAdd from './pages/AllocationAdd';
import Activity from './pages/Activity';

// ----------------------------------------------------------------------

export default function Router() {
  let isLoggedIn 
  const userInfo = localStorage.getItem('user');
  if(userInfo){
    isLoggedIn=true
  }else{
    isLoggedIn=false
  }
  console.log(isLoggedIn)

  return useRoutes([
    {
      path: '/maindashboard',
      element: isLoggedIn ? <DashboardMain /> : <Navigate to="/login" />,
      children: [
        { path: 'apps', element: <DashboardAllApp /> },
        { path: 'logout', element: <Logout /> },

      ],
    },
    {
      path: '/dashboard',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'user/add', element: <UserAdd /> },
        { path: 'user/update/:id', element: <UserEdit /> },
        { path: 'vehicle', element: <Vehicle /> },
        { path: 'vehicle/add', element: <VehicleAdd /> },
        { path: 'allocation', element: <Allocatoin /> },
        { path: 'allocation/add', element: <AllocationAdd /> },
        { path: 'activity', element: <Activity /> },
        { path: 'logout', element: <Logout /> },

      ],
    },
    {
      path: '/',
      element: isLoggedIn ? <Navigate to="/Dashboard/app" /> :  <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

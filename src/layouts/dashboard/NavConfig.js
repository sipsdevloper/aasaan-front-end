// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  /* {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  }, */
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('bxs:user'),
  },
  {
    title: 'vehicle',
    path: '/dashboard/vehicle',
    icon: getIcon('mdi:car-sports-utility-vehicle'),
  },
  {
    title: 'allocation',
    path: '/dashboard/allocation',
    icon: getIcon('fa6-solid:arrows-spin'),
  },
  {
    title: 'User activity',
    path: '/dashboard/activity',
    icon: getIcon('eva:file-text-fill'),
  },
  /* {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  }, */
];

export default navConfig;

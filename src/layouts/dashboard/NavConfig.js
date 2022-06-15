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
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
    role: ['admin', 'dev', 'moderator'],
  },
  {
    title: 'Upload',
    path: '/dashboard/uploadFonts',
    icon: getIcon('eva:cloud-upload-outline'),
    role: ['admin', 'desv', 'moderator'],

  },
  {
    title: 'fonts',
    path: '/dashboard/fonts',
    icon: getIcon('ant-design:font-colors-outlined'),
  },

];

export default navConfig;

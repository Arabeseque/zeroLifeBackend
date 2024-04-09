import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [

    /** simple */
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/visualization/food-analysis/index.vue'),
      meta: {
        locale: '大屏数据展示',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    /** simple end */
  ],
};

export default DASHBOARD;

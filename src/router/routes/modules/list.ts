import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const LIST: AppRouteRecordRaw = {
  path: '/list',
  name: 'list',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '数据表单',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2,
  },
  children: [
    // {
    //   path: 'search-table', // The midline path complies with SEO specifications
    //   name: 'SearchTable',
    //   component: () => import('@/views/list/search-table/index.vue'),
    //   meta: {
    //     locale: 'menu.list.searchTable',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    {
      path: 'nutrition-able', // The midline path complies with SEO specifications
      name: 'nutritionTable',
      component: () => import('@/views/list/nutrition-table/index.vue'),
      meta: {
        locale: '营养表格',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // 营养计划表
    {
      path: 'nutrition-plan-table', // The midline path complies with SEO specifications
      name: 'nutritionPlanTable',
      component: () => import('@/views/list/nutrition-plan-table/index.vue'),
      meta: {
        locale: '营养计划表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // 疾病记录表
    {
      path: 'disease-record-table', // The midline path complies with SEO specifications
      name: 'diseaseRecordTable',
      component: () => import('@/views/list/disease-record-table/index.vue'),
      meta: {
        locale: '疾病记录表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // 食物记录表
    {
      path: 'food-record-table', // The midline path complies with SEO specifications
      name: 'foodRecordTable',
      component: () => import('@/views/list/food-record-table/index.vue'),
      meta: {
        locale: '食物记录表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // 图片识别映射
    {
      path: 'image-recognize-table', // The midline path complies with SEO specifications
      name: 'imageRecognizeTable',
      component: () => import('@/views/list/image-recognize-table/index.vue'),
      meta: {
        locale: '图片识别映射',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // 营养记录表
    {
      path: 'nutrition-record-table', // The midline path complies with SEO specifications
      name: 'nutritionRecordTable',
      component: () => import('@/views/list/disease-record-table/index.vue'),
      meta: {
        locale: '营养记录表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // {
    //   path: 'card',
    //   name: 'Card',
    //   component: () => import('@/views/list/card/index.vue'),
    //   meta: {
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
  ],
};

export default LIST;

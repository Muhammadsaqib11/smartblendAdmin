import { lazy, useEffect } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import Dashboard from '@/pages/dashboard';
import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';

import WrapperRouteComponent from './config';
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
// import NewOrder from '../pages/orders/NewOrder';
// import OrdersPage from '@/pages/orders';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const OrdersPage = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/orders'));
const NewOrdersPage = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/orders/NewOrder'));

const Customers = lazy(() => import(/* webpackChunkName: "customers'"*/ '@/pages/customer'));
const RoutePermission = lazy(() => import(/* webpackChunkName: "route-permission"*/ '@/pages/permission/route'));
const FormPage = lazy(() => import(/* webpackChunkName: "form'"*/ '@/pages/components/form'));
const UserPage = lazy(() => import(/* webpackChunkName: "table'"*/ '@/pages/components/users'));
const ManageRolePage = lazy(() => import(/* webpackChunkName: "table'"*/ '@/pages/components/manage-role'));

const SearchPage = lazy(() => import(/* webpackChunkName: "search'"*/ '@/pages/components/settings'));
const TabsPage = lazy(() => import(/* webpackChunkName: "tabs'"*/ '@/pages/components/tabs'));
const AsidePage = lazy(() => import(/* webpackChunkName: "aside'"*/ '@/pages/components/aside'));
const RadioCardsPage = lazy(() => import(/* webpackChunkName: "radio-cards'"*/ '@/pages/components/radio-cards'));
const BusinessBasicPage = lazy(() => import(/* webpackChunkName: "basic-page" */ '@/pages/business/basic'));
const BusinessWithSearchPage = lazy(() => import(/* webpackChunkName: "with-search" */ '@/pages/business/with-search'));
const BusinessWithAsidePage = lazy(() => import(/* webpackChunkName: "with-aside" */ '@/pages/business/with-aside'));
const BusinessWithRadioCardsPage = lazy(() =>
  import(/* webpackChunkName: "with-aside" */ '@/pages/business/with-radio-cards'),
);
const BusinessWithTabsPage = lazy(() => import(/* webpackChunkName: "with-tabs" */ '@/pages/business/with-tabs'));

const routeList = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: '',
        element: <Navigate to="users" />,
      },
      {
        path: 'dashboard',
        element: <WrapperRouteComponent element={<Dashboard />} titleId="title.dashboard" />,
      },
      {
        path: 'orders',
        element: <WrapperRouteComponent element={<OrdersPage />} titleId="title.orders" />,
      },
      {
        path: 'orders/new-order',
        element: <WrapperRouteComponent element={<NewOrdersPage />} titleId="title.orders" />,
      },
      {
        path: 'customers',
        element: <WrapperRouteComponent element={<Customers />} titleId="title.guide" />,
      },
      {
        path: 'permission/route',
        element: <WrapperRouteComponent element={<RoutePermission />} titleId="title.permission.route" auth />,
      },
      {
        path: 'component/form',
        element: <WrapperRouteComponent element={<FormPage />} titleId="title.account" />,
      },
      {
        path: 'users',
        element: <WrapperRouteComponent element={<UserPage />} titleId="title.users" />,
      },
      {
        path: 'users/manage-role',
        element: <WrapperRouteComponent element={<ManageRolePage />} titleId="title.users" />,
      },

      {
        path: 'settings',
        element: <WrapperRouteComponent element={<SearchPage />} titleId="title.account" />,
      },
      {
        path: 'component/tabs',
        element: <WrapperRouteComponent element={<TabsPage />} titleId="title.account" />,
      },
      {
        path: 'component/aside',
        element: <WrapperRouteComponent element={<AsidePage />} titleId="title.account" />,
      },
      {
        path: 'component/radio-cards',
        element: <WrapperRouteComponent element={<RadioCardsPage />} titleId="title.account" />,
      },
      {
        path: 'business/basic',
        element: <WrapperRouteComponent element={<BusinessBasicPage />} titleId="title.account" />,
      },
      {
        path: 'business/with-search',
        element: <WrapperRouteComponent element={<BusinessWithSearchPage />} titleId="title.account" />,
      },
      {
        path: 'business/with-aside',
        element: <WrapperRouteComponent element={<BusinessWithAsidePage />} titleId="title.account" />,
      },
      {
        path: 'business/with-radio-cards',
        element: <WrapperRouteComponent element={<BusinessWithRadioCardsPage />} titleId="title.account" />,
      },
      {
        path: 'business/with-tabs',
        element: <WrapperRouteComponent element={<BusinessWithTabsPage />} titleId="title.account" />,
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />,
      },
    ],
  },
];

const RenderRouter = () => {
  const { logged, locale, device } = useSelector(state => state.user);
  const navigate=useNavigate()
useEffect(() => {
  if(logged){
    navigate('/')
  }else{
    navigate('/login')

  }
  
}, [logged]);
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;

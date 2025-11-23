import { ReactElement } from 'react';
import { Pokedex,  Dashboard } from './page';
import { Navigate } from 'react-router';

export interface RouteConfig {
  path: string;
  element: ReactElement;
}

export const routes: RouteConfig[] = [
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/pokedex',
    element: <Pokedex />,
  }
];


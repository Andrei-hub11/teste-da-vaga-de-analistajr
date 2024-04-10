import { RouteObject } from 'react-router-dom';

import AddCompany from '../pages/AddCompany/AddCompany';
import EditCompany from '../pages/EditCompany/EditCompany';
import Home from '../pages/Home/Home';

export const routes: RouteObject[] = [
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/adicionar-empresa',
        element: <AddCompany />,
    },
    {
        path: '/editar-empresa',
        element: <EditCompany />,
    },
];

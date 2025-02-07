import { HeaderOnly } from '~/layouts';
import { Home, Search, Login } from '~/pages';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, element: Home },
    { path: config.routes.search, element: Search, layout: null },
    { path: config.routes.login, element: Login, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
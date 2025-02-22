import { DefaultLayout, HeaderOnly } from '~/layouts';
import { Home, Search, Login, Cruise, Flight, Hotel, Business, Blog, Contact } from '~/pages';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, element: Home, layout: HeaderOnly },
    { path: config.routes.cruise, element: Cruise, layout: HeaderOnly },
    { path: config.routes.flight, element: Flight, layout: HeaderOnly },
    { path: config.routes.hotel, element: Hotel, layout: HeaderOnly },
    { path: config.routes.business, element: Business, layout: HeaderOnly },
    { path: config.routes.blog, element: Blog, layout: HeaderOnly },
    { path: config.routes.contact, element: Contact, layout: HeaderOnly },
    //
    { path: config.routes.search, element: Search, layout: DefaultLayout },
    { path: config.routes.login, element: Login, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

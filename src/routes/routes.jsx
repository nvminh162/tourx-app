import { LeftSidebarLayout, HeaderOnly } from '~/layouts';
import config from '~/config';
import {
    Home,
    Search,
    Login,
    Cruise,
    Flight,
    Hotel,
    Business,
    Blog,
    Contact,
    About,
    FAQ,
    Payments,
    Privacy,
    Regulations,
    Terms,
    UserManual,
} from '~/pages';

const publicRoutes = [
    { path: config.routes.home, element: Home, layout: HeaderOnly },
    { path: config.routes.cruise, element: Cruise, layout: HeaderOnly },
    { path: config.routes.flight, element: Flight, layout: HeaderOnly },
    { path: config.routes.hotel, element: Hotel, layout: HeaderOnly },
    { path: config.routes.business, element: Business, layout: HeaderOnly },
    { path: config.routes.blog, element: Blog, layout: HeaderOnly },
    { path: config.routes.contact, element: Contact, layout: HeaderOnly },
    { path: config.routes.about, element: About, layout: HeaderOnly },
    { path: config.routes.faq, element: FAQ, layout: HeaderOnly },
    { path: config.routes.payments, element: Payments, layout: HeaderOnly },
    { path: config.routes.privacy, element: Privacy, layout: HeaderOnly },
    { path: config.routes.regulations, element: Regulations, layout: HeaderOnly },
    { path: config.routes.terms, element: Terms, layout: HeaderOnly },
    { path: config.routes.usermanual, element: UserManual, layout: HeaderOnly },
    { path: config.routes.search, element: Search, layout: LeftSidebarLayout },
    { path: config.routes.login, element: Login, layout: null },
];

// Private routes => For logged in users => Update coming soon!
const privateRoutes = [];

export { publicRoutes, privateRoutes };

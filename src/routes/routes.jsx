import { LeftSidebarLayout } from '../layouts';
import config from '../config';
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
    NotFound,
    CruiseDetail,
    HotelDetail
} from '../pages';

const publicRoutes = [
    { path: config.routes.home, element: Home },
    { path: config.routes.cruise, element: Cruise },
    { path: config.routes.flight, element: Flight },
    { path: config.routes.hotel, element: Hotel },
    { path: config.routes.business, element: Business },
    { path: config.routes.blog, element: Blog },
    { path: config.routes.contact, element: Contact },
    { path: config.routes.about, element: About },
    { path: config.routes.faq, element: FAQ },
    { path: config.routes.payments, element: Payments },
    { path: config.routes.privacy, element: Privacy },
    { path: config.routes.regulations, element: Regulations },
    { path: config.routes.terms, element: Terms },
    { path: config.routes.usermanual, element: UserManual },
    // { path: config.routes.notfound, element: NotFound },
    { path: config.routes.search, element: Search, layout: LeftSidebarLayout },
    { path: config.routes.login, element: Login, layout: null },
    { path: config.routes.cruiseDetail, element: CruiseDetail },
    { path: config.routes.hotelDetail, element: HotelDetail },
    { path: "*", element: NotFound },
];

// Private routes => For logged in users => Update later!
const privateRoutes = [];

export { publicRoutes, privateRoutes };

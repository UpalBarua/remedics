import { createBrowserRouter } from 'react-router-dom';
import ServicesAll from '../components/Services/ServicesAll';
import Details from '../components/Details/Details';
import PrivateRoute from './PrivateRoute';
import MyReviews from '../components/Reviews/MyReviews';
import AddService from '../components/AddService/AddService';
import Home from '../pages/Home';
import RootLayout from '../layouts/RootLayout';
import Authentication from '../pages/Authentication/Authentication';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/services',
        element: <ServicesAll />,
      },
      {
        path: '/details/:serviceId',
        element: <Details />,
      },
      {
        path: '/authentication',
        element: <Authentication />,
      },
      {
        path: '/add',
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: '/reviews',
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

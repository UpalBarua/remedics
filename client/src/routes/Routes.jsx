import { createBrowserRouter } from 'react-router-dom';
import Main from '../layouts/Main';
import Services from '../components/Services/Services';
import ServicesAll from '../components/Services/ServicesAll';
import Details from '../components/Details/Details';
import SignUp from '../components/SignUp/SignUp';
import LogIn from '../components/LogIn/LogIn';
import PrivateRoute from './PrivateRoute';
import Blog from '../components/Blog/Blog';
import MyReviews from '../components/Reviews/MyReviews';
import AddService from '../components/AddService/AddService';
import Home from '../layouts/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: '/services', element: <ServicesAll /> },
      { path: '/details/:serviceId', element: <Details /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/login', element: <LogIn /> },
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

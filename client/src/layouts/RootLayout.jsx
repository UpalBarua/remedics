import * as ReactDOM from 'react-dom';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Spinner from '../components/Spinner/Spinner';
import { useSpinner } from '../contexts/SpinnerContext';

const RootLayout = () => {
  const { isSpinnerVisible } = useSpinner();

  return (
    <>
      <Navbar />
      <Outlet />
      {isSpinnerVisible &&
        ReactDOM.createPortal(
          <Spinner />,
          document.getElementById('spinner-root')
        )}
    </>
  );
};

export default RootLayout;

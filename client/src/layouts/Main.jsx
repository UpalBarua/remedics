import * as ReactDOM from 'react-dom';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import useTitle from '../hooks/useTitle';
import Spinner from '../components/Spinner/Spinner';
import { useSpinner } from '../contexts/SpinnerContext';

const Main = () => {
  useTitle('TITLE');
  const { isSpinnerVisible } = useSpinner();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: '1fr auto',
      }}>
      <div>
        <Navbar />
        <Outlet />
        {isSpinnerVisible &&
          ReactDOM.createPortal(
            <Spinner />,
            document.getElementById('spinner-root')
          )}
      </div>
      <Footer
        style={{
          gridRow: 2 / 3,
        }}
      />
    </div>
  );
};

export default Main;

import { Toaster } from 'react-hot-toast';
import AddServiceForm from '../Forms/AddServiceForm';
import styles from './AddService.module.css';
import useTitle from '../../hooks/useTitle';

const AddService = () => {
  useTitle('Add Service');

  return (
    <section className={`container ${styles.grid}`}>
      <div className={styles.text}>
        <h2 className="secondary-title text-accent-secondary">add doctor</h2>
        <p className="primary-title">
          add a new doctor by filling up this form
        </p>
      </div>
      <AddServiceForm />
    </section>
  );
};

export default AddService;

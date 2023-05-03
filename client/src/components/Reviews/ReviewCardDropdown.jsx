import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BsThreeDots, BsCheckLg } from 'react-icons/bs';
import styles from './ReviewCardDropdown.module.css';

const ReviewCardDropdown = ({
  isEditing,
  setIsEditing,
  handleSave,
  handleDelete,
}) => {
  return (
    <DropdownMenu.Root>
      {isEditing ? (
        <button onClick={handleSave}>
          <BsCheckLg size={25} />
        </button>
      ) : (
        <DropdownMenu.Trigger asChild>
          <button>
            <BsThreeDots size={25} />
          </button>
        </DropdownMenu.Trigger>
      )}
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.dropdown}>
          <DropdownMenu.Item className={styles.dropdownItem}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.dropdownItem}>
            <button onClick={handleDelete}>Delete</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ReviewCardDropdown;

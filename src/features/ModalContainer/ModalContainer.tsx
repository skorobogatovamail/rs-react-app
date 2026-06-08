import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { HookForm } from '../Form/HookForm';
import { UncontrolledForm } from '../Form/UncontrolledForm';
import { useModal } from './hooks/useModal';

import styles from './ModalContainer.module.css';

export const ModalContainer: React.FC = () => {
  const hookModal = useModal();
  const uncontrolledModal = useModal();

  return (
    <div className={styles.container}>
      <Button onClick={hookModal.toggleModal}>Open Hook Form</Button>
      <Button onClick={uncontrolledModal.toggleModal}>
        Open Uncontrolled Form
      </Button>

      <Modal isOpen={hookModal.isOpen} onClose={hookModal.toggleModal}>
        <HookForm onSave={hookModal.toggleModal} />
      </Modal>

      <Modal
        isOpen={uncontrolledModal.isOpen}
        onClose={uncontrolledModal.toggleModal}
      >
        <UncontrolledForm onSave={uncontrolledModal.toggleModal} />
      </Modal>
    </div>
  );
};

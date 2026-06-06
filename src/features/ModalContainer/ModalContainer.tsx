import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Form } from '../Form/Form';
import { useModal } from './hooks/useModal';

export const ModalContainer: React.FC = () => {
  const { isOpen, toggleModal } = useModal();

  return (
    <div>
      <Button onClick={toggleModal}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={toggleModal}>
        <Form onSave={toggleModal} />
      </Modal>
    </div>
  );
};

import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { useModal } from './hooks/useModal';

export const ModalContainer: React.FC = () => {
  const { isOpen, toggleModal } = useModal();

  return (
    <div>
      <Button onClick={toggleModal}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={toggleModal}>
        <div>Modal</div>
      </Modal>
    </div>
  );
};

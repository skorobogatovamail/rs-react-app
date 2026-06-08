import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../Button/Button';

import styles from './Modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const modal = modalRef.current;
    if (modal) modal.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      const activeElement = document.activeElement;

      if (
        modal &&
        activeElement instanceof HTMLElement &&
        modal.contains(activeElement)
      ) {
        activeElement.blur();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className={styles.wrapper} onClick={onClose} aria-hidden></div>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal
        tabIndex={-1}
        ref={modalRef}
      >
        {children}

        <Button aria-label="Close" onClick={onClose} className={styles.button}>
          Close
        </Button>
      </div>
    </>,

    document.body
  );
};

import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Modal from '../components/Modal';
import Button from '../components/layout/Button';
import { useTitle } from '../shared/hooks';

const useStyles = createUseStyles({
  title: {
    marginBottom: 30,
  },

  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 50,
    fontSize: '1.5rem',
  },

  modalContent: {
    marginBottom: 50,
  },
});

const ModalPage = () => {
  const classes = useStyles();
  const [modalOpened, setModalOpen] = useState(false);
  useTitle('Modal');

  function triggerModal() {
    setModalOpen(!modalOpened);
  }

  return (
    <div>
      <div className={classes.title}>
        A simple modal component
      </div>

      <Button type="button" onClick={triggerModal}>
        Open modal
      </Button>

      {modalOpened && (
        <Modal onClose={triggerModal}>
          <div className={classes.modalTitle}>
            Title
          </div>

          <div className={classes.modalContent}>
            Content of Modal
          </div>

          <Button onClick={triggerModal}>
            Close
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default ModalPage;

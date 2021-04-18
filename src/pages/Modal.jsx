import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Modal from '../components/Modal';

const useStyles = createUseStyles({
  title: {
    marginBottom: 30,
  },

  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 30,
  },

  modalContent: {
    marginBottom: 30,
  },

  closeBtn: {
    width: '100%',
  },
});

const ModalPage = () => {
  const classes = useStyles();
  const [modalOpened, setModalOpen] = useState(false);

  function triggerModal() {
    setModalOpen(!modalOpened);
  }

  return (
    <div>
      <div className={classes.title}>
        A simple modal component
      </div>

      <button type="button" onClick={triggerModal}>
        Open modal
      </button>

      {modalOpened && (
        <Modal onClose={triggerModal}>
          <div className={classes.modalTitle}>
            Title
          </div>

          <div className={classes.modalContent}>
            Content of Modal
          </div>

          <button type="button" onClick={triggerModal} className={classes.closeBtn}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ModalPage;

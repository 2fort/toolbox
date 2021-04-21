import { useRef, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  body: {
    padding: 25,
    width: '90%',
    maxWidth: '500px',
    position: 'relative',
    background: '#FFF',
    maxHeight: '100%',
    overflowY: 'auto',
    borderRadius: 3,
  },

  close: {
    position: 'absolute',
    top: 12,
    right: 12,
    background: 'none',
    border: 0,
  },
});

const Modal = ({ children, onClose }) => {
  const modalRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    const targetElement = modalRef.current;
    disableBodyScroll(targetElement);

    return () => {
      enableBodyScroll(targetElement);
    };
  }, []);

  function detectClick(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  }

  return (
    <div className={classes.backdrop} onClickCapture={detectClick}>
      <div ref={modalRef} className={classes.body}>
        <button
          type="button"
          className={classes.close}
          onClick={onClose}
        >
          ❌
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.array,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

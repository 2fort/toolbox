import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

const useStyles = createUseStyles((theme) => ({
  button: {
    background: theme.palette.button,
    borderRadius: 3,
    color: theme.palette.buttonText,
    border: 0,
    padding: '10px 20px',
    fontWeight: 'bold',
    fontSize: 16,
  },
}));

const Button = ({ children, className, ...props }) => {
  const classes = useStyles();

  return (
    <button
      type="button"
      className={classNames(classes.button, className)}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;

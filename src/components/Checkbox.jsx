import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles({
  checkbox: {
    lineHeight: '40px',
  },

  input: {
    width: 17,
    height: 17,
    margin: '0 3px 0 0',
    verticalAlign: 'top',

    '&:not(checked)': {
      position: 'absolute',
      opacity: 0,
    },

    '&:not(checked)+label::before': {
      content: '""',
      width: 16,
      height: 16,
      borderRadius: 2,
      position: 'absolute',
      top: 3,
      left: 0,
      background: '#fff',
      border: '1px solid #c4c4c4',
    },

    '&:not(checked)+label::after': {
      content: '"☑️"',
      // width: 12,
      // height: 12,
      // background: `url(${checkboxImg})`, svg img can be used here
      position: 'absolute',
      top: 3,
      left: -1,
      fontSize: 14,
      opacity: 0,
    },

    '&:checked+label::after': {
      opacity: 1,
    },
  },

  label: {
    fontSize: 17,
    fontWeight: 400,
    color: '#000',
    cursor: 'pointer',
    display: 'inline-block',
    whiteSpace: 'inherit',
    textAlign: 'left',
    lineHeight: 1.3,
    padding: '0 0 0 26px',
    marginBottom: 0,
    position: 'relative',
  },
});

const CustomCheckbox = ({
  label, id, checked, onChange,
}) => {
  const classes = useStyles();

  return (
    <span className={classes.checkbox}>
      <input className={classes.input} type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label className={classes.label} htmlFor={id}>{label}</label>
    </span>
  );
};

CustomCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomCheckbox;

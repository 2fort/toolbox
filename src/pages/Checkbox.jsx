import { createUseStyles } from 'react-jss';
import { useState } from 'react';
import Checkbox from '../components/Checkbox';

const useStyles = createUseStyles((theme) => ({
  text: {
    marginBottom: 20,
  },

  block: {
    borderRadius: 5,
    padding: '20px 45px',
    border: `1px solid ${theme.palette.stroke}`,
    display: 'inline-block',
  },
}));

const CheckboxPage = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <div className={classes.text}>
        input type=&quot;checkbox&quot; but with custom look
      </div>

      <div className={classes.block}>
        <Checkbox
          id="test-checkbox"
          label="Test checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
      </div>
    </div>
  );
};

export default CheckboxPage;

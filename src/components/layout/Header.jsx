import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    borderBottom: '1px solid gray',

    '& > *': {
      marginRight: 35,
    },
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Link to="/">Main</Link>
    </div>
  );
};

export default Header;

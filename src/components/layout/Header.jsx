import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,

    '& > *': {
      marginRight: 35,
    },
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.palette.headline,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Link to="/" className={classes.title}>
        Toolbox
      </Link>
    </div>
  );
};

export default Header;

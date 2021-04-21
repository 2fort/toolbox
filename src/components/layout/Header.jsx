import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'flex-end',
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

  repoLink: {
    marginLeft: 'auto',
    textDecoration: 'none',
    fontWeight: 'bold',
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
      <a
        href="https://github.com/2fort/toolbox"
        className={classes.repoLink}
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
    </div>
  );
};

export default Header;

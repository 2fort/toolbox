import { Link, NavLink } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

const useStyles = createUseStyles((theme) => ({
  menu: {
    width: 250,
    minWidth: 250,
    overflowY: 'auto',
    background: theme.palette.secondary,
    borderRadius: 10,
  },

  ul: {
    margin: 0,
    padding: 0,
    listStyle: 'none',

    '& li': {
      marginBottom: 20,
    },

    '& li:last-child': {
      marginBottom: 0,
    },
  },

  link: {
    color: theme.palette.headline,
    textDecoration: 'none',
    fontWeight: 'bold',
  },

  activeLink: {
    '&::before': {
      content: '"⮞ "',
    },
  },

  soonLink: {
    '&::after': {
      content: '" 🔜"',
    },
  },
}));

const Menu = () => {
  const classes = useStyles();

  return (
    <div className={classes.menu}>
      <ul className={classes.ul}>
        <li>
          <NavLink to="/modal" className={classes.link} activeClassName={classes.activeLink}>
            Modal
          </NavLink>
        </li>
        <li>
          <NavLink to="/sidebar" className={classes.link} activeClassName={classes.activeLink}>
            Sidebar
          </NavLink>
        </li>
        <li>
          <NavLink to="/image-zoom" className={classes.link} activeClassName={classes.activeLink}>
            Image Zoom
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" className={classes.link} activeClassName={classes.activeLink}>
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to="/checkbox" className={classes.link} activeClassName={classes.activeLink}>
            Custom checkbox
          </NavLink>
        </li>
        <li>
          <NavLink to="/svg-color-change" className={classes.link} activeClassName={classes.activeLink}>
            SVG color change
          </NavLink>
        </li>
        <li>
          <Link
            to="/"
            className={classNames(classes.link, classes.soonLink)}
          >
            Video player
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={classNames(classes.link, classes.soonLink)}
          >
            Autocomplete
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={classNames(classes.link, classes.soonLink)}
          >
            Clipboard image
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;

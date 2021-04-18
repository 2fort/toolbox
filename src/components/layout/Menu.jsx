import { NavLink } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  menu: {
    width: 250,
    overflowY: 'auto',
    borderRight: '1px solid gray',
  },

  ul: {
    margin: 0,
    padding: 0,
    listStyle: 'none',

    '& li': {
      marginBottom: 20,
    },
  },
});

const Menu = () => {
  const classes = useStyles();

  return (
    <div className={classes.menu}>
      <ul className={classes.ul}>
        <li>
          <NavLink to="/modal">Modal</NavLink>
        </li>
        <li>
          <NavLink to="/sidebar">Sidebar</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;

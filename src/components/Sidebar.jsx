import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

const useStyles = createUseStyles({
  sidebar: {
    width: 50,
    backgroundColor: '#FFF',
    border: '1px solid #000',
    overflow: 'hidden',
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    overflowY: 'auto',
  },

  sidebarOpen: {
    width: 200,
  },

  sidebarInner: {
    overflowX: 'hidden',
    padding: 10,
    minWidth: 200,
  },

  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',

    '& > li': {
      marginBottom: 20,
      display: 'flex',
    },
  },

  left: {
    width: 40,
    paddingLeft: 3,
  },

  right: {
    flex: 1,
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const [sidebarOpened, setSidebarOpened] = useState(true);

  function triggerSidebar() {
    setSidebarOpened(!sidebarOpened);
  }

  return (
    <div className={classNames(classes.sidebar, sidebarOpened && classes.sidebarOpen)}>
      <div className={classes.sidebarInner}>
        <ul className={classes.list}>
          <li>
            <div className={classes.left}>🏠</div>
            <div className={classes.right}>Home</div>
          </li>
          <li>
            <div className={classes.left}>🛴</div>
            <div className={classes.right}>Kick Scooters</div>
          </li>
          <li>
            <div className={classes.left}>⛰️</div>
            <div className={classes.right}>Mountains</div>
          </li>
        </ul>

        <button type="button" onClick={triggerSidebar} className={classes.triggerButton}>
          {sidebarOpened ? '<' : '>'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';

const useStyles = createUseStyles((theme) => ({
  sidebar: {
    width: 54,
    backgroundColor: '#FFF',
    border: `2px solid ${theme.palette.stroke}`,
    overflow: 'hidden',
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    overflowY: 'auto',
    borderRadius: 3,
  },

  sidebarOpen: {
    width: 200,
  },

  sidebarInner: {
    overflowX: 'hidden',
    padding: '15px 10px',
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

    '& > li:last-child': {
      marginBottom: 0,
    },
  },

  left: {
    width: 40,
    paddingLeft: 3,
  },

  right: {
    flex: 1,
  },

  lastLi: {
    marginTop: 40,
  },

  btn: {
    background: 'none',
    border: 0,
    display: 'flex',
    textAlign: 'left',
  },
}));

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
          <li className={classes.lastLi}>
            <button type="button" onClick={triggerSidebar} className={classes.btn}>
              <div className={classes.left}>{sidebarOpened ? '⬅️' : '➡️'}</div>
              <div className={classes.right}>Close</div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import Header from './components/layout/Header';
import Menu from './components/layout/Menu';
import Route404 from './components/layout/Route404';
import Main from './pages/Main';
import Modal from './pages/Modal';
import Sidebar from './pages/Sidebar';

const useStyles = createUseStyles({
  entrance: {
    display: 'flex',
    flex: 1,

    '& > div:first-child': {
      padding: 20,
    },

    '& > div:last-child': {
      padding: 25,
    },
  },
});

const Entrance = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Header />
      <div className={classes.entrance}>
        <Menu />
        <Switch>
          <Route path="/sidebar" component={Sidebar} />
          <Route path="/modal" component={Modal} />
          <Route path="/" component={Main} />
          <Route component={Route404} />
        </Switch>
      </div>
    </Fragment>
  );
};

export default Entrance;

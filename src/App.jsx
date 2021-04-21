import 'core-js/stable';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import 'normalize.css';
import './style.css';
import Entrance from './Entrance';
import configureStore from './store-app';
import api from './api';
import { createBreakpoints } from './shared/utils';

const theme = {
  bp: createBreakpoints(),
  palette: {
    // elements
    background: '#fffffe',
    headline: '#2b2c34',
    paragraph: '#2b2c34',
    button: '#6246ea',
    buttonText: '#fffffe',

    // illustration
    stroke: '#2b2c34',
    main: '#fffffe',
    highlight: '#6246ea',
    secondary: '#d1d1e9',
    tertiary: '#e45858',
  },
};

const store = configureStore();
api.getStore(store);

render(
  <ReduxProvider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <Entrance />
      </ThemeProvider>
    </Router>
  </ReduxProvider>,
  document.getElementById('app'),
);

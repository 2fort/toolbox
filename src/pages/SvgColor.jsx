import { createUseStyles } from 'react-jss';
import { ReactComponent as Ring } from '../images/ring.svg';

const useStyles = createUseStyles((theme) => ({
  tip: {
    marginBottom: 25,
  },

  container: {
    display: 'flex',
  },

  svg1: {
    width: 100,
    height: 100,
    color: theme.palette.headline,
    marginRight: 50,
    '&:hover': {
      color: theme.palette.button,
    },
  },

  svg2: {
    width: 100,
    height: 100,
    marginRight: 50,
    color: theme.palette.headline,
    '&:hover': {
      color: 'red',
    },
  },

  svg3: {
    width: 100,
    height: 100,
    color: theme.palette.headline,
    '&:hover': {
      color: 'blue',
    },
  },
}));

const SvgColorPage = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.tip}>
        Tip: use &apos;currentColor&apos; in svg and customize color with &apos;color&apos; property
      </div>
      <div className={classes.container}>
        <div className={classes.svg1}>
          <Ring />
        </div>
        <div className={classes.svg2}>
          <Ring />
        </div>
        <div className={classes.svg3}>
          <Ring />
        </div>
      </div>
    </div>
  );
};

export default SvgColorPage;

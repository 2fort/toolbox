import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  main: {
    flex: 1,
    padding: 20,
  },
});

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      A set of react components for everyday use
    </div>
  );
};

export default Main;

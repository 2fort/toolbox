import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  notFound: {
    padding: 20,
  },
});

const Route404 = () => {
  const classes = useStyles();

  return (
    <div className={classes.notFound}>
      404 - not found!
    </div>
  );
};

export default Route404;

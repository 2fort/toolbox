import { createUseStyles } from 'react-jss';
import Sidebar from '../components/Sidebar';

const useStyles = createUseStyles({
  title: {
    marginBottom: 25,
  },
});

const SidebarPage = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.title}>
        A foldable menu
      </div>

      <Sidebar />
    </div>
  );
};

export default SidebarPage;

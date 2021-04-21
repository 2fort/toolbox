import { createUseStyles } from 'react-jss';
import Sidebar from '../components/Sidebar';
import { useTitle } from '../shared/hooks';

const useStyles = createUseStyles({
  title: {
    marginBottom: 25,
  },
});

const SidebarPage = () => {
  const classes = useStyles();
  useTitle('Sidebar');

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

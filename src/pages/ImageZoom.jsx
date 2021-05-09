import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import largeImg from '../images/shio-yang-KLUUozjf9zI-unsplash.jpg';
import ImageZoom from '../components/ImageZoom';

const useStyles = createUseStyles({
  main: {
    minHeight: 'calc(100vh - 76px)',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 20,
  },

  scale: {
    marginTop: 25,
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },

  container: {
    // container size must be set. flex: 1 is fine. fixed width and height are fine too
    flex: 1,
    border: '1px dashed #000',
  },

  linkContainer: {
    textAlign: 'center',
    marginTop: 7,
  },
});

const ImageZoomPage = () => {
  const classes = useStyles();
  const [imageZoom, setImageZoom] = useState(1);

  return (
    <div className={classes.main}>
      Scroll to zoom <br />
      Double click for maximum zoom, dblclick again for no zoom (100% scale)

      <div className={classes.scale}>{imageZoom.toFixed(2) * 100}%</div>
      <ImageZoom
        imageSrc={largeImg}
        setImageInfo={setImageZoom}
        containerStyle={classes.container}
      />

      <div className={classes.linkContainer}>
        <a href="https://unsplash.com/photos/KLUUozjf9zI" className="link" target="_blank" rel="noreferrer">
          https://unsplash.com/photos/KLUUozjf9zI
        </a>
      </div>
    </div>
  );
};

export default ImageZoomPage;

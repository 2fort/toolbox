import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import ImageZoom from './ImageZoom';

const useStyles = createUseStyles({
  image: {
    position: 'absolute',
    zIndex: 100,
    transformOrigin: '0 0',
    visibility: 'hidden',
    // touchAction: 'manipulation',
  },

  container: {
    overflow: 'hidden',
    position: 'relative',
  },
});

const ImageZoomWrapper = ({ imageSrc, setImageInfo, containerStyle }) => {
  // it is possible to get any params, not just zoom
  const [zoom, setZoom] = useState(1);
  const classes = useStyles();
  const containerRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    let pointer;
    let img;

    // TODO: add exception for image error loading
    // TODO: add reactions for window resize
    function getImageData() {
      if (imageRef.current.naturalWidth && imageRef.current.naturalHeight) {
        clearInterval(pointer);
        img = new ImageZoom(imageRef.current, containerRef.current, setZoom);
      }
    }

    pointer = setInterval(getImageData, 30);

    return () => {
      clearInterval(pointer);
      img.destroy();
    };
  }, []);

  useEffect(() => {
    setImageInfo(zoom);
  }, [zoom, setImageInfo]);

  return (
    <div ref={containerRef} className={`${classes.container} ${containerStyle}`}>
      <img ref={imageRef} src={imageSrc} alt="graphics" className={classes.image} />
    </div>
  );
};

ImageZoomWrapper.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  setImageInfo: PropTypes.func.isRequired,
  containerStyle: PropTypes.string.isRequired,
};

export default ImageZoomWrapper;

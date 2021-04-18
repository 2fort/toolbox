import { useEffect } from 'react';

const defaultTitle = 'Toolbox';

export default function useTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = `${title} - ${defaultTitle}`;
    }

    return () => {
      document.title = defaultTitle;
    };
  }, [title]);
}

import { useEffect } from 'react';

const useTitle = title => {
  useEffect(() => {
    document.title = `ReMedics | ${title}`;
  }, [title]);
};

export default useTitle;

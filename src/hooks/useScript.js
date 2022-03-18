import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};
// ../src/pages/landing/js/scripts.js

export default useScript;
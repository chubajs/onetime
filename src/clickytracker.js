import React, { useEffect } from 'react';

const ClickyTracker = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-id', '101462363');
    script.src = '//static.getclicky.com/js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <noscript>
      <p>
        <img
          alt="Clicky"
          width="1"
          height="1"
          src="//in.getclicky.com/101462363ns.gif"
        />
      </p>
    </noscript>
  );
};

export default ClickyTracker;
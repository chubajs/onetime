import React, { useEffect } from 'react';

const ClickyTracker = () => {
  useEffect(() => {
    if (!window.clicky_site_ids) {
      window.clicky_site_ids = [101462363];
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-id', '101462363');
      script.src = '//static.getclicky.com/js';
      document.head.appendChild(script);
    }

    // Manually trigger a pageview on route change
    const triggerPageview = () => {
      if (window.clicky) {
        window.clicky.log(window.location.pathname + window.location.search, document.title);
      }
    };

    // Initial pageview
    triggerPageview();

    // Listen for route changes
    window.addEventListener('popstate', triggerPageview);

    return () => {
      window.removeEventListener('popstate', triggerPageview);
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
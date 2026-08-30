import React, {useEffect} from 'react';
import './SubPage.scss';

/* Shared shell for the standalone pages: sets the document title and starts
   every visit at the top. Navigation back home lives in the navbar, so there
   is deliberately no back button here - it produced a mismatched band across
   the top of the page. */
const SubPage = ({title, children}) => {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} · Vasco Soares`;
    window.scrollTo(0, 0);
    return () => { document.title = previous; };
  }, [title]);

  return (
    <div className="sub-page">
      {children}
    </div>
  );
}

export default SubPage;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { emitEvent } from '../analytics';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        emitEvent({
            name: 'page_viewed',
            category: 'navigation',
            properties: { path: pathname }
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;

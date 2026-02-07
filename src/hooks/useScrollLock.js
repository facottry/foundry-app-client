import { useEffect } from 'react';

/**
 * Hook to lock body scrolling when a modal/drawer is open.
 * Uses position: fixed strategy to prevent iOS Safari rubber-banding.
 * 
 * @param {boolean} isOpen - Whether the lock should be active
 */
export const useScrollLock = (isOpen) => {
    useEffect(() => {
        if (!isOpen) return;

        // 1. Capture current state
        const scrollY = window.scrollY;
        const originalOverflow = document.body.style.overflow;
        const originalPosition = document.body.style.position;
        const originalTop = document.body.style.top;
        const originalWidth = document.body.style.width;

        // 2. Lock body
        // preventing layout shift by keeping width 100%
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // 3. Restore on cleanup (close or unmount)
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.position = originalPosition;
            document.body.style.top = originalTop;
            document.body.style.width = originalWidth;

            // Restore scroll position immediately
            window.scrollTo(0, scrollY);
        };
    }, [isOpen]);
};

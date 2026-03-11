export function addKeyListener(handler, key = 'Escape', target = window) {
    if (typeof handler !== 'function') {
        throw new TypeError('addKeyListener: handler must be a function');
    }

    const listener = (e) => {
        if (e.key === key) handler(false);
    };

    target.addEventListener('keydown', listener);

    // Return a cleanup function to remove the listener
    return () => target.removeEventListener('keydown', listener);
}

export function addClickOutsideListener(ref, handler) {
    if (typeof handler !== 'function') {
        throw new TypeError('addClickOutsideListener: handler must be a function');
    }

    const listener = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            handler(false);
        }
    };

    document.addEventListener('mousedown', listener);

    // Return a cleanup function to remove the listener
    return () => document.removeEventListener('mousedown', listener);
}
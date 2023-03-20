import { useRef, useEffect } from 'react'


const useLegacyEffect = (cb: Function, deps: []) => {
    const isMountedRef = useRef(false);

    useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            return undefined;
        }

        return cb();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

export default useLegacyEffect;
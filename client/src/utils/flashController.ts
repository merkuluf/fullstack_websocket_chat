import { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FLASH } from '../redux/actionTypes';

export function useFlash() {
    const dispatch = useDispatch();
    // @ts-ignore
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Use useRef to track the timeout

    const showFlash = useCallback((delay: number, message: string): void => {
        // Clear existing timeout if there is one
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Dispatch the message to show the flash
        dispatch({
            type: FLASH.SET,
            payload: {
                message: message,
                active: true,
            },
        });

        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
            dispatch({ 
                type: FLASH.SET, 
                payload: {
                    message: message,
                    active: false,
                } 
            });
            // Clear the ref when the timeout is completed
            timeoutRef.current = null;
        }, delay);
    }, [dispatch]);

    return { showFlash };
}

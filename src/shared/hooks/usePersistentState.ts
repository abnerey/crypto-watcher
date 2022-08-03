import { useState, useEffect, useCallback } from 'react';
import type { SetStateAction, Dispatch } from 'react';
import { isEmpty } from 'shared/lib/isEmpty';

/**
 * This hook follows the same API as useState but it persists/hydrates its state using localStorage
 */
export function usePersistentState<T>(persistenceId: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(initialValue);

    useEffect(() => {
        if (!isEmpty(persistenceId) && !isEmpty(localStorage.getItem(persistenceId))) {
            const persisted = JSON.parse(localStorage.getItem(persistenceId)!);
            setState(persisted);
        }
    }, [persistenceId]);

    const setPersistentState = useCallback((value: SetStateAction<T>) => {
        setState(value);
        if (!isEmpty(persistenceId)) {
            localStorage.setItem(persistenceId, JSON.stringify(value));
        }
    }, [persistenceId]);

    return [state, setPersistentState];
}
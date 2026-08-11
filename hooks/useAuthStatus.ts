import { useState, useEffect } from 'react';
import { getAuthStatus } from '@/app/actions/auth';
import { toast } from 'sonner';

export function useAuthStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [authFetched, setAuthFetched] = useState(false);

    useEffect(() => {
        let mounted = true;

        getAuthStatus().then((status) => {
            if (mounted) {
                setIsLoggedIn(status.isLoggedIn);
                setCanEdit(status.canEdit);
                setAuthFetched(true);

                if (status.isLoggedIn) {
                    if (status.canEdit) {
                        toast.success("You are authorized to edit notes.");
                    } else {
                        toast.error("You are not authorized to edit notes.");
                    }
                }
            }
        });

        return () => { mounted = false; };
    }, []);

    return { isLoggedIn, canEdit, authFetched };
}

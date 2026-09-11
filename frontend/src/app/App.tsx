import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Providers } from './providers.js';
import { router } from './router.js';
import { ToastContainer } from '@shared/ui/Toast.js';

import { useSessionStore } from '@entities/session/model/useSessionStore.js';

export function App() {
  useEffect(() => {
    const unsub = useSessionStore.subscribe(() => {
      // eslint-disable-next-line no-console
      console.count('zustand-render');
    });
    return unsub;
  }, []);

  return (
    <Providers>
      <RouterProvider router={router} />
      <ToastContainer />
    </Providers>
  );
}

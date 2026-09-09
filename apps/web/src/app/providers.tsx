import React, { useEffect } from 'react';
import { initSocketBridge } from '@shared/api/socketBridge.js';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    const teardown = initSocketBridge();
    return () => {
      teardown();
    };
  }, []);

  return <>{children}</>;
}
